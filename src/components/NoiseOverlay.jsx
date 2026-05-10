export default function NoiseOverlay() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
      <svg className="w-full h-full opacity-100">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
