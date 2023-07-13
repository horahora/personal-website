export default function RaidalProgress() {
  return (
    <svg viewBox="0 0 100 100">
      <rect x="60" y="10" rx="10" ry="10" width="30" height="30" />
      <circle cx="25" cy="75" r="20" />
      <ellipse cx="75" cy="75" rx="20" ry="5" />
      <path d="M 10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black" />
      <path
        d="M 10 10 C 20 20, 40 20, 50 10"
        stroke="black"
        fill="transparent"
      />
    </svg>
  );
}
