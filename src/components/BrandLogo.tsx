export default function BrandLogo({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="brand-mark"
      style={{ filter: "drop-shadow(0 0 12px rgba(0,162,255,0.55))" }}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4FBFFF" />
          <stop offset="100%" stopColor="#0066CC" />
        </linearGradient>
      </defs>
      <polygon
        points="50,8 86,29 86,71 50,92 14,71 14,29"
        fill="none"
        stroke="url(#logoGrad)"
        strokeWidth="4"
      />
      <path
        d="M30 38 L50 28 L70 38 L70 62 L50 72 L30 62 Z"
        fill="none"
        stroke="url(#logoGrad)"
        strokeWidth="3"
      />
      <path
        d="M30 38 L50 48 L70 38"
        fill="none"
        stroke="url(#logoGrad)"
        strokeWidth="3"
      />
      <line
        x1="50"
        y1="48"
        x2="50"
        y2="72"
        stroke="url(#logoGrad)"
        strokeWidth="3"
      />
    </svg>
  );
}
