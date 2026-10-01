export function BeamMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="24" cy="24" r="7" fill="currentColor" />
      {Array.from({ length: 12 }, (_, index) => (
        <path
          key={index}
          d="M24 4V11"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${index * 30} 24 24)`}
        />
      ))}
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <span>beam<span className="wordmark-hub">hub</span></span>
      <BeamMark className="wordmark-symbol" />
    </span>
  );
}
