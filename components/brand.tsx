import Image from "next/image";

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

export function Wordmark({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Image
      src={tone === "light" ? "/beamhubLogo.svg" : "/beamhubLogo-dark.svg"}
      alt="BeamHub.org"
      width={160}
      height={56}
      className={`wordmark-logo ${className}`.trim()}
    />
  );
}
