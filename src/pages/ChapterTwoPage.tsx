import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { FlightGame } from '../components/FlightGame';
import { saveChapter } from '../lib/progress';
import '../styles/chapter-two.css';
import '../styles/flight.css';

type ChapterStage = 'intro' | 'flight' | 'arrival';

export function ChapterTwoPage() {
  const [stage, setStage] = useState<ChapterStage>('intro');

  useEffect(() => saveChapter(2), []);

  if (stage === 'flight') {
    return (
      <FlightGame
        destination="Нулевой Разлом"
        onLand={() => setStage('arrival')}
        onCrash={() => setStage('intro')}
        crashButtonLabel="Вернуться к началу главы 2"
      />
    );
  }

  if (stage === 'arrival') {
    return (
      <main className="chapter-two chapter-two--arrival">
        <section className="chapter-two__card">
          <span className="eyebrow">ГЛАВА 02 · ЗА КРАЕМ КАРТЫ</span>
          <div className="chapter-two__signal">⌘</div>
          <h1>Нулевой Разлом найден</h1>
          <p>Ключ Эха открыл проход. Впереди лежат острова, которых нет ни на одной карте, и источник всех порталов.</p>
          <button className="primary-button" onClick={() => setStage('intro')}>Вернуться к карте главы 2</button>
        </section>
      </main>
    );
  }

  return (
    <main className="chapter-two">
      <section className="chapter-two__card">
        <span className="eyebrow">КОНТРОЛЬНАЯ ТОЧКА СОХРАНЕНА</span>
        <h1>Глава 02<br />За краем карты</h1>
        <p>Артефакты сложились в новый маршрут. Ника поймала сигнал из места, где рождаются порталы. Первый курс — Нулевой Разлом.</p>
        <div className="chapter-two__checkpoint">✓ При падении ты вернёшься сюда, а не в первую главу</div>
        <button className="primary-button" onClick={() => setStage('flight')}>Лететь к Разлому →</button>
        <Link className="chapter-two__back" href="/game">Вернуться в первую главу</Link>
      </section>
    </main>
  );
}
