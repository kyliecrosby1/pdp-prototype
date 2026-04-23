"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AddBookIcon,
  ArrowDownIcon,
  BookStackIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExpandZoomIconSm,
  FilterIcon,
  RulerIcon,
  SearchIcon,
  SortIcon,
  StarIcon,
} from "./icons";

// ── Data ─────────────────────────────────────────────────────────────────────

type FrequencyId = "monthly" | "every60" | "once";

const frequencies: Array<{
  id: FrequencyId;
  title: string;
  bullets: Array<{ icon: "book" | "heart"; text: string }>;
  perfectFor?: string;
}> = [
  {
    id: "monthly",
    title: "Monthly",
    bullets: [
      { icon: "book", text: "1 book per month, 30-60 pages" },
      { icon: "heart", text: "Pick your fav photos from that month" },
    ],
    perfectFor: "Parents of young children, frequent photo-takers",
  },
  {
    id: "every60",
    title: "Every 60 photos",
    bullets: [
      { icon: "book", text: "A book prints each time 60 photos are added" },
      { icon: "heart", text: "Automatic photo curation (set it and forget it)" },
    ],
    perfectFor: "Parents of older kids, casual photo-takers",
  },
  {
    id: "once",
    title: "Just this one book",
    bullets: [{ icon: "book", text: "Manually select and compile your photos" }],
  },
];

// ── Size options ────────────────────────────────────────────────────────────

type SizeId = "5mini" | "5x7" | "6x6" | "8x8";
type CoverTypeId = "soft" | "hard";
type SizeOption = { id: SizeId; label: string; image: string; shortLabel: string };

const ALL_SIZES: Record<SizeId, SizeOption> = {
  "5mini": { id: "5mini", label: '5 x 5" minis', shortLabel: '5x5"', image: "/images/selectors/size-1.png" },
  "5x7": { id: "5x7", label: '5 × 7"', shortLabel: '5x7"', image: "/images/selectors/size-2.png" },
  "6x6": { id: "6x6", label: '6 × 6"', shortLabel: '6x6"', image: "/images/selectors/size-3.png" },
  "8x8": { id: "8x8", label: '8 × 8"', shortLabel: '8x8"', image: "/images/selectors/size-4.png" },
};

// "monthly" offers an exclusive 5 x 5" minis option;
// "every60" + "once" share the three standard sizes.
const sizesByFrequency: Record<FrequencyId, SizeOption[]> = {
  monthly: [ALL_SIZES["5mini"], ALL_SIZES["5x7"], ALL_SIZES["6x6"], ALL_SIZES["8x8"]],
  every60: [ALL_SIZES["6x6"], ALL_SIZES["5x7"], ALL_SIZES["8x8"]],
  once: [ALL_SIZES["6x6"], ALL_SIZES["5x7"], ALL_SIZES["8x8"]],
};

const coverTypes: Array<{ id: CoverTypeId; label: string; image: string }> = [
  { id: "soft", label: "Softcover", image: "/images/selectors/cover-softcover.png" },
  { id: "hard", label: "Hardcover", image: "/images/selectors/cover-hardcover.png" },
];

// ── Per-book pricing ────────────────────────────────────────────────────────
// Pricing matrix from the Notion spec:
//   5x5" minis: $10 (softcover only — hardcover is disabled when 5x5 is picked)
//   5x7" / 6x6": $15 softcover, $24 hardcover
//   8x8":       $24 softcover, $34 hardcover

const PRICE_TABLE: Record<SizeId, Record<CoverTypeId, number | null>> = {
  "5mini": { soft: 10, hard: null },
  "5x7": { soft: 15, hard: 24 },
  "6x6": { soft: 15, hard: 24 },
  "8x8": { soft: 24, hard: 34 },
};

function getBookPrice(size: SizeId | null, coverType: CoverTypeId | null): number | null {
  if (!size || !coverType) return null;
  return PRICE_TABLE[size][coverType];
}

// Annual subscription = 12 books with 2 free (you pay for 10).
function formatUSD(n: number): string {
  return `$${n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)}`;
}

// ── Cover design options ────────────────────────────────────────────────────

// Cover designs per frequency. "ombre" are 3-stripe gradients (monthly only),
// "solid" are flat fills, and "pattern" swatches use real Figma artwork
// rendered via a background image.
type CoverDesign = {
  id: string;
  label: string;
  type: "ombre" | "solid" | "pattern";
  stripes?: [string, string, string];
  color?: string;
  image?: string;
  outline?: boolean;
  upcharge?: number;
};

// The 5x5" minis have their own unique set of solid colors & multi-quadrant
// patterns (Monthly only). Imagery is pulled from the Notion matrix doc.
const MINIS_DESIGNS: CoverDesign[] = [
  { id: "minis-gray", label: "Gray", type: "pattern", image: "/images/minis-swatches/gray.png" },
  { id: "minis-sage", label: "Sage", type: "pattern", image: "/images/minis-swatches/sage.png" },
  { id: "minis-dusty-rose", label: "Dusty rose", type: "pattern", image: "/images/minis-swatches/dusty-rose.png" },
  { id: "minis-dark-teal", label: "Dark teal", type: "pattern", image: "/images/minis-swatches/dark-teal.png" },
  { id: "minis-cream", label: "Cream", type: "pattern", image: "/images/minis-swatches/cream.png" },
  { id: "minis-olive", label: "Olive", type: "pattern", image: "/images/minis-swatches/olive.png" },
  { id: "minis-red", label: "Red", type: "pattern", image: "/images/minis-swatches/red.png" },
  { id: "minis-yellow", label: "Yellow", type: "pattern", image: "/images/minis-swatches/yellow.png" },
  { id: "minis-pink", label: "Pink", type: "pattern", image: "/images/minis-swatches/pink.png" },
  { id: "minis-blue", label: "Blue", type: "pattern", image: "/images/minis-swatches/blue.png" },
  { id: "minis-lavender", label: "Lavender", type: "pattern", image: "/images/minis-swatches/lavender.png" },
  { id: "minis-muted-quad", label: "Muted multi", type: "pattern", image: "/images/minis-swatches/muted-quad.png" },
  { id: "minis-bright-quad", label: "Bright multi", type: "pattern", image: "/images/minis-swatches/bright-quad.png" },
];

