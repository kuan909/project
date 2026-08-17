type PortalGateProps = {
  isBeyondPortal: boolean;
  hasSecretSignal: boolean;
  onTravel: () => void;
};

export function PortalGate({ isBeyondPortal, hasSecretSignal, onTravel }: PortalGateProps) {
  return (
    <button className={`portal-gate${hasSecretSignal ? ' portal-gate--signal' : ''}`} onClick={onTravel} type="button">
      <span className="portal-gate__ring" aria-hidden="true">
        <i />
        <b>✦</b>
      </span>
      <strong>{isBeyondPortal ? 'Вернуться' : 'Портал'}</strong>
      <small>{hasSecretSignal && !isBeyondPortal ? 'Обнаружен тайный сигнал!' : isBeyondPortal ? 'В Облачный пояс' : 'К дальним островам'}</small>
    </button>
  );
}
