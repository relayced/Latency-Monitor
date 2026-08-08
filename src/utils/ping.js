export async function pingOnce(url) {
  const start = performance.now();
  try {
    await fetch(url, { mode: 'no-cors', cache: 'no-store' });
    return Math.round(performance.now() - start);
  } catch (e) {
    return null;
  }
}