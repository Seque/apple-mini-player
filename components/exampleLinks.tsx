import { ArrowUpRight } from "@/components/icons";

type ExampleLinksProps = {
  /** URL del file de Figma (o frame específico de la demo). */
  figma: string;
  /** URL del repo en GitHub. */
  github: string;
  /** Paleta según el fondo del ejemplo: "light" (claro) o "dark" (oscuro). */
  tone?: "light" | "dark";
};

// Fila de links (Figma · GitHub). Color explícito por `tone` para no depender de
// un tema global (la demo fija su propio fondo claro/oscuro).
export function ExampleLinks({ figma, github, tone = "light" }: ExampleLinksProps) {
  const linkClasses =
    tone === "dark"
      ? "text-white/45 hover:text-white"
      : "text-neutral-500 hover:text-neutral-900";

  const links = [
    { label: "Figma", href: figma },
    { label: "GitHub", href: github },
  ];

  return (
    <div className="mt-4 flex items-center justify-center gap-5 text-sm">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer noopener"
          className={`inline-flex items-center gap-1 transition-colors ${linkClasses}`}
        >
          {l.label}
          <ArrowUpRight className="size-3" />
        </a>
      ))}
    </div>
  );
}
