"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
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
  MenuIcon,
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
type SizeOption = { id: SizeId; label: string; image: string };

const ALL_SIZES: Record<SizeId, SizeOption> = {
  "5mini": { id: "5mini", label: '5 x 5" minis', image: "/images/selectors/size-1.png" },
  "5x7": { id: "5x7", label: '5 × 7"', image: "/images/selectors/size-2.png" },
  "6x6": { id: "6x6", label: '6 × 6"', image: "/images/selectors/size-3.png" },
  "8x8": { id: "8x8", label: '8 × 8"', image: "/images/selectors/size-4.png" },
};

// "monthly" offers an exclusive 5 x 5" minis option;
// "every60" + "once" share the three standard sizes.
const sizesByFrequency: Record<FrequencyId, SizeOption[]> = {
  monthly: [ALL_SIZES["5mini"], ALL_SIZES["5x7"], ALL_SIZES["6x6"], ALL_SIZES["8x8"]],
  every60: [ALL_SIZES["6x6"], ALL_SIZES["5x7"], ALL_SIZES["8x8"]],
  once: [ALL_SIZES["6x6"], ALL_SIZES["5x7"], ALL_SIZES["8x8"]],
};

const coverTypes = [
  { id: "soft" as const, label: "Softcover", image: "/images/selectors/cover-softcover.png" },
  { id: "hard" as const, label: "Hardcover", image: "/images/selectors/cover-hardcover.png" },
];

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

const coverDesignsByFrequency: Record<FrequencyId, CoverDesign[]> = {
  monthly: [
    { id: "teal-ombre", label: "Teal ombre", type: "ombre", stripes: ["#2d5f5a", "#6f9c94", "#c8d9d1"] },
    { id: "coral-ombre", label: "Coral ombre", type: "ombre", stripes: ["#c94a54", "#e9848a", "#f4c5c7"] },
    { id: "purple-ombre", label: "Purple ombre", type: "ombre", stripes: ["#5c4a8a", "#9d84c2", "#d6c9e8"] },
    { id: "sage", label: "Sage", type: "solid", color: "#99c5b3" },
    { id: "blush", label: "Blush", type: "solid", color: "#fbd8d0" },
    { id: "black", label: "Black", type: "solid", color: "#111114" },
  ],
  every60: [
    { id: "sage", label: "Sage", type: "solid", color: "#99c5b3" },
    { id: "blush", label: "Blush", type: "solid", color: "#fbd8d0" },
    { id: "black", label: "Black", type: "solid", color: "#111114" },
    { id: "teal-solid", label: "Teal", type: "solid", color: "#4c7891" },
    { id: "marble", label: "Marble swirl", type: "pattern", image: "/images/cover-designs/marble.png" },
    { id: "pink-rose", label: "Pink rose", type: "pattern", image: "/images/cover-designs/pink-rose.png" },
    { id: "black-dots", label: "Black dots", type: "pattern", image: "/images/cover-designs/black-dots.png" },
    { id: "red-stripes", label: "Red stripes", type: "pattern", image: "/images/cover-designs/red-stripes.png" },
    { id: "teal-gingham", label: "Teal gingham", type: "pattern", image: "/images/cover-designs/teal-gingham.png" },
    { id: "peach-floral", label: "Peach floral", type: "pattern", image: "/images/cover-designs/peach-floral.png", upcharge: 3 },
    { id: "garden-floral", label: "Garden floral", type: "pattern", image: "/images/cover-designs/garden-floral.png", upcharge: 3 },
    { id: "linen", label: "Linen", type: "pattern", image: "/images/cover-designs/linen.png", upcharge: 3 },
    { id: "sunflower", label: "Sunflower", type: "pattern", image: "/images/cover-designs/sunflower.png", upcharge: 3 },
  ],
  once: [
    { id: "sage", label: "Sage", type: "solid", color: "#99c5b3" },
    { id: "blush", label: "Blush", type: "solid", color: "#fbd8d0" },
    { id: "black", label: "Black", type: "solid", color: "#111114" },
    { id: "teal-solid", label: "Teal", type: "solid", color: "#4c7891" },
    { id: "white", label: "White", type: "solid", color: "#ffffff", outline: true },
  ],
};

// ── Billing plan options ────────────────────────────────────────────────────

type BillingId = "monthly" | "annual" | "quarterly" | "bimonthly";

type BillingOption = {
  id: BillingId;
  title: string;
  priceLabel: string;
  priceStrike?: string;
  sub: string;
  badge?: string;
};

