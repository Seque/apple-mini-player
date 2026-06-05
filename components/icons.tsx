// Ícono inline (SVG con currentColor) para no sumar dependencias de íconos.
// Hereda el color del texto via `currentColor` y se escala con className.

type IconProps = { className?: string };

/** Flecha ↗ "abrir en pestaña nueva" que acompaña los links de la demo. */
export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 11 11 5" />
      <path d="M6 5h5v5" />
    </svg>
  );
}
