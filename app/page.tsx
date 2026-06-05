import MiniPlayer from "@/components/miniPlayer";
import { ExampleLinks } from "@/components/exampleLinks";

// URLs de referencia de la demo. Apuntá GitHub a este repo (y, si querés, Figma
// a un frame específico en vez del file).
const FIGMA_URL = "https://www.figma.com/design/P3eKYHWxFJHUupIgXakv9F/Apple-Music-Mini-Player?node-id=103-2";
const GITHUB_URL = "https://github.com/Seque/apple-mini-player";

export default function MiniPlayerExample() {
  return (
    // pb-32 deja aire para que el MiniPlayer (fixed bottom) no se monte sobre el contenido.
    // items-center centra toda la columna; el contenido va con text-center.
    <main className="relative flex min-h-screen flex-col items-center bg-zinc-50 px-6 pb-32 pt-10">
      <header className="max-w-2xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Mini Player
        </h1>
        <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
          Apple Music–style player. Spring entrance, play/pause icon swap with{" "}
          <code>AnimatePresence mode=&quot;wait&quot;</code>, dropdown with{" "}
          <code>transformOrigin</code>, and close on click-outside / Escape.
        </p>
        <ExampleLinks figma={FIGMA_URL} github={GITHUB_URL} tone="light" />
      </header>

      {/* El componente se posiciona fixed bottom solo, no hace falta wrapper extra. */}
      <MiniPlayer />
    </main>
  );
}
