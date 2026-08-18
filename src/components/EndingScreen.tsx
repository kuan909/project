import { useState } from 'react';
import type { GameState } from '../lib/game';

type EndingScreenProps = {
  state: GameState;
  onRestart: () => void;
  onStartChapterTwo: () => void;
};

type EndingId = 'earth' | 'sky' | 'secret';

export function EndingScreen({ state, onRestart, onStartChapterTwo }: EndingScreenProps) {
  const [ending, setEnding] = useState<EndingId | null>(null);

  if (!state.piratesAboard) {
    return (
      <section className="ending ending--defeat">
        <span className="eyebrow">ПОСЛЕДНЯЯ БУРЯ</span>
        <div className="storm-scene" aria-hidden="true"><span>☁</span><b>➤</b><span>ϟ</span></div>
        <h1>Помощь не пришла</h1>
        <p>Самолёт попал в последнюю бурю. Пираты могли удержать повреждённое крыло, но ты оставил их в грозовых облаках. Посылка потеряна.</p>
        <strong className="ending__lesson">Твои решения меняют то, кто окажется рядом в трудную минуту.</strong>
        <button className="primary-button" onClick={onRestart}>Исправить выбор</button>
      </section>
    );
  }

  if (!ending) {
    return (
      <section className="finale">
        <span className="eyebrow">ПОСЛЕДНЯЯ ДОСТАВКА</span>
        <div className="finale__rescue"><span>☠ ☠</span><b>Пираты удержали крыло в последней буре</b></div>
        <div className="seed">♧</div>
        <h1>В коробке — последнее семя Земли</h1>
        <p>Оно может вернуть землю под облаками. Но островам придётся спуститься, и обратного пути не будет.</p>
        <div className="finale__choices">
          <button onClick={() => setEnding('earth')}><b>Посадить семя</b><small>Позвать острова домой</small></button>
          <button onClick={() => setEnding('sky')}><b>Оставить мир в небе</b><small>Не рисковать жизнями</small></button>
          <button onClick={() => setEnding('secret')}><b>Спрятать семя</b><small>Сначала найти правду</small></button>
        </div>
      </section>
    );
  }

  const endings = {
    earth: {
      title: state.trust >= 4 ? 'Земля снова дышит' : 'Одинокий росток',
      text: state.trust >= 4
        ? 'Жители поверили тебе. Сотни островов опустились сквозь облака, а первый зелёный росток стал началом нового мира.'
        : 'Не все решились последовать за тобой. Но у подножия твоего острова появился росток — маленькое доказательство надежды.',
    },
    sky: {
      title: 'Хранитель неба',
      text: 'Острова остались в облаках. Ты продолжаешь летать между ними, а зелёная посылка ждёт дня, когда люди будут готовы.',
    },
    secret: {
      title: 'Курс: неизвестность',
      text: 'Ты спрятал семя в трюме и нашёл на коробке координаты. За краем карты существует место, о котором никто не рассказывал.',
    },
  };

  return (
    <section className="ending">
      <span className="eyebrow">КОНЕЦ ПЕРВОЙ ГЛАВЫ</span>
      <div className="ending__sun" />
      <h1>{endings[ending].title}</h1>
      <p>{endings[ending].text}</p>
      <div className="ending__stats">
        <span>Топливо <b>{state.fuel}/10</b></span>
        <span>Корпус <b>{state.hull}/10</b></span>
        <span>Доверие <b>{state.trust}/10</b></span>
      </div>
      <div className="chapter-two-question">
        <strong>Перейти во вторую главу?</strong>
        <div>
          <button className="primary-button" onClick={onStartChapterTwo}>Да</button>
          <button className="primary-button" onClick={onStartChapterTwo}>Да</button>
        </div>
      </div>
      <button className="ending__replay" onClick={onRestart}>Пройти первую главу ещё раз</button>
    </section>
  );
}
