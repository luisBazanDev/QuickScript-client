export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (time < 0) {
    return `00:00`;
  }

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
