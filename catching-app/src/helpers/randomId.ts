export default function randomId() {
  return Math.random().toString(36).slice(5, 10);
}
