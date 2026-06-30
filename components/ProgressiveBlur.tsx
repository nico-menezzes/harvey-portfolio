/**
 * Progressive blur overlay (pure CSS — see `.progressive-blur` in globals.css).
 * Six stacked layers; each is a masked parent wrapping a blurred child, so the
 * blur ramps up toward the bottom edge. Mask and backdrop-filter live on
 * separate elements to stay reliable across browsers.
 * Position it with the wrapper `className` (e.g. height/anchor).
 */
export function ProgressiveBlur({ className = "" }: { className?: string }) {
  return (
    <div className={`progressive-blur ${className}`} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <div />
        </div>
      ))}
    </div>
  );
}
