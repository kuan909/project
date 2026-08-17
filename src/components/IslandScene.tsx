import { RealPerson } from './RealPerson';

type IslandSceneProps = {
  islandId: string;
  action?: string;
  dialogue: string;
};

export function IslandScene({ islandId, action, dialogue }: IslandSceneProps) {
  return (
    <section className={`visit-scene visit-scene--${islandId}`} aria-label="Сцена на острове">
      <div className="visit-scene__shade" />
      <RealPerson role="courier" className="person--courier" />
      <RealPerson role="keeper" className="person--local-one" />
      <RealPerson role="mechanic" className="person--local-two" />
      {!action && <div className="speech">{dialogue}</div>}
      {action && <ActionAnimation action={action} dialogue={dialogue} />}
    </section>
  );
}

function ActionAnimation({ action, dialogue }: { action: string; dialogue: string }) {
  if (action === 'tow-pirates') return <PirateRescue dialogue={dialogue} />;

  const events: Record<string, { label: string; picture: string }> = {
    medicine: { label: 'Лекарство доставлено!', picture: '🧑‍✈️　▣♡　🧓' },
    'fuel-gift': { label: 'Спасибо за помощь!', picture: '🧓　⛽　🧑‍✈️' },
    'repair-pump': { label: 'Вода снова течёт!', picture: '🧑‍🔧　⚙　💧' },
    'repair-plane': { label: 'Корпус отремонтирован!', picture: '🧑‍🔧　🔧　✈' },
    'open-box': { label: 'Внутри живое семя!', picture: '🧑‍✈️　▣🌱' },
    'save-harbor': { label: 'Корабли закреплены!', picture: '🧑‍✈️　⚓　⛵' },
    'deliver-mail': { label: 'Почта доставлена!', picture: '🧑‍✈️　✉　🧔' },
    'start-turbines': { label: 'Электричество вернулось!', picture: '🧑‍🔧　✣　⚡' },
    'give-part': { label: 'Деталь передана!', picture: '🧑‍✈️　⚙　🧑‍🔧' },
    'see-stars': { label: 'Материк найден!', picture: '🔭　✦　🌍' },
    'deliver-film': { label: 'Плёнка доставлена!', picture: '🧑‍✈️　▣　🔭' },
    'restore-archive': { label: 'Архив пробудился!', picture: '◯　✦　◯' },
    'read-compass': { label: 'Новый маршрут найден!', picture: '🧭　✦　➤' },
  };
  const event = events[action];
  return (
    <div className={`scene-action scene-action--${action}`}>
      <div className="action-object">{event.picture}</div>
      <strong>{event.label}</strong>
      <p className="scene-action__dialogue">«{dialogue}»</p>
    </div>
  );
}

function PirateRescue({ dialogue }: { dialogue: string }) {
  return (
    <div className="pirate-rescue" aria-label="Пираты поднимаются на борт самолёта">
      <div className="pirate-rescue__plane">✈</div>
      <div className="pirate-rescue__crew"><span>☠</span><span>☠</span><span>☠</span></div>
      <strong>Пираты поднялись на борт!</strong>
      <small>Теперь они часть твоего экипажа</small>
      <p className="scene-action__dialogue">«{dialogue}»</p>
    </div>
  );
}
