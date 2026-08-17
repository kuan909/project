import { useState } from 'react';
import type { Mission } from '../lib/game';
import { PortalGate } from './PortalGate';

type WorldMapProps = {
  missions: Mission[];
  completed: string[];
  onSelect: (mission: Mission) => void;
  isChoosingDestination: boolean;
  piratesAboard: boolean;
  onPlane: () => void;
};

export function WorldMap({ missions, completed, onSelect, isChoosingDestination, piratesAboard, onPlane }: WorldMapProps) {
  const [isBeyondPortal, setIsBeyondPortal] = useState(false);
  const regionMissions = isBeyondPortal ? missions.slice(3) : missions.slice(0, 3);

  return (
    <section
      className={`world-map${isBeyondPortal ? ' world-map--beyond' : ''}`}
      aria-label={isBeyondPortal ? 'Карта островов за порталом' : 'Карта летающих островов'}
    >
      <div className="cloud cloud--one" />
      <div className="cloud cloud--two" />
      <div className="route route--one" />
      <div className="route route--two" />
      <div className={`plane-guide${isChoosingDestination ? ' plane-guide--hidden' : ''}`}>
        <strong>НАЖМИ НА САМОЛЁТ</strong><span>↓</span>
      </div>
      <button className="plane" onClick={onPlane} aria-label="Сесть в самолёт">➤<small>Лететь</small></button>
      {piratesAboard && <div className="plane-crew"><span>☠ ☠</span><strong>Пираты на борту</strong></div>}
      <PortalGate isBeyondPortal={isBeyondPortal} onTravel={() => setIsBeyondPortal((value) => !value)} />
      {regionMissions.map((mission, index) => {
        const done = completed.includes(mission.id);
        return (
          <button
            className={`island island--${index + 1}${done ? ' island--done' : ''}`}
            disabled={done || !isChoosingDestination}
            key={mission.id}
            onClick={() => onSelect(mission)}
          >
            <span className={`walker walker--${index + 1}`} aria-hidden="true">
              <i className="walker__head" />
              <i className="walker__body" />
              <i className="walker__arm walker__arm--left" />
              <i className="walker__arm walker__arm--right" />
              <i className="walker__leg walker__leg--left" />
              <i className="walker__leg walker__leg--right" />
            </span>
            <span className="island__rock">{done ? '✓' : mission.icon}</span>
            <strong>{mission.island}</strong>
            <small>{done ? 'Доставлено' : isChoosingDestination ? 'Выбрать маршрут' : 'Нужен самолёт'}</small>
          </button>
        );
      })}
      <div className="map-caption">
        <span>{isBeyondPortal ? 'ЗА ПОРТАЛОМ · ВЫСОТА 7200' : 'ОБЛАЧНЫЙ ПОЯС · ВЫСОТА 3400'}</span>
        <b>{completed.length}/{missions.length} доставок</b>
      </div>
      {isChoosingDestination && <div className="destination-hint">Куда летим? Выбери остров</div>}
    </section>
  );
}
