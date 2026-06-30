/**
 * Progressive blur overlay (pure CSS — see `.progressive-blur` in globals.css).
 * Four stacked backdrop-filter layers whose gradient masks step downward, so
 * the blur ramps up toward the bottom edge and fades out toward the top.
 * Position it with the wrapper `className` (e.g. height/anchor).
 */
export function ProgressiveBlur({ className = "" }: { className?: string }) {
  return (
    <div className={`progressive-blur ${className}`} aria-hidden="true">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
