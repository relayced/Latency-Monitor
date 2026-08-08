import { useState, useRef, useEffect } from 'react';
import { pingOnce } from '../utils/ping';
import { TARGETS, MAX_POINTS } from '../constants';

export function usePingMonitor() {
  const [running, setRunning] = useState(false);
  const [intervalMs, setIntervalMs] = useState(2000);
  const [readings, setReadings] = useState(() => TARGETS.map(() => []));
  const [failCounts, setFailCounts] = useState(() => TARGETS.map(() => 0));
  const [totalCounts, setTotalCounts] = useState(() => TARGETS.map(() => 0));
  const timerRef = useRef(null);

  const tick = async () => {
    const results = await Promise.all(TARGETS.map((t) => pingOnce(t.url)));

    setReadings((prev) =>
      prev.map((arr, i) => {
        const next = [...arr, results[i]];
        return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next;
      })
    );
    setTotalCounts((prev) => prev.map((c) => c + 1));
    setFailCounts((prev) => prev.map((c, i) => (results[i] === null ? c + 1 : c)));
  };

  useEffect(() => {
    if (!running) return;
    tick();
    timerRef.current = setInterval(tick, intervalMs);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, intervalMs]);

  const reset = () => {
    setReadings(TARGETS.map(() => []));
    setFailCounts(TARGETS.map(() => 0));
    setTotalCounts(TARGETS.map(() => 0));
  };

  const toggle = () => setRunning((r) => !r);

  const stats = TARGETS.map((t, i) => {
    const arr = readings[i];
    const valid = arr.filter((r) => r !== null);
    const current = arr[arr.length - 1];
    const avg = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : null;
    const min = valid.length ? Math.min(...valid) : null;
    const max = valid.length ? Math.max(...valid) : null;
    const lossPct = totalCounts[i] ? Math.round((failCounts[i] / totalCounts[i]) * 100) : 0;
    return { label: t.label, current, avg, min, max, lossPct, failCount: failCounts[i] };
  });

  return { running, intervalMs, setIntervalMs, readings, stats, toggle, reset };
}