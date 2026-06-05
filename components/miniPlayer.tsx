"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { SFBackwardFill, SFBadgePlusRadiowavesRight, SFChevronRight, SFDocument, SFDocumentOnDocument, SFEllipsis, SFForwardFill, SFListBullet, SFMusicMicrophone, SFPauseFill, SFPlayFill, SFRepeat, SFShuffle, SFSpeakerSlashFill, SFSpeakerWave2Fill, SFTextBadgePlus } from 'sf-symbols-lib/monochrome';
import { SFQuoteBubble, SFStar, SFInfoCircle, SFHandThumbsdown, SFMusicNote, SFSquareStack, SFMusicNoteList } from "sf-symbols-lib";

import Image from "next/image";
import cover from "@/public/covers/artwork.jpg";

const MENU = [
  { icon: SFTextBadgePlus, label: "Add to Playlist", submenu: true },
  { icon: SFBadgePlusRadiowavesRight, label: "Create Station" },
  { divider: true },
  { icon: SFInfoCircle, label: "Get Info" },
  { icon: SFStar, label: "Favorite" },
  { icon: SFHandThumbsdown, label: "Suggest Less" },
  { divider: true },
  { icon: SFMusicNote, label: "Go to Current Song" },
  { icon: SFSquareStack, label: "Show Album in Library" },
  { icon: SFMusicMicrophone, label: "Show Artist in Library" },
  { icon: SFMusicNoteList, label: "Show in Playlist", submenu: true },
  { divider: true },
  { icon: SFDocumentOnDocument, label: "Copy" },
  { icon: SFDocument, label: "Show in Finder" },
] as const;


/* ------------------------------------------------------------------ */
/*  MiniPlayer                                                         */
/* ------------------------------------------------------------------ */

export default function MiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress] = useState(38); // %

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Cerrar al hacer click afuera o con Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        menuRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      )
        return;
      setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

    return (
        <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-3xl z-40"
        >
            <div className="relative overflow-visible rounded-full border border-white/60 bg-white/75 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.06)]">
                {/* Controles + info */}
                <div className="flex items-center gap-1 px-2 py-0.5 pt-1.5">

                    <div className="flex items-center gap-0.5 pb-1">
                        <IconBtn>
                            <SFShuffle size="sm" className="text-neutral-400" />
                        </IconBtn>
                        <IconBtn>
                            <SFBackwardFill size="md" className="fill-neutral-900 text-neutral-900" />
                        </IconBtn>

                        {/* Play / Pause */}
                        <motion.button
                            onClick={() => setIsPlaying((p) => !p)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isPlaying ? "pause" : "play"}
                                    initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0.4, opacity: 0, rotate: 30 }}
                                    transition={{ duration: 0.16, ease: "easeOut" }}
                                    className="block"
                                >
                                    {isPlaying ? (
                                        <SFPauseFill size="md" className="fill-neutral-900 text-neutral-900" />
                                    ) : (
                                        <SFPlayFill size="md" className="fill-neutral-900 text-neutral-900 translate-x-px" />
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>

                        <IconBtn>
                            <SFForwardFill size="md" className="fill-neutral-900 text-neutral-900" />
                        </IconBtn>
                        <IconBtn>
                            <SFRepeat size="sm" className="text-neutral-400" />
                        </IconBtn>
                    </div>

                   <div className="flex items-center w-full relative pb-1.5 px-1">
                        {/* Now playing */}
                        <motion.div
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.035)" }}
                            className="flex items-center gap-3 flex-1 min-w-0 px-0 py-1 rounded-lg cursor-default"
                        >
                            <AlbumArt />
                            <div className="min-w-0">
                                <div className="font-semibold text-sm leading-tight truncate text-neutral-900">
                                     Westpath (Ezequiel Marotte Remix)
                                </div>
                                <div className="text-xs text-neutral-500 truncate leading-tight mt-px">
                                    Alexander Gaas — Highlands Music
                                </div>
                            </div>
                        </motion.div>

                        {/* "..." con dropdown */}
                        <div className="relative">
                            <motion.button
                                ref={triggerRef}
                                onClick={() => setMenuOpen((o) => !o)}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.88 }}
                                className={`p-2 rounded-full transition-colors ${menuOpen ? "bg-black/10" : "hover:bg-black/5"
                                    }`}
                            >
                                <SFEllipsis size="sm" className="text-neutral-800" />
                            </motion.button>

                            <AnimatePresence>
                                {menuOpen && (
                                    <motion.div
                                        ref={menuRef}
                                        initial={{ opacity: 0, scale: 0.94, y: 8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.94, y: 8 }}
                                        transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ transformOrigin: "bottom right" }}
                                        className="absolute bottom-[calc(100%+10px)] right-0 z-50 min-w-60 rounded-xl border border-black/5 bg-white/95 backdrop-blur-xl backdrop-saturate-150 py-1.5 shadow-[0_12px_40px_-4px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden"
                                    >
                                        {MENU.map((it, i) =>
                                            "divider" in it ? (
                                                <div key={i} className="my-1.5 mx-2 h-px bg-neutral-200/80" />
                                            ) : (
                                                <button
                                                    key={i}
                                                    onClick={() => setMenuOpen(false)}
                                                    className="flex w-full items-center gap-3 px-3 py-1.25 text-[13px] text-neutral-900 hover:bg-blue-500 hover:text-white transition-colors"
                                                >
                                                    <it.icon size="sm" strokeWidth={1.75} />
                                                    <span className="flex-1 text-left">{it.label}</span>
                                                    {"submenu" in it && it.submenu && <SFChevronRight size="xs" />}
                                                </button>
                                            )
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Progress bar */}
                        <div className="absolute left-0 right-0 bottom-0.5 mx-1 p-0 h-0.75 bg-neutral-200/70 overflow-hidden rounded-full">
                            <motion.div
                                className="h-full bg-neutral-500/80"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                   </div>

                    <div className="flex items-center gap-0.5 pb-1">
                        <IconBtn>
                            <SFQuoteBubble size="sm" className="text-neutral-800" />
                        </IconBtn>
                        <IconBtn>
                            <SFListBullet size="sm" className="text-neutral-800" />
                        </IconBtn>
                        <IconBtn onClick={() => setMuted((m) => !m)}>
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={muted ? "muted" : "vol"}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.12 }}
                                >
                                    {muted ? (
                                        <SFSpeakerSlashFill size="sm" strokeWidth={2} className="text-neutral-800" />
                                    ) : (
                                        <SFSpeakerWave2Fill size="sm" strokeWidth={2} className="text-neutral-800" />
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </IconBtn>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function IconBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.88 }}
      className="p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
    >
      {children}
    </motion.button>
  );
}

function AlbumArt() {
  return (
    <div className="relative w-8 h-8 shrink-0 overflow-hidden rounded-md shadow-sm">
      <Image
        src={cover}
        alt="Foundation - Luciano Lozz"
        fill
        sizes="64px"
        className="object-cover"
        placeholder="blur"
        priority
      />
    </div>
  );
}
