/**
 * Subtle film-grain overlay for atmosphere/depth. Pure CSS + inline SVG noise,
 * no JS. Use `blend="multiply"` over light surfaces and `blend="screen"` over
 * dark ones so the grain reads without muddying the color.
 */
const NOISE = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>` +
    `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>` +
    `<feColorMatrix type='saturate' values='0'/></filter>` +
    `<rect width='100%' height='100%' filter='url(#n)'/></svg>`,
);

export function Grain({
  className = "",
  opacity = 0.05,
  blend = "multiply",
}: {
  className?: string;
  opacity?: number;
  blend?: "multiply" | "screen" | "overlay";
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        opacity,
        mixBlendMode: blend,
        backgroundImage: `url("data:image/svg+xml,${NOISE}")`,
        backgroundSize: "140px 140px",
      }}
    />
  );
}
