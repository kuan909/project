export type GameState = {
  fuel: number;
  hull: number;
  trust: number;
  piratesAboard: boolean;
  completed: string[];
  artifacts: string[];
  lastEvent: string;
};

export type Artifact = {
  id: string;
  icon: string;
  name: string;
  description: string;
};

export type Choice = {
  label: string;
  detail: string;
  outcome: string;
  effect: Partial<Pick<GameState, 'fuel' | 'hull' | 'trust'>>;
  action: string;
};

export type Mission = {
  id: string;
  icon: string;
  island: string;
  title: string;
  distance: string;
  description: string;
  artifact: Artifact;
  isSecret?: boolean;
  choices: Choice[];
};

export const SECRET_UNLOCK_COUNT = 3;

export const initialGameState: GameState = {
  fuel: 8,
  hull: 8,
  trust: 0,
  piratesAboard: false,
  completed: [],
  artifacts: [],
  lastEvent: 'Привет! Я Ника, твой бортовой проводник. Будем вместе искать приключения и принимать важные решения.',
};

export const missions: Mission[] = [
  {
    id: 'lighthouse', icon: '◒', island: 'Маяк-17',
    title: 'Лекарство для смотрителя', distance: 'Близко · тихий ветер',
    description: 'Старый маяк гаснет. Смотритель болен, а без его огня торговые суда разобьются о скалы.',
    artifact: { id: 'lighthouse-lens', icon: '◉', name: 'Линза маяка', description: 'Хранит частицу спасённого света.' },
    choices: [
      { label: 'Сесть у самого маяка', detail: 'Быстро, но опасно для корпуса', outcome: 'Ты доставил лекарство вовремя. Маяк снова зажёгся.', effect: { hull: -2, trust: 2, fuel: -1 }, action: 'medicine' },
      { label: 'Высадиться на нижней палубе', detail: 'Безопаснее, но придётся идти пешком', outcome: 'Смотритель дождался тебя и подарил канистру топлива.', effect: { fuel: 1, trust: 1 }, action: 'fuel-gift' },
    ],
  },
  {
    id: 'garden', icon: '✦', island: 'Сады Норы',
    title: 'Деталь для водяного насоса', distance: 'Средне · густые облака',
    description: 'Остров засыхает. В пути ты замечаешь пиратский корабль, застрявший в грозовом облаке.',
    artifact: { id: 'nora-seed', icon: '♧', name: 'Семя Норы', description: 'Прорастает даже среди облаков.' },
    choices: [
      { label: 'Помочь пиратам', detail: 'Потратить топливо и взять их на буксир', outcome: 'Пираты оказались честнее слухов и прикрыли твой самолёт от молний.', effect: { fuel: -2, hull: 1, trust: 2 }, action: 'tow-pirates' },
      { label: 'Продолжить доставку', detail: 'Оставить пиратов и лететь к жителям садов', outcome: 'Насос заработал до заката, но пираты остались одни посреди грозы.', effect: { fuel: -1, trust: 1 }, action: 'repair-pump' },
    ],
  },
  {
    id: 'foundry', icon: '◆', island: 'Старая Кузня',
    title: 'Письмо без обратного адреса', distance: 'Далеко · зона штормов',
    description: 'Адресат предлагает много топлива за запечатанную посылку в твоём трюме. Он знает, что внутри.',
    artifact: { id: 'forge-gear', icon: '⚙', name: 'Шестерня кузни', description: 'Тёплая деталь древнего механизма.' },
    choices: [
      { label: 'Отказаться от сделки', detail: 'Посылка важнее лёгкой выгоды', outcome: 'Механик уважает твой выбор и бесплатно укрепляет корпус самолёта.', effect: { hull: 2, fuel: -2, trust: 2 }, action: 'repair-plane' },
      { label: 'Выслушать предложение', detail: 'Но коробку не отдавать', outcome: 'Ты узнаёшь правду: внутри последнее живое семя Земли.', effect: { fuel: 1, trust: -1 }, action: 'open-box' },
    ],
  },
  {
    id: 'harbor', icon: '⚓', island: 'Облачная Гавань', title: 'Почта для капитана', distance: 'Средне · встречный ветер',
    description: 'Шторм порвал причальные канаты. Корабли уносит в открытое небо, а капитан ждёт важные карты.',
    artifact: { id: 'sky-compass', icon: '✥', name: 'Небесный компас', description: 'Указывает путь даже сквозь портал.' },
    choices: [
      { label: 'Закрепить корабли', detail: 'Помочь рабочим у причала', outcome: 'Вместе вы спасли гавань. Капитан отметил безопасный маршрут на твоей карте.', effect: { fuel: 1, trust: 2 }, action: 'save-harbor' },
      { label: 'Сначала отдать карты', detail: 'Доставка превыше всего', outcome: 'Карты доставлены, но один пустой корабль унёс шторм.', effect: { trust: 1, hull: -1 }, action: 'deliver-mail' },
    ],
  },
  {
    id: 'windfarm', icon: '✣', island: 'Ветряной Край', title: 'Запуск турбин', distance: 'Далеко · сильные порывы',
    description: 'Турбины остановились, и целый остров остался без света. Инженерам не хватает одной детали.',
    artifact: { id: 'wind-feather', icon: '〽', name: 'Перо ветра', description: 'Никогда не касается земли.' },
    choices: [
      { label: 'Установить деталь вместе', detail: 'Подняться на высокую башню', outcome: 'Лопасти ожили, и в домах один за другим загорелся свет.', effect: { hull: -1, trust: 2 }, action: 'start-turbines' },
      { label: 'Отдать запасную деталь', detail: 'Пусть инженеры закончат сами', outcome: 'Инженеры справились и зарядили аккумуляторы самолёта.', effect: { fuel: 2, trust: 1 }, action: 'give-part' },
    ],
  },
  {
    id: 'observatory', icon: '☾', island: 'Звёздный Предел', title: 'Плёнка для телескопа', distance: 'Очень далеко · холодный воздух',
    description: 'Астрономы нашли под облаками зелёный материк, но буря повредила снимки. Им нужна новая плёнка.',
    artifact: { id: 'star-glass', icon: '✦', name: 'Звёздное стекло', description: 'Показывает свет далёких миров.' },
    choices: [
      { label: 'Помочь настроить телескоп', detail: 'Проверить координаты вместе', outcome: 'В объективе появилась земля. Теперь у островов есть надежда и точные координаты.', effect: { fuel: -2, trust: 3 }, action: 'see-stars' },
      { label: 'Оставить плёнку', detail: 'И продолжить путь до темноты', outcome: 'Астрономы обещали передать результаты по радио.', effect: { fuel: -1, trust: 1 }, action: 'deliver-film' },
    ],
  },
  {
    id: 'echo', icon: '◈', island: 'Остров Эха', title: 'Сигнал из прошлого', distance: 'Скрыто · нестабильный портал',
    description: 'Древний архив проснулся после сотен лет молчания. В его центре работает компас, указывающий за край известного неба.',
    artifact: { id: 'echo-key', icon: '⌘', name: 'Ключ Эха', description: 'Открывает маршруты, которых нет на картах.' },
    isSecret: true,
    choices: [
      { label: 'Запустить древний архив', detail: 'Восстановить память острова', outcome: 'Каменные кольца ожили и показали путь к забытым островам.', effect: { fuel: -1, trust: 3 }, action: 'restore-archive' },
      { label: 'Изучить звёздный компас', detail: 'Сохранить новые координаты', outcome: 'Компас запомнил твой самолёт и открыл безопасный путь домой.', effect: { fuel: 2, hull: 1 }, action: 'read-compass' },
    ],
  },
];

export const artifacts = missions.map((mission) => mission.artifact);

const clamp = (value: number) => Math.max(0, Math.min(10, value));

export function finishMission(state: GameState, mission: Mission, choice: Choice): GameState {
  return {
    fuel: clamp(state.fuel + (choice.effect.fuel ?? 0)),
    hull: clamp(state.hull + (choice.effect.hull ?? 0)),
    trust: clamp(state.trust + (choice.effect.trust ?? 0)),
    piratesAboard: state.piratesAboard || choice.action === 'tow-pirates',
    completed: [...state.completed, mission.id],
    artifacts: [...state.artifacts, mission.artifact.id],
    lastEvent: choice.outcome,
  };
}
