import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function TargetCard({ label, color, readings, stats }) {
  const chartData = readings.map((r, i) => ({ i, ms: r }));

  return (
    <div className="target-card">
      <div className="target-header">{label}</div>
      <div className="target-body">
        <ul className="target-stats">
          <li>
            <span className="stat-label">Current:</span>
            <span className="stat-value" style={{ color }}>
              {stats.current === null ? 'timeout' : stats.current ?? '—'}
            </span>
          </li>
          <li>
            <span className="stat-label">Avg:</span>
            <span className="stat-value">{stats.avg ?? '—'}</span>
          </li>
          <li>
            <span className="stat-label">Min:</span>
            <span className="stat-value">{stats.min ?? '—'}</span>
          </li>
          <li>
            <span className="stat-label">Max:</span>
            <span className="stat-value">{stats.max ?? '—'}</span>
          </li>
          <li>
            <span className="stat-label">Loss:</span>
            <span className="stat-value">
              {stats.lossPct}% ({stats.failCount})
            </span>
          </li>
        </ul>

        <div className="mini-chart">
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={chartData}>
              <XAxis dataKey="i" hide />
              <YAxis stroke="#4A6482" fontSize={10} width={28} />
              <Line
                type="monotone"
                dataKey="ms"
                stroke={color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mini-legend">
            <span className="legend-swatch" style={{ background: color }} />
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}