// Standard swatch set shared by non-minis sizes across all frequencies.
// Includes ombré gradients, solids, and pattern imagery.
const STANDARD_DESIGNS: CoverDesign[] = [
  { id: "sage-ombre", label: "Sage ombre", type: "ombre", stripes: ["#2d5f5a", "#6f9c94", "#c8d9d1"] },
  { id: "coral-ombre", label: "Coral ombre", type: "ombre", stripes: ["#c94a54", "#e9848a", "#f4c5c7"] },
  { id: "purple-ombre", label: "Purple ombre", type: "ombre", stripes: ["#5c4a8a", "#9d84c2", "#d6c9e8"] },
  { id: "sage", label: "Sage", type: "solid", color: "#99c5b3" },
  { id: "blush", label: "Blush", type: "solid", color: "#fbd8d0" },
  { id: "black", label: "Black", type: "solid", color: "#111114" },
  { id: "teal-solid", label: "Teal", type: "solid", color: "#4c7891" },
  { id: "lavender-solid", label: "Lavender", type: "solid", color: "#b48fd3" },
  { id: "marble", label: "Marble swirl", type: "pattern", image: "/images/cover-designs/marble.png" },
  { id: "pink-rose", label: "Pink rose", type: "pattern", image: "/images/cover-designs/pink-rose.png" },
  { id: "black-dots", label: "Black dots", type: "pattern", image: "/images/cover-designs/black-dots.png" },
  { id: "red-stripes", label: "Red stripes", type: "pattern", image: "/images/cover-designs/red-stripes.png" },
  { id: "teal-gingham", label: "Teal gingham", type: "pattern", image: "/images/cover-designs/teal-gingham.png" },
  { id: "peach-floral", label: "Peach floral", type: "pattern", image: "/images/cover-designs/peach-floral.png", upcharge: 3 },
  { id: "garden-floral", label: "Garden floral", type: "pattern", image: "/images/cover-designs/garden-floral.png", upcharge: 3 },
  { id: "linen", label: "Linen", type: "pattern", image: "/images/cover-designs/linen.png", upcharge: 3 },
  { id: "sunflower", label: "Sunflower", type: "pattern", image: "/images/cover-designs/sunflower.png", upcharge: 3 },
];

// "Just this one book" uses a tight palette of 4 solid colors per the
// Notion matrix doc — no ombrés, no patterns, no lavender.
const ONCE_DESIGN_IDS = ["sage", "blush", "black", "teal-solid"] as const;
const ONCE_DESIGNS: CoverDesign[] = ONCE_DESIGN_IDS
  .map((id) => STANDARD_DESIGNS.find((d) => d.id === id))
  .filter((d): d is CoverDesign => !!d);

// Resolve the active cover-design set by (frequency, size). Only Monthly +
// 5 x 5" minis swaps to the unique minis palette.
function getActiveDesigns(frequency: FrequencyId, size: SizeId | null): CoverDesign[] {
  if (frequency === "monthly" && size === "5mini") return MINIS_DESIGNS;
  if (frequency === "once") return ONCE_DESIGNS;
  return STANDARD_DESIGNS;
}

// ── Billing plan options ────────────────────────────────────────────────────
// Monthly offers two billing cadences (pay monthly, or pay annually with 2
// books free on a 12-book plan). Every60 uses a totally different UI below.

type BillingId = "monthly" | "annual";

// ── "Every 60 photos" customizable billing ──────────────────────────────────
// This frequency uses a different billing UI (see node 689-15634) where the
// user picks a cadence via dropdown, then a payment plan (as-received vs.
// upfront annually).

type Every60Cadence = "month" | "other-month" | "three-months";
type Every60Payment = "as-received" | "annual";

const EVERY60_CADENCES: Array<{ id: Every60Cadence; label: string; noun: string }> = [
  { id: "month", label: "month", noun: "month" },
  { id: "other-month", label: "other month", noun: "other month" },
  { id: "three-months", label: "3 months", noun: "3 months" },
];

// Number of books prepaid when "upfront, annually" is chosen for a given
// Every60 cadence (per the Notion matrix doc).
const EVERY60_UPFRONT_COUNT: Record<Every60Cadence, number> = {
  month: 12,
  "other-month": 6,
  "three-months": 4,
};

type ReviewRow = {
  rating: number;
  title: string;
  date: string;
  author: string;
  body: string;
  images: number;
};
const reviews: ReviewRow[] = [
  {
    rating: 5,
    title: "Simple & easy to create",
    date: "9/28/2025",
    author: "Sheri B.",
    body:
      "I've been making Chatbooks for my twins for the last 10 years. I like the simplicity of the books & ease of creating them. They enjoy having the memories.",
    images: 1,
  },
  {
    rating: 5,
    title: "Simple & easy to create",
    date: "9/28/2025",
    author: "Sheri B.",
    body:
      "I've been making Chatbooks for my twins for the last 10 years. I like the simplicity of the books & ease of creating them. They enjoy having the memories.",
    images: 3,
  },
  {
    rating: 5,
    title: "Simple & easy to create",
    date: "9/28/2025",
    author: "Sheri B.",
    body:
      "I've been making Chatbooks for my twins for the last 10 years. I like the simplicity of the books & ease of creating them. They enjoy having the memories.",
    images: 0,
  },
];

const whyItems = [
  {
    title: "Made for ordinary moments you want to remember",
    image: "/images/why-everyday/tile-1.png",
    align: "left" as const,
  },
  {
    title: "Auto-curation: choose a start date, filter by date, and more",
    image: "/images/why-everyday/tile-2.png",
    align: "right" as const,
  },
  {
    title: "Capture your months in books, or create books on your own timeline",
    image: "/images/why-everyday/tile-3.png",
    align: "left" as const,
  },
];

const accordions = [
  {
    id: "specs",
    title: "Product Specs",
    body:
      "Paper type, binding, and page counts match our standard Everyday line. Full specs are available at checkout.",
  },
  {
    id: "meet",
    title: "Meet Chatbooks",
    body:
      "We're a team of parents obsessed with helping you turn camera roll chaos into photo books you'll actually hold.",
  },
  {
    id: "faqs",
    title: "FAQs",
    body:
      "Shipping is free in the contiguous US. Cancel or skip any time on subscription plans. Book credits expire 13 months after purchase.",
  },
];

// ── Small building blocks ───────────────────────────────────────────────────

function Stars({
  value = 5,
  size = 16,
  className,
}: {
  value?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex gap-0.5 ${className ?? ""}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          style={{ width: size, height: size }}
          className={i < value ? "text-[#f4b740]" : "text-border-strong"}
        />
      ))}
    </span>
  );
}

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] transition ${
        selected ? "border-text-title bg-text-title text-text-on-dark" : "border-border-strong bg-surface"
      }`}
    >
      {selected ? <CheckIcon className="h-3.5 w-3.5" /> : null}
    </span>
  );
}

function swatchStyle(design: CoverDesign): React.CSSProperties {
  if (design.type === "pattern" && design.image) {
    return {
      backgroundImage: `url('${design.image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  if (design.type === "ombre" && design.stripes) {
    return {
      background: `linear-gradient(90deg, ${design.stripes[0]} 0%, ${design.stripes[0]} 33.33%, ${design.stripes[1]} 33.33%, ${design.stripes[1]} 66.66%, ${design.stripes[2]} 66.66%, ${design.stripes[2]} 100%)`,
    };
  }
  return { background: design.color };
}

