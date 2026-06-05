# Mini Player

An Apple Music–style desktop mini player — a floating pill with playback controls, now-playing info, a contextual dropdown, and an animated progress bar. Every interactive surface animates, the dropdown reads as a native macOS context menu, and the materials use backdrop blur with layered shadows.

## Demo

https://github.com/user-attachments/assets/a7bddab1-b014-4547-95ed-c3750196caf0

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4
- [`motion`](https://motion.dev) v12 (`motion/react`) — the rebranded Framer Motion
- [`sf-symbols-lib`](https://www.npmjs.com/package/sf-symbols-lib) for Apple SF Symbols

## Run

```bash
npm install
npm run dev
# http://localhost:3000
```

## Patterns of interest

- **Icon crossfade on toggles.** Play ⇄ Pause and Muted ⇄ Unmuted swap with rotation + scale via `AnimatePresence mode="wait"`, so the exit animation completes before the entry starts.
- **Universal hover/tap micro-interactions.** Every button scales `1.08` on hover and `0.88` on tap via `whileHover` / `whileTap` (the local `IconBtn` helper).
- **Dropdown anchored to its trigger.** The menu opens from `transformOrigin: "bottom right"`, so the scale feels rooted to the ellipsis button.
- **Outside-click + Escape dismissal.** A single `useEffect` subscribes to `mousedown` and `keydown` only while the menu is open.
- **Progress bar mount animation.** Width animates from `0` to the current percentage on mount.

## Structure

- `app/page.tsx` — the demo page
- `components/miniPlayer.tsx` — the player component
- `components/exampleLinks.tsx` — Figma · GitHub links
- `public/covers/artwork.jpg` — the now-playing artwork
