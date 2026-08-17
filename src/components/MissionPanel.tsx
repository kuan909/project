import { useState } from 'react';
import type { Choice, Mission } from '../lib/game';
import { getNpcDialogue } from '../lib/dialogue';
import { IslandScene } from './IslandScene';

type MissionPanelProps = {
  mission: Mission;
  onChoose: (choice: Choice) => void;
  onClose: () => void;
};

export function MissionPanel({ mission, onChoose, onClose }: MissionPanelProps) {
  const [chosen, setChosen] = useState<Choice | null>(null);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={mission.title}>
      <div className="island-visit">
        <IslandScene
          islandId={mission.id}
          action={chosen?.action}
          dialogue={getNpcDialogue(mission.id, chosen?.action)}
        />
        <article className="mission-panel">
          <button className="close-button" onClick={onClose} aria-label="Вернуться на карту">×</button>
          <span className="eyebrow">{chosen ? 'ВАШЕ РЕШЕНИЕ' : 'ВЫ ПРИБЫЛИ'} · {mission.island}</span>
          <div className="mission-symbol">{mission.icon}</div>
          <h2>{chosen ? chosen.label : mission.title}</h2>
          <p>{chosen ? chosen.outcome : mission.description}</p>
          {chosen ? (
            <>
              <div className="artifact-reward">
                <span>{mission.artifact.icon}</span>
                <div><small>ПОЛУЧЕН АРТЕФАКТ</small><strong>{mission.artifact.name}</strong></div>
              </div>
              <button className="continue-button" onClick={() => onChoose(chosen)}>Продолжить путь →</button>
            </>
          ) : <div className="choice-list">
            {mission.choices.map((choice) => (
              <button className="choice" key={choice.label} onClick={() => setChosen(choice)}>
                <span><strong>{choice.label}</strong><small>{choice.detail}</small></span>
                <b>→</b>
              </button>
            ))}
          </div>}
        </article>
      </div>
    </div>
  );
}
