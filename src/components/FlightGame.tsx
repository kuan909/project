import { useEffect, useRef, useState, type PointerEvent } from 'react';

type FlightGameProps = { destination: string; onLand: () => void; onCrash: () => void };
type FlightStatus = 'flying' | 'landed' | 'crashed';

const FLIGHT_TIME = 20;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function FlightGame({ destination, onLand, onCrash }: FlightGameProps) {
  const controls = useRef({ roll: 0, pitch: 0, throttle: .72 });
  const flight = useRef({ altitude: 72, roll: 0, elapsed: 0, speed: 170, fuel: 100 });
  const lastFrame = useRef<number | null>(null);
  const [status, setStatus] = useState<FlightStatus>('flying');
  const [view, setView] = useState(flight.current);

  useEffect(() => {
    if (status !== 'flying') return;
    let frameId = 0;
    const tick = (now: number) => {
      const previous = lastFrame.current ?? now;
      const delta = Math.min((now - previous) / 1000, 0.04);
      lastFrame.current = now;
      const current = flight.current;
      current.elapsed += delta;
      current.roll += (controls.current.roll * 68 - current.roll) * delta * 2.7;
      const targetSpeed = 58 + controls.current.throttle * 190 - Math.max(0, controls.current.pitch) * 38;
      current.speed += (targetSpeed - current.speed) * delta * .75;
      current.fuel = Math.max(0, current.fuel - controls.current.throttle * delta * 1.25);
      if (current.fuel <= 0) controls.current.throttle = 0;
      const turbulence = Math.sin(current.elapsed * 2.4) * 1.2;
      const lift = current.speed > 105 ? controls.current.pitch * 22 : -28;
      const climb = lift - 5 - Math.abs(current.roll) * .1 + turbulence;
      current.altitude = clamp(current.altitude + climb * delta, 0, 100);
      setView({ ...current });
      if (current.altitude <= 0) setStatus('crashed');
      else if (current.elapsed >= FLIGHT_TIME) {
        const safeLanding = current.altitude <= 28 && Math.abs(current.roll) <= 18 && current.speed >= 105 && current.speed <= 175;
        setStatus(safeLanding ? 'landed' : 'crashed');
      }
      else frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [status]);

  useEffect(() => {
    const setKey = (event: KeyboardEvent, pressed: boolean) => {
      const key = event.key.toLowerCase();
      if (key === 'arrowleft' || key === 'a') controls.current.roll = pressed ? -1 : 0;
      if (key === 'arrowright' || key === 'd') controls.current.roll = pressed ? 1 : 0;
      if (key === 'arrowup' || key === 'w') controls.current.pitch = pressed ? 1 : 0;
      if (key === 'arrowdown' || key === 's') controls.current.pitch = pressed ? -1 : 0;
    };
    const down = (event: KeyboardEvent) => setKey(event, true);
    const up = (event: KeyboardEvent) => setKey(event, false);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  const steer = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.type === 'pointermove' && event.buttons === 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = event.currentTarget.getBoundingClientRect();
    controls.current.roll = clamp(((event.clientX - rect.left) / rect.width - .5) * 2, -1, 1);
    controls.current.pitch = clamp((.5 - (event.clientY - rect.top) / rect.height) * 2, -1, 1);
  };

  const releaseWheel = () => { controls.current.roll = 0; controls.current.pitch = 0; };
  const horizonStyle = { transform: `translateY(${view.altitude * .18}px) rotate(${-view.roll}deg) scale(1.25)` };
  const wheelStyle = { transform: `translateY(${-controls.current.pitch * 8}px) rotate(${controls.current.roll * 60}deg)` };
  const secondsLeft = Math.max(0, Math.ceil(FLIGHT_TIME - view.elapsed));
  const isStalling = view.speed < 105;

  return (
    <section className="cockpit" aria-label="Управление самолётом">
      <div className="cockpit__world" style={horizonStyle}>
        <div className="flight-sky" />
        <div className="flight-islands"><i /><i /><i /></div>
        <div className="flight-clouds">☁　　☁</div>
      </div>
      <div className="cockpit__photo" />
      <div className="cockpit__frame cockpit__frame--left" /><div className="cockpit__frame cockpit__frame--right" />
      <div className="cockpit__roof" />
      <div className="flight-hud">
        <span>ВЫСОТА <b>{Math.round(view.altitude * 34)} м</b></span>
        <span>КРЕН <b>{Math.round(view.roll)}°</b></span>
        <span>СКОРОСТЬ <b>{Math.round(view.speed)} км/ч</b></span>
        <span>ДО ЦЕЛИ <b>{secondsLeft} сек</b></span>
      </div>
      <div className="flight-destination">КУРС: <b>{destination}</b></div>
      {secondsLeft <= 7 && status === 'flying' && (
        <div className="landing-warning">СНИЖАЙСЯ ДО 950 М · КРЕН 0° · СКОРОСТЬ 105–175</div>
      )}
      {isStalling && status === 'flying' && <div className="stall-warning">⚠ СВАЛИВАНИЕ — ДОБАВЬ ТЯГУ</div>}
      <div className="dashboard">
        <div className="gauge"><i style={{ transform: `rotate(${view.altitude * 1.8 - 90}deg)` }} /><b>ALT</b></div>
        <div className="gauge"><i style={{ transform: `rotate(${view.roll}deg)` }} /><b>BANK</b></div>
        <div className="dashboard__lights"><i /><i /><i /></div>
      </div>
      <label className="throttle-control">
        <span>ТЯГА <b>{Math.round(controls.current.throttle * 100)}%</b></span>
        <input type="range" min="0" max="100" defaultValue="72" onInput={(event) => { controls.current.throttle = Number(event.currentTarget.value) / 100; }} />
        <small>ТОПЛИВО {Math.round(view.fuel)}%</small>
      </label>
      <button className="steering-wheel" style={wheelStyle} onPointerDown={steer} onPointerMove={steer} onPointerUp={releaseWheel} aria-label="Штурвал">
        <i /><span>К</span><b />
      </button>
      <p className="flight-help">Штурвал управляет высотой и креном · рычаг тяги управляет скоростью</p>
      {status !== 'flying' && (
        <div className="flight-result">
          <span>{status === 'crashed' ? '⚠' : '✓'}</span>
          <h2>{status === 'crashed' ? 'Самолёт упал' : 'Посадка разрешена!'}</h2>
          <p>{status === 'crashed' ? 'Для посадки: высота до 950 м, крен до 18°, скорость 105–175 км/ч.' : `Ты мягко приземлился на острове «${destination}».`}</p>
          <button onClick={status === 'crashed' ? onCrash : onLand}>{status === 'crashed' ? 'Начать заново' : 'Вернуться на карту'}</button>
        </div>
      )}
    </section>
  );
}
