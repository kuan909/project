import type { GameState } from '../lib/game';

type GameStatusProps = {
  state: GameState;
};

export function GameStatus({ state }: GameStatusProps) {
  return (
    <header className="game-status">
      <div className="brand">
        <span className="brand__mark">К</span>
        <div><strong>Курьер</strong><small>борт «Ласточка»</small></div>
      </div>
      <div className="meters" aria-label="Состояние самолёта">
        {state.piratesAboard && <span className="crew-status" title="Спасённые пираты летят с тобой">☠ Экипаж</span>}
        <Meter icon="●" label="Топливо" value={state.fuel} />
        <Meter icon="◇" label="Корпус" value={state.hull} />
        <Meter icon="♥" label="Доверие" value={state.trust} />
      </div>
    </header>
  );
}

function Meter({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="meter" title={`${label}: ${value} из 10`}>
      <span>{icon}</span>
      <div><small>{label}</small><b>{value}/10</b></div>
    </div>
  );
}
