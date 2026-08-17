import { useState } from 'react';
import { EndingScreen } from '../components/EndingScreen';
import { FlightGame } from '../components/FlightGame';
import { FlightMenu } from '../components/FlightMenu';
import { GameStatus } from '../components/GameStatus';
import { MissionPanel } from '../components/MissionPanel';
import { RadioAssistant } from '../components/RadioAssistant';
import { WorldMap } from '../components/WorldMap';
import type { RadioReport } from '../lib/ai';
import {
  finishMission,
  initialGameState,
  missions,
  type Choice,
  type Mission,
} from '../lib/game';
import '../styles/game.css';
import '../styles/artifacts.css';
import '../styles/world-map.css';
import '../styles/portal.css';
import '../styles/ending.css';
import '../styles/island-scene.css';
import '../styles/flight.css';
import '../styles/flight-menu.css';
import '../styles/radio.css';

export function GamePage() {
  const [state, setState] = useState(initialGameState);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isChoosingDestination, setIsChoosingDestination] = useState(false);
  const [flightMission, setFlightMission] = useState<Mission | null>(null);
  const [isFlightMenuOpen, setIsFlightMenuOpen] = useState(false);
  const [radioReport, setRadioReport] = useState<RadioReport | null>(null);
  const isFinale = state.completed.length === missions.length;

  const handleChoice = (choice: Choice) => {
    if (!selectedMission) return;
    const nextState = finishMission(state, selectedMission, choice);
    setState(nextState);
    setRadioReport({
      island: selectedMission.island,
      missionTitle: selectedMission.title,
      choiceLabel: choice.label,
      outcome: choice.outcome,
      state: nextState,
    });
    setSelectedMission(null);
  };

  const restart = () => {
    setState(initialGameState);
    setSelectedMission(null);
    setIsChoosingDestination(false);
    setFlightMission(null);
    setIsFlightMenuOpen(false);
    setRadioReport(null);
  };

  const chooseDestination = () => {
    setIsFlightMenuOpen(false);
    setIsChoosingDestination(true);
  };

  const startFlight = (mission: Mission) => {
    setIsChoosingDestination(false);
    setFlightMission(mission);
  };

  const finishFlight = () => {
    setSelectedMission(flightMission);
    setFlightMission(null);
  };

  if (flightMission) {
    return <FlightGame destination={flightMission.island} onLand={finishFlight} onCrash={restart} />;
  }

  return (
    <main className="game-shell">
      <GameStatus state={state} />
      {isFinale ? (
        <EndingScreen state={state} onRestart={restart} />
      ) : (
        <>
          <section className="mission-intro">
            <div>
              <span className="eyebrow">ГЛАВА 01 · ПОСЛЕДНЯЯ ПОСЫЛКА</span>
              <h1>Небо ждёт курьера</h1>
            </div>
            <p>Выбери следующий маршрут. Каждое решение меняет судьбу островов.</p>
          </section>
          <WorldMap
            missions={missions}
            completed={state.completed}
            piratesAboard={state.piratesAboard}
            onSelect={startFlight}
            isChoosingDestination={isChoosingDestination}
            onPlane={() => setIsFlightMenuOpen(true)}
          />
        </>
      )}
      {selectedMission && (
        <MissionPanel
          mission={selectedMission}
          onChoose={handleChoice}
          onClose={() => setSelectedMission(null)}
        />
      )}
      {isFlightMenuOpen && (
        <FlightMenu onClose={() => setIsFlightMenuOpen(false)} onFly={chooseDestination} />
      )}
      {!isFinale && (
        <RadioAssistant
          fallbackMessage={state.lastEvent}
          report={radioReport}
          state={state}
          mission={selectedMission}
        />
      )}
    </main>
  );
}
