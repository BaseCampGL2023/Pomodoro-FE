export function secondsToHmsFormat(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  return `${formatTime(h)}:${formatTime(m)}:${formatTime(s)}`;
}

export function secondsToMsFormat(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${formatTime(m)}:${formatTime(s)}`;
}

function formatTime(value: number): string {
  return value > 9 ? value.toString() : `0${value}`;
}
