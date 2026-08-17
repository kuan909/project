type PortalGateProps = {
  isBeyondPortal: boolean;
  onTravel: () => void;
};

export function PortalGate({ isBeyondPortal, onTravel }: PortalGateProps) {
  return (
    <button className="portal-gate" onClick={onTravel} type="button">
      <span className="portal-gate__ring" aria-hidden="true">
        <i />
        <b>✦</b>
      </span>
      <strong>{isBeyondPortal ? 'Вернуться' : 'Портал'}</strong>
      <small>{isBeyondPortal ? 'В Облачный пояс' : 'К дальним островам'}</small>
    </button>
  );
}