// "once" is a one-time purchase with no billing cadence.
const billingByFrequency: Record<FrequencyId, BillingOption[] | null> = {
  monthly: [
    { id: "monthly", title: "Pay monthly", priceLabel: "$12 today", sub: "One book each month" },
    { id: "annual", title: "Pay annually", priceLabel: "$42 annually", priceStrike: "$48", sub: "4 books every year", badge: "20% off" },
  ],
  every60: [
    { id: "quarterly", title: "Pay quarterly", priceLabel: "$12 today", sub: "One book each quarter, with the option to purchase additional books" },
    { id: "bimonthly", title: "Pay every other month", priceLabel: "$12 today", sub: "One book credit every 2 months" },
    { id: "annual", title: "Pay annually", priceLabel: "$42 annually", priceStrike: "$48", sub: "4 books every year", badge: "20% off" },
  ],
  once: null,
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
    seed: "why-ordinary",
    align: "left" as const,
  },
  {
    title: "Auto-curation: choose a start date, filter by date, and more",
    seed: "why-curation",
    align: "right" as const,
  },
  {
    title: "Capture your months in books, or create books on your own timeline",
    seed: "why-timeline",
    align: "left" as const,
    accent: "pink" as const,
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
  const hiddenRows = peek > 0 ? `${peek}px` : "0fr";
  return (
    <div
      className={`grid transition-all duration-500 ease-out motion-reduce:transition-none ${
        !show ? "pointer-events-none" : ""
      }`}
      style={{
        gridTemplateRows: show ? "1fr" : hiddenRows,
        opacity: show ? 1 : peek > 0 ? 0.5 : 0,
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
  const [coverType, setCoverType] = useState<(typeof coverTypes)[number]["id"] | null>(null);
  const [coverDesign, setCoverDesign] = useState<CoverDesign["id"] | null>(null);
  const [billing, setBilling] = useState<BillingId | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Changing frequency invalidates any prior selections that no longer exist
  // for the new frequency (e.g. 5x5 minis isn't offered for every60/once,
  // and billing cadence IDs differ between monthly and every60).
  function handleFrequencyChange(next: FrequencyId) {
    setFrequency(next);
    const validSizes = sizesByFrequency[next];
    if (size && !validSizes.some((s) => s.id === size)) setSize(null);
    const validDesigns = coverDesignsByFrequency[next];
    if (coverDesign && !validDesigns.some((d) => d.id === coverDesign)) setCoverDesign(null);
    setBilling(null);
  }

  const activeSizes = frequency ? sizesByFrequency[frequency] : [];
  const activeDesigns = frequency ? coverDesignsByFrequency[frequency] : [];
  const activeBilling = frequency ? billingByFrequency[frequency] : null;

  const selectedCover = coverDesign ? activeDesigns.find((c) => c.id === coverDesign) ?? null : null;
  const selectedSize = size ? activeSizes.find((s) => s.id === size) ?? null : null;
  const selectedCoverType = coverType ? coverTypes.find((c) => c.id === coverType) ?? null : null;

  const allBookOptionsPicked = !!size && !!coverType && !!coverDesign;
  const isSubscription = frequency === "monthly" || frequency === "every60";
  const showBillingSection = isSubscription && allBookOptionsPicked;

  // `plan` is the derived summary shown below the billing cards (or for
  // the one-time purchase, directly below book options).
  const plan = useMemo(() => {
    if (!frequency) return null;
    if (frequency === "once") {
      if (!allBookOptionsPicked) return null;
      return {
        summary: "One book for $15.00",
        priceToday: 15,
        nextCharge: null as string | null,
        cadenceChip: "One-time purchase",
        billingChip: null as string | null,
      };
    }
    if (!billing) return null;
    if (frequency === "monthly") {
      return billing === "annual"
        ? {
            summary: "1 book per month for $10.50",
            priceToday: 42,
            nextCharge: "$42 for 4 books on 4/21/2027" as string | null,
            cadenceChip: "Annual collection",
            billingChip: "Billed annually" as string | null,
          }
        : {
            summary: "1 book per month for $12.00",
            priceToday: 12,
            nextCharge: "$12 for 1 book on 3/31/2026",
            cadenceChip: "Monthly collection",
            billingChip: "Billed monthly",
          };
    }
    // every60
    if (billing === "annual") {
      return {
        summary: "4 books every year for $10.50",
        priceToday: 42,
        nextCharge: "$42 for 4 books on 4/21/2027" as string | null,
        cadenceChip: "Annual collection",
        billingChip: "Billed annually" as string | null,
      };
    }
    if (billing === "bimonthly") {
      return {
        summary: "1 book every 2 months for $12.00",
        priceToday: 12,
        nextCharge: "$12 for 1 book on 3/31/2026" as string | null,
        cadenceChip: "Every-other-month collection",
        billingChip: "Billed every 2 months" as string | null,
      };
    }
    // quarterly (default for every60)
    return {
      summary: "1 book per quarter for $12.00",
      priceToday: 12,
      nextCharge: "$12 for 1 book on 3/31/2026" as string | null,
      cadenceChip: "Quarterly collection",
      billingChip: "Billed quarterly" as string | null,
    };
  }, [frequency, billing, allBookOptionsPicked]);

  return (
    <div className="flex min-h-screen justify-center bg-[#d2d2d7] px-0 py-0 md:px-6 md:py-10">
      <div className="relative w-full max-w-[402px] bg-surface md:max-h-[min(100vh,874px)] md:min-h-[min(100vh,874px)] md:overflow-y-auto md:rounded-[2.35rem] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] md:ring-1 md:ring-black/[0.06]">
        <Hero />

        {/* ═══ How often ═══ */}
        <section className="px-6 pt-10">
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
        <Reveal show={!!frequency} peek={!frequency ? 72 : 0}>
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
                    onClick={() => setSize(s.id)}
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
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCoverType(c.id)}
                    className={`flex flex-col gap-2 rounded-2xl border-[1.5px] bg-surface p-2 transition ${
                      selected ? "border-text-title" : "border-border-subtle"
                    }`}
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
                    <span className="text-mobile-subhead-bold pb-1 text-center text-text-title">{c.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-mobile-eyebrow mt-6 text-text-eyebrow">Cover design</p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 pb-1">
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
        <Reveal show={showBillingSection}>
          <section className="px-6 pt-10">
            <h2 className="text-mobile-header-small text-text-title">Choose your billing plan:</h2>
            <div className="mt-5 flex flex-col gap-3">
              {(activeBilling ?? []).map((opt) => (
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
        </Reveal>

        {/* ═══ Your plan summary + stamp badges — revealed once a plan is
             resolvable (subscription + billing picked, or "once" with all
             book options picked). ═══ */}
        <Reveal show={!!plan}>
          <section className="px-6 pt-8">
            {plan && frequency !== "once" ? (
              <div>
                <h3 className="text-mobile-subhead-bold text-text-title">Your plan:</h3>
                <p className="text-mobile-body-large mt-1 text-text-body">{plan.summary}</p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-text-title" />
                    <p className="text-mobile-body-large text-text-body">
                      <span className="text-mobile-body-large-bold text-text-title">Today:</span> Your first book is ${plan.priceToday}
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
              "linear-gradient(to bottom, rgba(233,234,255,0) 0px, #e9eaff 110px, #e9eaff 100%)",
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
              <WhyCard key={item.seed} item={item} />
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
        <StickyCta />
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-[#f0f0f2]">
      {/* Back + menu overlay directly on the hero gradient (no separate header bar) */}
      <div className="flex items-center justify-between px-6 pt-12 pb-2">
        <Link
          href="/"
          aria-label="Back"
          className="flex h-6 w-6 items-center justify-center text-text-title"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Link>
        <button
          type="button"
          aria-label="Menu"
          className="flex h-6 w-6 items-center justify-center text-text-title"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
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
      <div
        className={`relative aspect-square w-[150px] shrink-0 overflow-hidden rounded-2xl ${
          item.accent === "pink" ? "bg-highlighter" : "bg-surface"
        }`}
      >
        <Image
          src={`https://picsum.photos/seed/${item.seed}/400/400`}
          alt=""
          fill
          className={`object-cover ${item.accent === "pink" ? "mix-blend-multiply" : ""}`}
          sizes="150px"
        />
      </div>
      <p className="flex-1 text-mobile-subhead-bold text-text-title">{item.title}</p>
    </div>
  );
}

function StickyCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-6 md:pointer-events-auto md:sticky md:bottom-6 md:px-0">
      <div
        className="pointer-events-auto w-full max-w-[354px] rounded-[32px] bg-white/40 px-5 py-5 shadow-[0_10px_30px_-12px_rgba(1,11,46,0.22),inset_0_0_0_1px_rgba(255,255,255,0.35)] ring-1 ring-black/[0.04]"
        style={{ backdropFilter: "blur(20px) saturate(140%)", WebkitBackdropFilter: "blur(20px) saturate(140%)" }}
      >
        <div className="flex items-center gap-3">
          <BookSkewie />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-mobile-subhead-bold truncate text-text-title">Your Everyday Book</p>
              <p className="text-mobile-body-small-bold shrink-0 text-text-title">From $10/book</p>
            </div>
            <p className="text-mobile-body-large mt-0.5 text-text-body">
              Choose your book options to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small stylized "book skewie" thumbnail used in the sticky footer.
// Mirrors the Figma instance: 42×55 rounded card with a sage-bordered
// inset, tiny month tab, and a center expand-zoom icon.
function BookSkewie() {
  return (
    <div
      className="relative flex h-[55px] w-[42px] shrink-0 items-center justify-center rounded-[3px] bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
      aria-hidden
    >
      <div className="relative flex h-[51px] w-[38px] items-center justify-center rounded-[2px] bg-[#f0f0f2] ring-1 ring-[#c2d7cc]">
        <span
          className="absolute left-[3px] top-[4px] rounded-[1px] bg-[#c2d7cc] px-[2px] py-[1px] text-[4px] font-semibold uppercase leading-none text-white"
          style={{ letterSpacing: "0.02em" }}
        >
          July 2021
        </span>
        <ExpandZoomIconSm className="h-4 w-4 text-text-eyebrow" />
      </div>
    </div>
  );
}
