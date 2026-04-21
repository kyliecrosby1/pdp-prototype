"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AddBookIconSm,
  ArrowRightIconSm,
  CalendarIconSm,
  CloseIcon,
  HeartFavoriteIconSm,
  MenuIcon,
  PhoneMobileIconSm,
  StarOutlineIconSm,
} from "./icons";

const headerPhotos = [
  { seed: "chatbooks-a", alt: "Family photo" },
  { seed: "chatbooks-b", alt: "Nature photo" },
  { seed: "chatbooks-c", alt: "Food photo" },
  { seed: "chatbooks-d", alt: "Kids photo" },
  { seed: "chatbooks-e", alt: "Outdoor photo" },
  { seed: "chatbooks-f", alt: "Home photo" },
  { seed: "chatbooks-g", alt: "Pet photo" },
  { seed: "chatbooks-h", alt: "Travel photo" },
  { seed: "chatbooks-i", alt: "Celebration photo" },
] as const;

const categories = [
  { id: "baby", label: "Baby book", thumb: "/images/create-categories/baby-book.png" },
  { id: "year", label: "Year book", thumb: "/images/create-categories/year-book.png" },
  { id: "travel", label: "Travel book", thumb: "/images/create-categories/travel-book.png" },
  { id: "milestones", label: "Other milestones", thumb: "/images/create-categories/other-milestones.png" },
  { id: "gift", label: "Gift", thumb: "/images/create-categories/gift.png" },
] as const;

const featureIcons = {
  mobile: PhoneMobileIconSm,
  heart: HeartFavoriteIconSm,
  calendar: CalendarIconSm,
} as const;

