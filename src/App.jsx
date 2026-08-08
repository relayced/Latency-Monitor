import ControlsBar from './components/ControlsBar';
import TargetCard from './components/TargetCard';
import { usePingMonitor } from './hooks/usePingMonitor';
import { TARGETS } from './constants';
import './styles/App.css';

const COLORS = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'];

export default function App() {
  const monitor = usePingMonitor();

  return (
    <div className="sheet">
      <div className="title-block">
        <h1>Latency monitor</h1>
        <div className="subtitle">Network performance</div>
      </div>

      <ControlsBar
        intervalMs={monitor.intervalMs}
        setIntervalMs={monitor.setIntervalMs}
        running={monitor.running}
        onToggle={monitor.toggle}
        onReset={monitor.reset}
      />

      <div className="card-stack">
        {TARGETS.map((t, i) => (
          <TargetCard
            key={t.label}
            label={t.label}
            color={COLORS[i % COLORS.length]}
            readings={monitor.readings[i]}
            stats={monitor.stats[i]}
          />
        ))}
      </div>

      <div className="footnote">
        Measures round-trip time of a small network request from your browser to each target at
        once. This reflects your real connection responsiveness, but it is not a raw ICMP ping
        (browsers can't send those). Spikes above 150ms or failed requests usually mean congestion,
        a flaky router, or ISP-side trouble.
      </div>
    </div>
  );
}