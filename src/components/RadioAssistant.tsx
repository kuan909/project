import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  requestAssistantReply,
  requestRadioMessage,
  type AssistantMessage,
  type RadioReport,
} from '../lib/ai';
import type { GameState, Mission } from '../lib/game';

type RadioAssistantProps = {
  fallbackMessage: string;
  report: RadioReport | null;
  state: GameState;
  mission: Mission | null;
};

export function RadioAssistant({ fallbackMessage, report, state, mission }: RadioAssistantProps) {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    { role: 'assistant', text: fallbackMessage },
  ]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const addAssistantMessage = (text: string) => {
    setMessages((current) => [...current, { role: 'assistant', text }]);
    if (isSpeechEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'ru-RU';
      window.speechSynthesis.speak(speech);
    }
  };

  useEffect(() => {
    if (!report) return;
    let isCurrent = true;
    setIsLoading(true);

    requestRadioMessage(report)
      .then((text) => {
        if (isCurrent) addAssistantMessage(text);
      })
      .catch(() => {
        if (isCurrent) addAssistantMessage(fallbackMessage);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => { isCurrent = false; };
  }, [fallbackMessage, report]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [isLoading, messages]);

  const sendQuestion = async (event: FormEvent) => {
    event.preventDefault();
    const text = question.trim();
    if (!text || isLoading) return;

    setMessages((current) => [...current, { role: 'user', text }]);
    setQuestion('');
    setIsLoading(true);
    try {
      const answer = await requestAssistantReply({ question: text, state, mission, history: messages });
      addAssistantMessage(answer);
    } catch (error) {
      addAssistantMessage(error instanceof Error ? error.message : 'Связь прервалась. Попробуй ещё раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const hideAssistant = () => {
    setIsVisible(false);
    setIsSpeechEnabled(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  if (!isVisible) {
    return (
      <button
        className="radio-assistant-launcher"
        type="button"
        onClick={() => setIsVisible(true)}
        aria-label="Вернуть ИИ-помощника Нику"
      >
        <span className={`radio-assistant__signal${isLoading ? ' is-active' : ''}`}>⌁</span>
        <span><strong>Ника</strong><small>Открыть помощника</small></span>
      </button>
    );
  }

  return (
    <aside className="radio-assistant" aria-label="ИИ-помощник Ника">
      <header className="radio-assistant__header">
        <div className="radio-assistant__identity">
          <span className={`radio-assistant__signal${isLoading ? ' is-active' : ''}`}>⌁</span>
          <span><strong>Ника</strong><small>{isLoading ? 'думает…' : 'бортовой ИИ-помощник'}</small></span>
        </div>
        <div className="radio-assistant__tools">
          <button type="button" className={isSpeechEnabled ? 'is-active' : ''} onClick={() => setIsSpeechEnabled((value) => !value)} title="Озвучивать ответы" aria-label="Озвучивать ответы">◖))</button>
          <button type="button" onClick={hideAssistant} title="Скрыть Нику" aria-label="Скрыть ИИ-помощника">×</button>
        </div>
      </header>
      <div className="radio-assistant__log" ref={logRef} aria-live="polite">
        {messages.map((message, index) => (
          <p className={`radio-assistant__message is-${message.role}`} key={`${message.role}-${index}`}>
            {message.text}
          </p>
        ))}
        {isLoading && <p className="radio-assistant__message is-assistant is-loading">Слушаю эфир…</p>}
      </div>
      <form className="radio-assistant__form" onSubmit={sendQuestion}>
        <label className="sr-only" htmlFor="radio-question">Сообщение помощнику</label>
        <input id="radio-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={300} placeholder={mission ? 'Спросить о решении…' : 'Спросить совета…'} />
        <button type="submit" disabled={!question.trim() || isLoading} aria-label="Отправить сообщение">↑</button>
      </form>
    </aside>
  );
}