export function CreateScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen justify-center bg-[#d2d2d7] px-0 py-0 md:px-6 md:py-10">
      <div className="relative flex min-h-screen w-full max-w-[402px] flex-col bg-surface md:max-h-[min(100vh,844px)] md:min-h-[min(100vh,844px)] md:overflow-y-auto md:rounded-[2.35rem] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] md:ring-1 md:ring-black/[0.06]">
        {/* Status bar */}
        <div className="absolute inset-x-0 top-0 z-20 flex shrink-0 items-center justify-between px-6 pt-[10px] pb-0.5 text-[15px] font-semibold tracking-tight text-text-title">
          <span className="tabular-nums">10:01</span>
          <div className="flex items-center gap-1 opacity-90" aria-hidden>
            <svg className="h-3 w-4" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
              <path d="M1 9.5h2v-4H1v4zm4 1.5h2V4H5v7zm4-3h2V1H9v7zm4 2h2V6h-2v4z" />
            </svg>
            <svg className="h-3 w-4" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
              <path d="M8 2.5c2.5 2.2 4 4.1 4 5.5a4 4 0 01-8 0c0-1.4 1.5-3.3 4-5.5z" />
            </svg>
            <div className="relative h-[13px] w-[25px] rounded-[3px] border-[1.5px] border-text-title px-[2px]">
              <div className="mt-[2px] h-[5px] w-[70%] rounded-[1px] bg-text-title" />
            </div>
          </div>
        </div>

        {/* Header photo grid (3 × 3) with white scrim */}
        <div className="relative h-[338px] shrink-0 overflow-hidden">
          <div className="absolute inset-x-0 -top-10 grid aspect-square grid-cols-3 grid-rows-3 gap-px bg-surface">
            {headerPhotos.map((p) => (
              <div key={p.seed} className="relative overflow-hidden bg-border-strong">
                <Image
                  src={`https://picsum.photos/seed/${p.seed}/400/400`}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  sizes="130px"
                  priority
                />
              </div>
            ))}
          </div>
          {/* White scrim: transparent → white from 0% to 81% */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 81%)",
            }}
            aria-hidden
          />
          {/* Menu button (Overlay-button pill) */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(true);
              setLastAction(null);
            }}
            className="absolute left-4 top-[52px] z-10 flex h-10 items-center justify-center gap-1 rounded-2xl border border-border-subtle bg-surface px-4 text-text-title shadow-[0_6px_16px_-4px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] transition hover:bg-surface-muted active:scale-[0.97]"
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          {/* Hero copy anchored to bottom of photo section */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-stretch gap-2 px-6 pb-1 text-center">
            <h1
              className="font-serif-heading text-text-title"
              style={{ fontSize: 32, lineHeight: 1, fontWeight: 400 }}
            >
              What are You Making Today?
            </h1>
            <p className="text-mobile-body-large text-center text-text-eyebrow">
              Personalize your experience by telling us what best describes the book you have in mind.
            </p>
          </div>
        </div>

        {/* Main content: 24px padding, 32px section gap */}
        <div className="flex flex-col gap-8 px-6 pt-4 pb-6">
          {/* Everyday Book card */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-[147px] shrink-0">
                <Image
                  src="/images/everyday-book-skewie.png"
                  alt="Everyday Book cover preview"
                  width={512}
                  height={659}
                  className="h-auto w-full object-contain"
                  sizes="147px"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-mobile-header-small text-text-title">Everyday Book</h2>
                  <span className="text-mobile-eyebrow inline-flex items-center gap-1.5 rounded-sm bg-highlighter px-1 py-0.5 text-text-title">
                    <StarOutlineIconSm className="h-4 w-4" />
                    Chatbooks favorite
                  </span>
                </div>
                <ul className="flex flex-col gap-2">
                  {(
                    [
                      { type: "mobile", text: "Your life, via your camera roll" },
                      { type: "heart", text: "Automatically add fav photos" },
                      { type: "calendar", text: "…Or select photos by month" },
                    ] as const
                  ).map((item) => {
                    const Icon = featureIcons[item.type];
                    return (
                      <li key={item.type} className="text-mobile-body-small flex items-center gap-1.5 text-text-body">
                        <Icon className="h-4 w-4 shrink-0 text-text-title" />
                        <span>{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/everyday"
                  className="text-mobile-body-small-bold inline-flex items-center justify-center gap-1 self-start rounded-xl px-0 py-2 text-text-title transition hover:opacity-75 active:opacity-60"
                >
                  Get started
                  <ArrowRightIconSm className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="h-px w-full bg-border-subtle" aria-hidden />
          </div>

          {/* Category grid (3 × 2) */}
          <div className="flex flex-col gap-6">
            {[categories.slice(0, 3), categories.slice(3)].map((row, rowIdx) => (
              <div key={rowIdx} className="flex items-stretch gap-4">
                {row.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setLastAction(`Selected: ${c.label}`)}
                    className="group flex flex-1 basis-0 flex-col items-center gap-2 rounded-xl text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-text-title)]/15 focus-visible:ring-offset-2"
                  >
                    <div className="flex h-[91px] w-full items-center justify-center px-2 transition group-active:scale-[0.98]">
                      <Image
                        src={c.thumb}
                        alt={c.label}
                        width={512}
                        height={512}
                        className="h-auto max-h-full w-auto max-w-full object-contain"
                        sizes="91px"
                      />
                    </div>
                    <span className="text-mobile-body-small-bold text-text-title">{c.label}</span>
                  </button>
                ))}
                {/* Fill the last cell of the second row with the scratch tile */}
                {rowIdx === 1 ? (
                  <button
                    type="button"
                    onClick={() => setLastAction("Start from scratch")}
                    className="group flex flex-1 basis-0 flex-col items-center gap-2 rounded-xl text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-teal-700)]/30 focus-visible:ring-offset-2"
                  >
                    <div className="flex h-[91px] w-full items-center justify-center px-2">
                      <div className="flex h-[91px] w-[91px] flex-col items-center justify-center gap-1 rounded-xl bg-teal-50 ring-1 ring-teal-100 transition group-active:scale-[0.98]">
                        <AddBookIconSm className="h-4 w-4 text-teal-700" />
                        <span className="text-mobile-fineprint text-center text-teal-700">
                          Or start from<br />scratch
                        </span>
                      </div>
                    </div>
                    <span className="text-mobile-body-small-bold invisible" aria-hidden>
                      spacer
                    </span>
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {lastAction ? (
          <p className="text-mobile-fineprint px-6 pb-2 text-center text-text-eyebrow" role="status">
            {lastAction}
          </p>
        ) : null}

        <div className="mt-auto flex justify-center pb-2 pt-2" aria-hidden>
          <div className="h-1 w-28 rounded-full bg-black/25" />
        </div>

        {/* Menu drawer */}
        {menuOpen ? (
          <div className="fixed inset-0 z-50 md:absolute">
            <button
              type="button"
              className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <nav
              className="absolute left-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-surface shadow-xl"
              aria-label="Main"
            >
              <div className="flex items-center justify-between border-b border-border-subtle px-4 py-4">
                <span className="font-serif-heading text-lg text-text-title">Menu</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full p-2 text-text-body hover:bg-surface-muted"
                  aria-label="Close"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              <ul className="text-mobile-body-large flex flex-col p-2 text-text-title">
                {["Home", "My books", "Account", "Help"].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="w-full rounded-lg px-3 py-3 text-left hover:bg-surface-muted"
                      onClick={() => {
                        setLastAction(`Menu: ${item}`);
                        setMenuOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ) : null}
      </div>
    </div>
  );
}