function CoverSwatch({ design, selected }: { design: CoverDesign; selected: boolean }) {
  return (
    <span
      className={`block h-12 w-12 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] ${
        design.outline ? "border border-border-strong" : "border border-black/5"
      } ${selected ? "ring-2 ring-text-title ring-offset-2" : ""}`}
      style={swatchStyle(design)}
    />
  );
}

function StampBadge({ src, alt }: { src: string; alt: string }) {
  // Plain <img> so the vector marks from Figma render without next/image
  // SVG security restrictions.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={88} height={88} className="h-[88px] w-[88px] shrink-0" />;
}

function BulletIcon({ kind }: { kind: "book" | "heart" }) {
  const src = kind === "book" ? "/icons/book-bullet.svg" : "/icons/heart-favorite-bullet.svg";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" width={16} height={16} className="h-4 w-4 shrink-0" />;
}

// Progressive-reveal wrapper: animates its height from 0 to auto using
// grid-template-rows so content below is pushed down smoothly.
// When `peek` is set, the collapsed state renders that many pixels of the
// top of the content at reduced opacity — used to hint "there's more below".
function Reveal({
  show,
  peek = 0,
  children,
}: {
  show: boolean;
  peek?: number;
  children: ReactNode;
}) {
  const peeking = !show && peek > 0;
  const hiddenRows = peek > 0 ? `${peek}px` : "0fr";
  // Soft feather at the bottom of the peek so content (images, badges, etc.)
  // fades out gracefully instead of being hard-cut at the clip edge.
  const peekMask =
    "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)";
  return (
    <div
      className={`grid transition-all duration-500 ease-out motion-reduce:transition-none ${
        !show ? "pointer-events-none" : ""
      }`}
      style={{
        gridTemplateRows: show ? "1fr" : hiddenRows,
        opacity: show ? 1 : peek > 0 ? 0.5 : 0,
        WebkitMaskImage: peeking ? peekMask : undefined,
        maskImage: peeking ? peekMask : undefined,
      }}
      aria-hidden={!show}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

// ── Main screen ─────────────────────────────────────────────────────────────

export function EverydayPdpScreen() {
  const [frequency, setFrequency] = useState<FrequencyId | null>(null);
  const [size, setSize] = useState<SizeId | null>(null);
  const [coverType, setCoverType] = useState<CoverTypeId | null>(null);
  const [coverDesign, setCoverDesign] = useState<CoverDesign["id"] | null>(null);
  const [billing, setBilling] = useState<BillingId | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // "Every 60 photos" uses a customize-your-plan UI (cadence dropdown + payment
  // plan selector). Payment is unselected by default so the plan summary stays
  // hidden until the user picks. Cadence has a default to match the Figma mock.
  const [every60Cadence, setEvery60Cadence] = useState<Every60Cadence>("other-month");
  const [every60Payment, setEvery60Payment] = useState<Every60Payment | null>(null);

  // Hardcover is disabled whenever 5 x 5" minis is the active size.
  const hardcoverDisabled = size === "5mini";

  // Changing frequency invalidates selections that no longer exist for the
  // new frequency (5x5 minis isn't offered for every60/once, design palettes
  // differ, billing cadence IDs differ).
  function handleFrequencyChange(next: FrequencyId) {
    setFrequency(next);
    const validSizes = sizesByFrequency[next];
    const nextSize = size && validSizes.some((s) => s.id === size) ? size : null;
    if (nextSize !== size) setSize(nextSize);
    const validDesigns = getActiveDesigns(next, nextSize);
    if (coverDesign && !validDesigns.some((d) => d.id === coverDesign)) setCoverDesign(null);
    setBilling(null);
    setEvery60Payment(null);
    setEvery60Cadence("other-month");
  }

  // Changing size can change the available design palette (5x5 minis swaps
  // in its own unique swatches) and also can invalidate hardcover.
  function handleSizeChange(next: SizeId) {
    setSize(next);
    if (next === "5mini" && coverType === "hard") setCoverType(null);
    if (frequency) {
      const validDesigns = getActiveDesigns(frequency, next);
      if (coverDesign && !validDesigns.some((d) => d.id === coverDesign)) {
        setCoverDesign(null);
      }
    }
  }

  // Every60 customizable billing UI feeds into the shared `billing` state so
  // the "Your plan" summary keeps working: annual → "annual", as-received →
  // "monthly" (acts as the generic subscription cadence for summary copy).
  useEffect(() => {
    if (frequency !== "every60") return;
    if (every60Payment === "annual") setBilling("annual");
    else if (every60Payment === "as-received") setBilling("monthly");
    else setBilling(null);
  }, [frequency, every60Payment]);

  const activeSizes = frequency ? sizesByFrequency[frequency] : [];
  const activeDesigns = frequency ? getActiveDesigns(frequency, size) : [];

  const selectedCover = coverDesign ? activeDesigns.find((c) => c.id === coverDesign) ?? null : null;
  const selectedSize = size ? activeSizes.find((s) => s.id === size) ?? null : null;
  const selectedCoverType = coverType ? coverTypes.find((c) => c.id === coverType) ?? null : null;

  const bookPrice = getBookPrice(size, coverType);
  const coverUpcharge = selectedCover?.upcharge ?? 0;
  const effectiveBookPrice = bookPrice != null ? bookPrice + coverUpcharge : null;

  const allBookOptionsPicked = !!size && !!coverType && !!coverDesign;
  const isSubscription = frequency === "monthly" || frequency === "every60";
  const showBillingSection = isSubscription && allBookOptionsPicked;

  // ── Monthly billing options (dynamic prices based on selections) ──
  // Annual = pay for 10 books, get 12 (2 free). Strike-through shows the
  // un-discounted 12-book total.
  const monthlyBillingOptions = useMemo(() => {
    if (frequency !== "monthly" || effectiveBookPrice == null) return null;
    const annualToday = effectiveBookPrice * 10;
    const annualStrike = effectiveBookPrice * 12;
    return [
      {
        id: "monthly" as const,
        title: "Pay monthly",
        priceLabel: `${formatUSD(effectiveBookPrice)} today`,
        sub: "One book each month",
      },
      {
        id: "annual" as const,
        title: "Pay annually",
        priceLabel: `${formatUSD(annualToday)} annually`,
        priceStrike: formatUSD(annualStrike),
        sub: "12 books every year",
        badge: "2 books FREE",
      },
    ];
  }, [frequency, effectiveBookPrice]);

  // `plan` is the derived summary shown below the billing cards (or for
  // the one-time purchase, directly below book options).
  const plan = useMemo(() => {
    if (!frequency || effectiveBookPrice == null) return null;
    if (frequency === "once") {
      if (!allBookOptionsPicked) return null;
      return {
        summary: `One book for ${formatUSD(effectiveBookPrice)}`,
        priceToday: effectiveBookPrice,
        nextCharge: null as string | null,
        cadenceChip: "One-time purchase",
        billingChip: null as string | null,
      };
    }
    if (!billing) return null;
    if (frequency === "monthly") {
      if (billing === "annual") {
        const annualToday = effectiveBookPrice * 10;
        return {
          summary: `12 books annually for ${formatUSD(annualToday)}`,
          priceToday: annualToday,
          todayNote: "(2 books free!)",
          nextCharge: `${formatUSD(annualToday)} on 4/30/2027` as string | null,
          cadenceChip: "Annual collection",
          billingChip: "Billed annually" as string | null,
        };
      }
      return {
        summary: `1 book per month for ${formatUSD(effectiveBookPrice)}`,
        priceToday: effectiveBookPrice,
        nextCharge: `${formatUSD(effectiveBookPrice)} for 1 book on 5/31/2026`,
        cadenceChip: "Monthly collection",
        billingChip: "Billed monthly" as string | null,
      };
    }
    // every60
    if (billing === "annual") {
      const count = EVERY60_UPFRONT_COUNT[every60Cadence];
      const annualToday = effectiveBookPrice * count;
      return {
        summary: `${count} books annually for ${formatUSD(annualToday)}`,
        priceToday: annualToday,
        nextCharge: `${formatUSD(annualToday)} on 4/30/2027` as string | null,
        cadenceChip: "Annual collection",
        billingChip: "Billed annually" as string | null,
      };
    }
    // as-received — cadence-dependent cadence chip & next charge
    const cadenceLabel = EVERY60_CADENCES.find((c) => c.id === every60Cadence)?.noun ?? "month";
    return {
      summary: `1 book every ${cadenceLabel} for ${formatUSD(effectiveBookPrice)}`,
      priceToday: effectiveBookPrice,
      nextCharge: `${formatUSD(effectiveBookPrice)} for 1 book as each is received` as string | null,
      cadenceChip: `Every ${cadenceLabel} collection`,
      billingChip: `Billed every ${cadenceLabel}` as string | null,
    };
  }, [frequency, billing, every60Cadence, allBookOptionsPicked, effectiveBookPrice]);

  // Sticky-footer preview needs the fully resolved state for CTA, copy,
  // price display, and the BookSkewie preview.
  const selectionComplete = frequency === "once"
    ? allBookOptionsPicked
    : allBookOptionsPicked && !!billing;

  // Progressive peek: only the immediate next section should hint through
  // the lavender gradient; everything further down stays fully collapsed.
  const bookOptionsPeek = !frequency ? 72 : 0;
  const billingPeek = isSubscription && !allBookOptionsPicked ? 72 : 0;
  const planPeek =
    plan
      ? 0
      : frequency === "once" && !allBookOptionsPicked
        ? 72 // once flow: plan is next after book options
        : isSubscription && allBookOptionsPicked && !billing
          ? 72 // subscription flow: plan is next once billing unlocks
          : 0;

  // Auto-scroll to each newly-revealed section so the user doesn't have to
  // hunt for it after making a selection. We watch the three "unlocked"
  // flags and scroll the corresponding section into view on false → true.
  const bookOptionsRef = useRef<HTMLDivElement | null>(null);
  const billingRef = useRef<HTMLDivElement | null>(null);
  const planRef = useRef<HTMLDivElement | null>(null);
  const prevFrequencyOpen = useRef(false);
  const prevBillingOpen = useRef(false);
  const prevPlanOpen = useRef(false);

  useEffect(() => {
    const open = !!frequency;
    if (!prevFrequencyOpen.current && open) {
      // Small delay so the height-animation has begun before we scroll.
      const t = setTimeout(() => {
        bookOptionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      prevFrequencyOpen.current = open;
      return () => clearTimeout(t);
    }
    prevFrequencyOpen.current = open;
  }, [frequency]);

  useEffect(() => {
    if (!prevBillingOpen.current && showBillingSection) {
      const t = setTimeout(() => {
        billingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      prevBillingOpen.current = showBillingSection;
      return () => clearTimeout(t);
    }
    prevBillingOpen.current = showBillingSection;
  }, [showBillingSection]);

  useEffect(() => {
    const open = !!plan;
    if (!prevPlanOpen.current && open) {
      const t = setTimeout(() => {
        planRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      prevPlanOpen.current = open;
      return () => clearTimeout(t);
    }
    prevPlanOpen.current = open;
  }, [plan]);

  return (
    <div className="flex min-h-screen justify-center bg-[#d2d2d7] px-0 py-0 md:px-6 md:py-10">
      <div className="relative w-full max-w-[402px] bg-surface md:max-h-[min(100vh,874px)] md:min-h-[min(100vh,874px)] md:overflow-y-auto md:rounded-[2.35rem] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] md:ring-1 md:ring-black/[0.06]">
        <Hero />

        {/* ═══ How often ═══ */}
        <section className="px-6 pt-2">
          <h2 className="text-mobile-header-small text-text-title">How often would you like to receive books?</h2>
          <div className="mt-5 flex flex-col gap-3">
            {frequencies.map((f) => (
              <FrequencyCard
                key={f.id}
                data={f}
                selected={frequency === f.id}
                onSelect={() => handleFrequencyChange(f.id)}
              />
            ))}
          </div>
        </section>

        {/* ═══ Book options — revealed after a frequency is picked.
             When no frequency is picked yet, a small "peek" of the top of
             this section remains visible so the user can see more options
             are waiting below. ═══ */}
        <div ref={bookOptionsRef} style={{ scrollMarginTop: 16 }} />
        <Reveal show={!!frequency} peek={bookOptionsPeek}>
          <section className="px-6 pt-10">
            <h2 className="text-mobile-header-small text-text-title">Choose your book options:</h2>

            <p className="text-mobile-eyebrow mt-5 text-text-eyebrow">Book size</p>
            <div className="-mx-6 mt-3 flex gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {activeSizes.map((s) => {
                const selected = size === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSizeChange(s.id)}
                    className={`flex w-[112px] shrink-0 flex-col gap-2 rounded-2xl border-[1.5px] bg-surface p-2 transition ${
                      selected ? "border-text-title" : "border-border-subtle"
                    }`}
                  >
                    <div className="relative aspect-[14/10] w-full overflow-hidden rounded-xl bg-surface-muted">
                      <Image src={s.image} alt="" fill className="object-cover" sizes="112px" />
                    </div>
                    <span className="text-mobile-subhead-bold pb-1 text-center text-text-title">{s.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-mobile-eyebrow mt-6 text-text-eyebrow">Cover type</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {coverTypes.map((c) => {
                const selected = coverType === c.id;
                const disabled = c.id === "hard" && hardcoverDisabled;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => !disabled && setCoverType(c.id)}
                    disabled={disabled}
                    aria-disabled={disabled}
                    className={`flex flex-col gap-2 rounded-2xl border-[1.5px] bg-surface p-2 transition ${
                      selected ? "border-text-title" : "border-border-subtle"
                    } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    <div className="relative aspect-[173/80] w-full overflow-hidden rounded-xl bg-surface-muted">
                      <Image
                        src={c.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 402px) 45vw, 180px"
                      />
                    </div>
                    <span className="text-mobile-subhead-bold pb-1 text-center text-text-title">
                      {c.label}
                      {disabled ? (
                        <span className="ml-1 text-mobile-body-small text-text-eyebrow">
                          (not available)
                        </span>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-mobile-eyebrow mt-6 text-text-eyebrow">Cover design</p>
            <div className="-mx-6 mt-3 flex gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {activeDesigns.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCoverDesign(c.id)}
                  aria-label={c.label}
                  className="flex shrink-0 flex-col items-center"
                >
                  <CoverSwatch design={c} selected={coverDesign === c.id} />
                  <span
                    className={`mt-1 text-[11px] leading-4 text-text-body ${
                      c.upcharge ? "font-semibold" : "invisible"
                    }`}
                  >
                    {c.upcharge ? `+$${c.upcharge.toFixed(2)}` : "placeholder"}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ═══ Billing plan — revealed once all book options are picked
             AND a subscription frequency is selected. "Just this one book"
             is one-time purchase, so it skips this section entirely. ═══ */}
        <div ref={billingRef} style={{ scrollMarginTop: 16 }} />
        <Reveal show={showBillingSection} peek={billingPeek}>
          {frequency === "every60" ? (
            <Every60BillingSection
              cadence={every60Cadence}
              onCadenceChange={setEvery60Cadence}
              payment={every60Payment}
              onPaymentChange={setEvery60Payment}
              bookPrice={effectiveBookPrice}
            />
          ) : (
            <section className="px-6 pt-10">
              <h2 className="text-mobile-header-small text-text-title">Choose your billing plan:</h2>
              <div className="mt-5 flex flex-col gap-3">
                {(monthlyBillingOptions ?? []).map((opt) => (
                  <BillingCard
                    key={opt.id}
                    selected={billing === opt.id}
                    onSelect={() => setBilling(opt.id)}
                    title={opt.title}
                    price={
                      opt.priceStrike ? (
                        <>
                          <span className="text-text-eyebrow line-through">{opt.priceStrike}</span>{" "}
                          <span className="text-text-title">{opt.priceLabel}</span>
                        </>
                      ) : (
                        opt.priceLabel
                      )
                    }
                    sub={opt.sub}
                    badge={opt.badge}
                  />
                ))}
              </div>
            </section>
          )}
        </Reveal>

        {/* ═══ Your plan summary + stamp badges — revealed once a plan is
             resolvable (subscription + billing picked, or "once" with all
             book options picked). ═══ */}
        <div ref={planRef} style={{ scrollMarginTop: 16 }} />
        <Reveal show={!!plan} peek={planPeek}>
          <section className="px-6 pt-8">
            {plan && frequency !== "once" ? (
              <div>
                <h3 className="text-mobile-subhead-bold text-text-title">Your plan:</h3>
                <p className="text-mobile-body-large mt-1 text-text-body">{plan.summary}</p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-text-title" />
                    <p className="text-mobile-body-large text-text-body">
                      <span className="text-mobile-body-large-bold text-text-title">Today:</span>{" "}
                      {billing === "annual" && frequency === "monthly"
                        ? `Your first 12 books are ${formatUSD(plan.priceToday)}`
                        : `Your first book is ${formatUSD(plan.priceToday)}`}
                      {"todayNote" in plan && plan.todayNote ? (
                        <span className="ml-1 font-bold text-text-title">{plan.todayNote}</span>
                      ) : null}
                    </p>
                  </li>
                  {plan.nextCharge ? (
                    <li className="flex items-start gap-2">
                      <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-text-title" />
                      <p className="text-mobile-body-large text-text-body">
                        <span className="text-mobile-body-large-bold text-text-title">Next charge:</span> {plan.nextCharge}
                      </p>
                    </li>
                  ) : null}
                </ul>
                <p className="text-mobile-body-small mt-3 text-text-body">
                  Cancel your subscription any time, and any books you purchased can be printed anytime. Book credits
                  expire 13 months after purchase.
                </p>
              </div>
            ) : null}

            {plan && frequency !== "once" ? (
              <div className="mt-5 rounded-2xl bg-surface-muted p-5">
                <dl className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {plan.cadenceChip ? (
                    <DlRow
                      icon={<BookStackIcon className="h-5 w-5 text-text-body" />}
                      label={plan.cadenceChip}
                    />
                  ) : null}
                  {selectedCover ? (
                    <DlRow icon={<DesignSwatch design={selectedCover} />} label={selectedCover.label} />
                  ) : null}
                  {selectedSize ? (
                    <DlRow icon={<RulerIcon className="h-5 w-5 text-text-body" />} label={selectedSize.label} />
                  ) : null}
                  {plan.billingChip ? (
                    <DlRow
                      icon={<CalendarIcon className="h-5 w-5 text-text-body" />}
                      label={plan.billingChip}
                    />
                  ) : null}
                  {selectedCoverType ? (
                    <DlRow icon={<AddBookIcon className="h-5 w-5 text-text-body" />} label={selectedCoverType.label} />
                  ) : null}
                </dl>
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-around gap-2">
              <StampBadge src="/badges/cancel-anytime.svg" alt="Risk free: cancel anytime" />
              <StampBadge src="/badges/free-shipping.svg" alt="Standard shipping: free" />
              <StampBadge src="/badges/love-guarantee.svg" alt="Love Chatbooks guarantee" />
            </div>
          </section>
        </Reveal>

        {/* ═══ Why Everyday Books (lavender).
             The top edge of this section fades from transparent to lavender
             so the previous selector's "peek" shows through, hinting that
             additional options exist. ═══ */}
        <section
          className="relative px-6 pb-10 pt-16"
          style={{
            background:
              "linear-gradient(to bottom, rgba(233,234,255,0) 0%, #e9eaff 23%, rgba(233,234,255,0) 68%)",
          }}
        >
          <h2 className="text-mobile-subhead-bold text-[22px] leading-tight text-text-title text-center">
            Why Everyday Books?
          </h2>
          <p className="text-mobile-body-large mt-3 text-text-title text-center">
            No need for perfectly curated, cumbersome memory documenting. A simple everyday photo book lowers the
            stakes so you can actually get it done.
          </p>

          <div className="mt-6 flex flex-col gap-5">
            {whyItems.map((item) => (
              <WhyCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        {/* ═══ Accordions ═══ */}
        <section className="border-t border-border-subtle px-6">
          {accordions.map((a, idx) => {
            const open = openAccordion === a.id;
            return (
              <div
                key={a.id}
                className={idx < accordions.length - 1 ? "border-b border-border-subtle" : ""}
              >
                <button
                  type="button"
                  onClick={() => setOpenAccordion(open ? null : a.id)}
                  className="flex w-full items-center justify-between gap-2 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="text-[22px] font-bold text-text-title">{a.title}</span>
                  <ChevronDownIcon
                    className={`h-6 w-6 shrink-0 text-text-title transition ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open ? <p className="text-mobile-body-large pb-5 text-text-body">{a.body}</p> : null}
              </div>
            );
          })}
        </section>

        {/* ═══ Customer Reviews ═══ */}
        <section className="border-t border-border-subtle px-6 pt-8 pb-12">
          <h2 className="text-[22px] font-bold text-text-title text-center">Customer Reviews</h2>

          <div className="mt-5 flex items-center justify-center gap-4">
            <span className="font-sans text-4xl font-bold text-text-title leading-none">4.8</span>
            <div className="flex flex-col items-start">
              <Stars size={18} />
              <span className="text-mobile-body-small mt-1 text-text-body">677 reviews</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-[28px] font-bold text-success leading-none">86%</p>
              <p className="text-mobile-subhead-bold mt-2 text-text-title">Would recommend</p>
              <p className="text-mobile-body-small mt-0.5 text-text-body">585 of 677</p>
            </div>
            <div>
              <p className="text-[28px] font-bold text-success leading-none">85%</p>
              <p className="text-mobile-subhead-bold mt-2 text-text-title">Would purchase again</p>
              <p className="text-mobile-body-small mt-0.5 text-text-body">577 of 677</p>
            </div>
          </div>

          <p className="text-mobile-subhead-bold mt-8 text-text-title">Gallery</p>
          <div className="-mx-6 mt-2 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-[120px] w-[120px] shrink-0 rounded-2xl bg-border-strong" />
            ))}
          </div>

          {/* Search + sort + filter */}
          <div className="mt-6">
            <label className="flex h-12 items-center gap-3 rounded-full border border-border-strong px-4">
              <input
                type="search"
                placeholder="Search"
                className="text-mobile-body-large flex-1 bg-transparent text-text-title outline-none placeholder:text-text-eyebrow"
              />
              <SearchIcon className="h-5 w-5 text-text-title" />
            </label>
            <div className="mt-4 flex items-center justify-between">
              <button type="button" className="flex items-center gap-2">
                <SortIcon className="h-5 w-5 text-text-title" />
                <span className="text-mobile-body-large-bold text-text-title">Sort by:</span>
                <span className="text-mobile-body-large text-text-body">Newest</span>
              </button>
              <button type="button" className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5 text-text-title" />
                <span className="text-mobile-body-large-bold text-text-title">Filter</span>
              </button>
            </div>
          </div>

          {/* Review list */}
          <div className="mt-6 flex flex-col">
            {reviews.map((r, i) => (
              <article
                key={i}
                className={`py-5 ${i < reviews.length - 1 ? "border-b border-border-subtle" : ""}`}
              >
                <Stars size={16} />
                <div className="mt-2 flex items-center justify-between gap-2">
                  <h3 className="text-mobile-subhead-bold text-text-title">{r.title}</h3>
                  <span className="text-mobile-body-small text-text-body">{r.date}</span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-mobile-body-small">
                  <span className="font-bold text-text-title">{r.author}</span>
                  <span className="text-[#d84db8] font-bold inline-flex items-center gap-1">
                    Verified purchase
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                      <circle cx="8" cy="8" r="8" />
                      <path d="M5 8.5L7 10.5L11 6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </p>
                <p className="text-mobile-body-large mt-2 text-text-body">{r.body}</p>
                {r.images > 0 ? (
                  <div className="-mx-6 mt-3 flex gap-2 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {Array.from({ length: r.images }).map((_, j) => (
                      <div
                        key={j}
                        className={`${r.images === 1 ? "h-[132px] w-[108px]" : "h-[108px] w-[108px]"} shrink-0 rounded-2xl bg-border-strong`}
                      />
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled
              className="text-mobile-subhead flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-text-eyebrow disabled:opacity-60"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Previous
            </button>
            <span className="text-mobile-body-small text-text-body">3 of 677</span>
            <button
              type="button"
              className="text-mobile-subhead-bold flex items-center gap-2 rounded-full border border-text-title px-4 py-2 text-text-title"
            >
              Next
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </section>

        <div aria-hidden className="h-36" />
        <StickyCta
          frequency={frequency}
          selectedSize={selectedSize}
          selectedCoverType={selectedCoverType}
          selectedCover={selectedCover}
          effectiveBookPrice={effectiveBookPrice}
          selectionComplete={selectionComplete}
        />
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-[#f0f0f2]">
      {/* Back overlay directly on the hero gradient (no separate header bar) */}
      <div className="flex items-center px-6 pt-12 pb-2">
        <Link
          href="/"
          aria-label="Back"
          className="flex h-6 w-6 items-center justify-center text-text-title"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
      </div>

      <div className="px-6 pt-2 pb-4">
        <h1 className="text-mobile-header-large text-text-title">Everyday Photo Books</h1>
      </div>

      {/* Intentional empty product-image area — matches Figma placeholder space */}
      <div className="h-[260px]" aria-hidden />

      {/* White→transparent fade at bottom of hero */}
      <div className="relative bg-gradient-to-t from-surface via-surface to-transparent px-6 pt-10 pb-6">
        <p className="text-mobile-body-large text-text-title text-center">
          Capture your family&rsquo;s everyday life so nothing slips through the cracks.
        </p>
        <p className="text-mobile-body-large-bold mt-4 text-text-title text-center">
          From $10/month or $15 for one book
        </p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stars size={18} />
            <span className="text-mobile-body-large-bold text-text-title">4.8</span>
            <span className="text-mobile-body-large text-text-eyebrow">201.5K</span>
          </div>
          <button
            type="button"
            className="text-mobile-body-small-bold inline-flex items-center gap-1 text-text-title"
          >
            <ArrowDownIcon className="h-4 w-4" />
            Jump to details
          </button>
        </div>
      </div>
    </section>
  );
}

function FrequencyCard({
  data,
  selected,
  onSelect,
}: {
  data: (typeof frequencies)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border-[1.5px] bg-surface p-5 text-left transition ${
        selected ? "border-text-title" : "border-border-subtle"
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-mobile-subhead-bold text-text-title">{data.title}</p>
        <RadioDot selected={selected} />
      </div>
      <ul className="mt-3 space-y-2">
        {data.bullets.map((b, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <BulletIcon kind={b.icon} />
            <span className="text-mobile-body-large text-text-body">{b.text}</span>
          </li>
        ))}
      </ul>
      {data.perfectFor ? (
        <p className="text-mobile-body-large mt-3 text-text-body">
          <span className="mr-2 whitespace-nowrap rounded-sm bg-[#e8eaff] px-1.5 py-0.5 text-mobile-body-large-bold text-text-body">
            Perfect for:
          </span>
          {data.perfectFor}
        </p>
      ) : null}
    </button>
  );
}

function BillingCard({
  selected,
  onSelect,
  title,
  price,
  sub,
  badge,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  price: ReactNode;
  sub: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative overflow-hidden rounded-2xl border-[1.5px] p-5 text-left transition ${
        selected ? "border-text-title bg-surface-muted" : "border-border-subtle bg-surface"
      }`}
    >
      <div className="flex items-start gap-3">
        <RadioDot selected={selected} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-mobile-subhead-bold text-text-title">{title}</span>
            <span className="text-mobile-subhead text-text-title">{price}</span>
          </div>
          <p className="text-mobile-body-large mt-1 text-text-body">{sub}</p>
        </div>
      </div>
      {badge ? (
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 text-mobile-body-small-bold py-1 pl-3 pr-2 text-white"
          style={{
            background: "linear-gradient(90deg, #df85d1 0%, #5b60d3 100%)",
            clipPath: "polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 50%)",
          }}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}

// Custom "every 60 photos" billing plan UI (Figma node 689-15634):
// 1) inline cadence dropdown, 2) two payment-plan options (unselected by default).
// Sub-copy for each option is dynamic: the "$N | M book credit(s) today" line
// recalculates based on the user's size/cover selections and chosen cadence.
function Every60BillingSection({
  cadence,
  onCadenceChange,
  payment,
  onPaymentChange,
  bookPrice,
}: {
  cadence: Every60Cadence;
  onCadenceChange: (c: Every60Cadence) => void;
  payment: Every60Payment | null;
  onPaymentChange: (p: Every60Payment) => void;
  bookPrice: number | null;
}) {
  const perBook = bookPrice ?? 0;
  const upfrontCount = EVERY60_UPFRONT_COUNT[cadence];
  const upfrontTotal = perBook * upfrontCount;
  const cadenceNoun = EVERY60_CADENCES.find((c) => c.id === cadence)?.noun ?? "month";

  return (
    <section className="px-6 pt-10">
      <h2 className="text-mobile-header-small text-text-title">Customize your billing plan</h2>

      <p className="mt-5 text-mobile-body-large text-text-body">
        I want to receive a book credit every&hellip;
      </p>

      <div className="mt-3">
        <CadenceDropdown value={cadence} onChange={onCadenceChange} />
      </div>

      <p className="mt-6 text-mobile-body-large text-text-body">and pay for them:</p>

      <div className="mt-3 flex flex-col gap-3">
        <PaymentOption
          selected={payment === "as-received"}
          onSelect={() => onPaymentChange("as-received")}
          title="As they are received"
          sub={`${formatUSD(perBook)} | 1 book credit today`}
        />
        <PaymentOption
          selected={payment === "annual"}
          onSelect={() => onPaymentChange("annual")}
          title="Upfront, annually"
          sub={`${formatUSD(upfrontTotal)} | ${upfrontCount} book credits today`}
          tagline={`One book each ${cadenceNoun}`}
          badges={[
            { label: "2 books FREE", color: "#010b2e" },
            { label: "20% off", color: "#de85d1" },
          ]}
        />
      </div>
    </section>
  );
}

function CadenceDropdown({
  value,
  onChange,
}: {
  value: Every60Cadence;
  onChange: (c: Every60Cadence) => void;
}) {
  const active = EVERY60_CADENCES.find((c) => c.id === value) ?? EVERY60_CADENCES[1];
  return (
    <div className="relative inline-flex">
      <span
        aria-hidden
        className="pointer-events-none inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 text-mobile-body-small-bold text-text-title"
      >
        {active.label}
        <ChevronDownIcon className="h-3.5 w-3.5" />
      </span>
      <select
        aria-label="Book credit cadence"
        value={value}
        onChange={(e) => onChange(e.target.value as Every60Cadence)}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
      >
        {EVERY60_CADENCES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PaymentOption({
  selected,
  onSelect,
  title,
  sub,
  tagline,
  badges,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  sub: string;
  tagline?: string;
  badges?: Array<{ label: string; color: string }>;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative overflow-hidden rounded-2xl p-5 text-left transition ${
        selected ? "bg-surface-muted" : "border-[1.5px] border-border-subtle bg-surface"
      }`}
    >
      <div className="flex items-start gap-3">
        <PaymentCheckbox selected={selected} />
        <div className="min-w-0 flex-1">
          <p className="text-mobile-subhead-bold text-text-title">{title}</p>
          <p className="text-mobile-body-large mt-1 text-text-eyebrow">{sub}</p>
          {tagline ? (
            <p className="text-mobile-body-large mt-1 text-text-body">{tagline}</p>
          ) : null}
          {badges && badges.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {badges.map((b) => (
                <Flag key={b.label} label={b.label} color={b.color} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </button>
  );
}

function PaymentCheckbox({ selected }: { selected: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition ${
        selected ? "border-text-title bg-text-title text-text-on-dark" : "border-border-strong bg-surface"
      }`}
    >
      {selected ? <CheckIcon className="h-3 w-3" /> : null}
    </span>
  );
}

function Flag({ label, color }: { label: string; color: string }) {
  return (
    <span className="relative inline-flex items-center">
      <span
        aria-hidden
        className="h-[21px] w-2"
        style={{
          background: color,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 50% 50%)",
        }}
      />
      <span
        className="inline-flex h-[21px] items-center px-2 text-mobile-body-small-bold text-white"
        style={{ background: color }}
      >
        {label}
      </span>
    </span>
  );
}

function DlRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
      <span className="text-mobile-body-large text-text-body leading-tight">{label}</span>
    </div>
  );
}

function DesignSwatch({ design }: { design: CoverDesign }) {
  return (
    <span
      className={`h-5 w-5 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] ${
        design.outline ? "border border-border-strong" : "border border-black/10"
      }`}
      style={swatchStyle(design)}
    />
  );
}

function WhyCard({ item }: { item: (typeof whyItems)[number] }) {
  const imgFirst = item.align === "left";
  return (
    <div className={`flex items-center gap-4 ${imgFirst ? "" : "flex-row-reverse"}`}>
      <div className="relative aspect-square w-[150px] shrink-0 overflow-hidden rounded-2xl bg-surface">
        <Image src={item.image} alt="" fill className="object-cover" sizes="150px" />
      </div>
      <p className="flex-1 text-mobile-body-large text-center text-text-body">{item.title}</p>
    </div>
  );
}

// Short, screen-ready label for each frequency used as the body-copy prefix.
const FREQUENCY_FOOTER_LABEL: Record<FrequencyId, string> = {
  monthly: "Monthly",
  every60: "Every 60 photos",
  once: "Just this one book",
};

function StickyCta({
  frequency,
  selectedSize,
  selectedCoverType,
  selectedCover,
  effectiveBookPrice,
  selectionComplete,
}: {
  frequency: FrequencyId | null;
  selectedSize: SizeOption | null;
  selectedCoverType: { id: CoverTypeId; label: string } | null;
  selectedCover: CoverDesign | null;
  effectiveBookPrice: number | null;
  selectionComplete: boolean;
}) {
  // Body copy builds progressively as the user makes selections. Once a
  // frequency is picked we prefix with e.g. "Monthly | …" and append the
  // size/cover/color as those selections land.
  const detailBits: string[] = [];
  if (selectedSize) {
    const sizeCover = [selectedSize.shortLabel, selectedCoverType?.label]
      .filter(Boolean)
      .join(" ");
    detailBits.push(selectedCover ? `${sizeCover}, ${selectedCover.label}` : sizeCover);
  }
  // "Just this one book" drops the frequency prefix entirely per the Figma
  // spec — it reads as a simple descriptor like `5x7" Softcover, Black`.
  // Subscriptions prefix with their frequency label ("Monthly | …"). When no
  // book options have been picked yet, the second half becomes a next-action
  // prompt ("Choose cover style") per the Figma footer spec.
  const nextActionHint = "Choose cover style";
  const tail = detailBits[0] ?? nextActionHint;
  const bodyLine = !frequency
    ? "Choose your book options to continue"
    : frequency === "once"
      ? tail
      : `${FREQUENCY_FOOTER_LABEL[frequency]} | ${tail}`;

  // Once size + cover type are picked we know the exact per-book price and
  // drop the "From" prefix (per the Notion matrix doc).
  const priceLabel =
    effectiveBookPrice != null ? `${formatUSD(effectiveBookPrice)}/book` : "From $10/book";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-6 md:pointer-events-auto md:sticky md:bottom-6 md:px-0">
      <div
        className="pointer-events-auto w-full max-w-[354px] rounded-[32px] bg-white/40 px-5 py-5 shadow-[0_10px_30px_-12px_rgba(1,11,46,0.22),inset_0_0_0_1px_rgba(255,255,255,0.35)] ring-1 ring-black/[0.04]"
        style={{ backdropFilter: "blur(20px) saturate(140%)", WebkitBackdropFilter: "blur(20px) saturate(140%)" }}
      >
        <div className="flex items-center gap-3">
          <BookSkewie size={selectedSize?.id ?? null} design={selectedCover} />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-mobile-subhead-bold truncate text-text-title">Your Everyday Book</p>
              <p className="text-mobile-body-small-bold shrink-0 text-text-title">{priceLabel}</p>
            </div>
            <p className="text-mobile-body-large mt-0.5 truncate text-text-body">{bodyLine}</p>
          </div>
        </div>

        {selectionComplete ? (
          <button
            type="button"
            className="mt-4 w-full rounded-full bg-[#1d7a7a] py-4 text-center text-mobile-subhead-bold text-white transition hover:brightness-110"
          >
            {frequency === "once" ? "Continue to my photos" : "Continue to checkout"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

// 3D book thumbnail from Figma. Doubles as a live preview: aspect ratio
// reflects the selected book size and a subtle color-tint overlay reflects
// the selected cover design. Defaults to the Figma photograph as-is when no
// selections have been made yet.
function BookSkewie({
  size,
  design,
}: {
  size: SizeId | null;
  design: CoverDesign | null;
}) {
  // Physical aspect ratio (width / height) of each size as it sits in the
  // 3D render. 5x5 minis, 6x6, 8x8 are square; 5x7 is taller than wide.
  // Null = no size picked yet → use the baseline image aspect.
  const ratio =
    size === "5x7"
      ? 5 / 7
      : size === "5mini" || size === "6x6" || size === "8x8"
        ? 1
        : 42 / 55;

  const width = 42;
  const height = Math.round(width / ratio);

  // No cover selected yet → show the Figma 3D photograph as a neutral placeholder.
  if (!design) {
    return (
      <div
        className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[3px]"
        style={{ width, height }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/book-skewie.png"
          alt=""
          className="absolute inset-0 h-full w-full select-none object-cover"
          draggable={false}
        />
        <ExpandZoomIconSm className="relative h-4 w-4 text-text-eyebrow" />
      </div>
    );
  }

  // Ombré swatches collapse to a single solid (the top/first stripe) in the
  // cover preview — gradients don't read as a book cover at this small size.
  const coverStyle: React.CSSProperties =
    design.type === "ombre" && design.stripes
      ? { backgroundColor: design.stripes[0] }
      : swatchStyle(design);

  // A cover has been chosen → render a real book preview where the selected
  // color/pattern paints the cover (outer frame) and the inside is the page block.
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-[3px] p-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
      style={{ width, height, ...coverStyle }}
      aria-hidden
    >
      <div className="relative flex h-full w-full items-center justify-center rounded-[2px] bg-[#f5f2ec]">
        <ExpandZoomIconSm className="h-4 w-4 text-text-eyebrow" />
      </div>
    </div>
  );
}
