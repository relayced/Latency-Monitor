export default function ControlsBar({ intervalMs, setIntervalMs, running, onToggle, onReset }) {
  return (
    <div className="controls">
      <select value={intervalMs} onChange={(e) => setIntervalMs(Number(e.target.value))}>
        <option value={1000}>every 1s</option>
        <option value={2000}>every 2s</option>
        <option value={5000}>every 5s</option>
      </select>

      <button className="primary" onClick={onToggle}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={onReset}>Reset</button>

      <div className="status-row">
        <span className={`dot ${running ? 'live' : ''}`} />
        <span>{running ? 'monitoring' : 'idle'}</span>
      </div>
    </div>
  );
}