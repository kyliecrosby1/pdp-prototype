/**
 * Icon library sourced from the Breakfast – CORE Figma file
 * (node 4852:6623 — "Icons" canvas). Paths are exported via the Figma MCP
 * and normalized to `currentColor` so they respect Tailwind text color.
 *
 * Components ending in `Sm` are the Figma `Size=Small` variants (16×16,
 * stroke-width 1.25). Everything else is `Size=Regular` (24×24,
 * stroke-width 1.75 / 2). Pick the variant that matches your render size
 * so stroke weights stay on spec.
 */

import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "xmlns" | "fill">;

// ── 24×24 (Size=Regular) ─────────────────────────────────────────────────────

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M3 12H21M3 6H21M3 18H21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M4 12H20M20 12L14 6M20 12L14 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M20 12H4M4 12L10 18M4 12L10 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartFavoriteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M11.9939 5.93432C10.1944 3.81742 7.19378 3.24798 4.93922 5.18643C2.68468 7.12488 2.36727 10.3659 4.13778 12.6585C5.47508 14.3901 9.27417 17.8666 11.0532 19.4641C11.3803 19.7577 11.5438 19.9046 11.7352 19.9624C11.9015 20.0125 12.0862 20.0125 12.2525 19.9624C12.4439 19.9046 12.6074 19.7577 12.9345 19.4641C14.7135 17.8666 18.5126 14.3901 19.8499 12.6585C21.6204 10.3659 21.3417 7.10449 19.0485 5.18643C16.7552 3.26837 13.7933 3.81742 11.9939 5.93432Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M20.1 10.2H3.89999M15.6 3V6.6M8.39999 3V6.6M8.21999 21H15.78C17.2922 21 18.0482 21 18.6258 20.7057C19.1338 20.4469 19.5469 20.0338 19.8057 19.5258C20.1 18.9482 20.1 18.1922 20.1 16.68V9.12C20.1 7.60786 20.1 6.85178 19.8057 6.27423C19.5469 5.76619 19.1338 5.35314 18.6258 5.09428C18.0482 4.8 17.2922 4.8 15.78 4.8H8.21999C6.70785 4.8 5.95178 4.8 5.37422 5.09428C4.86618 5.35314 4.45313 5.76619 4.19428 6.27423C3.89999 6.85178 3.89999 7.60786 3.89999 9.12V16.68C3.89999 18.1922 3.89999 18.9482 4.19428 19.5258C4.45313 20.0338 4.86618 20.4469 5.37422 20.7057C5.95178 21 6.70785 21 8.21999 21Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneMobileIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M9.01429 21.1666H14.9857C15.8658 21.1666 16.3059 21.1666 16.642 20.9668C16.9377 20.791 17.1781 20.5105 17.3287 20.1656C17.5 19.7734 17.5 19.26 17.5 18.2333V5.76659C17.5 4.73982 17.5 4.22644 17.3287 3.83427C17.1781 3.4893 16.9377 3.20884 16.642 3.03308C16.3059 2.83325 15.8658 2.83325 14.9857 2.83325H9.01429C8.13421 2.83325 7.69416 2.83325 7.35802 3.03308C7.06233 3.20884 6.82193 3.4893 6.67128 3.83427C6.5 4.22644 6.5 4.73983 6.5 5.76659V18.2333C6.5 19.26 6.5 19.7734 6.67128 20.1656C6.82193 20.5105 7.06233 20.791 7.35802 20.9668C7.69416 21.1666 8.1342 21.1666 9.01429 21.1666Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.25 18.4165H14.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M14.75 3.11658C14.75 3.62996 14.75 3.88665 14.6501 4.08273C14.5622 4.25521 14.422 4.39545 14.2495 4.48334C14.0534 4.58324 13.7968 4.58324 13.2833 4.58324H10.7167C10.2032 4.58324 9.94659 4.58324 9.75051 4.48334C9.57803 4.39545 9.4378 4.25521 9.34991 4.08273C9.25 3.88665 9.25 3.62996 9.25 3.11658"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AddBookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M13 19L12.9099 18.8749C12.2848 18.0067 11.413 17.3143 11 17M13 19V9.33333M13 19L13.0901 18.8749C13.7152 18.0067 14.0278 17.5725 14.4408 17.2582C14.8064 16.9799 15.2277 16.7712 15.6806 16.6438C16.192 16.5 16.7556 16.5 17.8827 16.5H19.12C20.1281 16.5 20.6322 16.5 21.0172 16.3183C21.3559 16.1586 21.6313 15.9036 21.8038 15.59C22 15.2335 22 14.7667 22 13.8333V6.66667C22 5.73324 22 5.26653 21.8038 4.91002C21.6313 4.59641 21.3559 4.34144 21.0172 4.18166C20.6322 4 20.1281 4 19.12 4H18.76C16.7438 4 15.7357 4 14.9656 4.36331C14.2883 4.68289 13.7375 5.19283 13.3924 5.82003C13 6.53307 13 7.46649 13 9.33333M4 10.5V6.66667C4 5.73324 4 5.26653 4.19619 4.91002C4.36876 4.59641 4.64412 4.34144 4.98282 4.18166C5.36786 4 5.8719 4 6.88 4H7.24C9.25619 4 10.2643 4 11.0344 4.36331C11.7117 4.68289 12.2625 5.19283 12.6076 5.82003C13 6.53307 13 7.46649 13 9.33333"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13.5V19.5M2 16.5H8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M12 4V20M12 20L18 14M12 20L6 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M5 12.5L10 17.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="M20 20L16 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function SortIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M7 4V20M7 4L3 8M7 4L11 8M17 20V4M17 20L13 16M17 20L21 16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M4 7H13M17 7H20M4 12H7M11 12H20M4 17H14M18 17H20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="15" cy="7" r="2" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="9" cy="12" r="2" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="16" cy="17" r="2" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function RulerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M4.5 14.5L14.5 4.5C15.0523 3.94772 15.9477 3.94772 16.5 4.5L19.5 7.5C20.0523 8.05228 20.0523 8.94772 19.5 9.5L9.5 19.5C8.94772 20.0523 8.05228 20.0523 7.5 19.5L4.5 16.5C3.94772 15.9477 3.94772 15.0523 4.5 14.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8 13L10 15M11 10L13 12M14 7L16 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BookStackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M5 4H9C9.55 4 10 4.45 10 5V19C10 19.55 9.55 20 9 20H5C4.45 20 4 19.55 4 19V5C4 4.45 4.45 4 5 4Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M14 4H18C18.55 4 19 4.45 19 5V19C19 19.55 18.55 20 18 20H14C13.45 20 13 19.55 13 19V5C13 4.45 13.45 4 14 4Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function BookOpenIconSm(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M2 3.5C2 3.22 2.22 3 2.5 3H6C6.83 3 7.5 3.67 7.5 4.5V13.5C7.5 13.22 7.28 13 7 13H2.5C2.22 13 2 12.78 2 12.5V3.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M14 3.5C14 3.22 13.78 3 13.5 3H10C9.17 3 8.5 3.67 8.5 4.5V13.5C8.5 13.22 8.72 13 9 13H13.5C13.78 13 14 12.78 14 12.5V3.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExpandZoomIconSm(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M10 2H14V6M14 2L9.5 6.5M6 14H2V10M2 14L6.5 9.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DotIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ── 16×16 (Size=Small) ───────────────────────────────────────────────────────
// Drawn on a 16-unit grid with stroke-width 1.25 to match the Figma Small variants.
// Use these whenever an icon is rendered at or below 16px so stroke weights
// stay on spec (rather than upscaling the Regular paths).

export function ArrowRightIconSm(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M2.66669 8H13.3334M13.3334 8L9.33335 4M13.3334 8L9.33335 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarOutlineIconSm(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M7.52178 2.30218C7.67538 1.99088 7.75224 1.83524 7.85651 1.7855C7.94724 1.74224 8.05271 1.74224 8.14344 1.7855C8.24778 1.83524 8.32458 1.99088 8.47824 2.30218L9.93604 5.25548C9.98138 5.34738 10.004 5.39334 10.0372 5.42902C10.0666 5.4606 10.1018 5.4862 10.1408 5.50438C10.185 5.52491 10.2357 5.53232 10.3371 5.54714L13.598 6.02377C13.9414 6.07396 14.113 6.09905 14.1925 6.18292C14.2616 6.25589 14.2941 6.35616 14.281 6.45581C14.2658 6.57035 14.1416 6.69143 13.893 6.93356L11.5342 9.23089C11.4608 9.30249 11.424 9.33836 11.4002 9.38096C11.3792 9.41863 11.3658 9.46009 11.3606 9.50296C11.3547 9.55136 11.3634 9.60196 11.3807 9.70309L11.9373 12.948C11.996 13.2903 12.0253 13.4614 11.9702 13.563C11.9222 13.6513 11.8369 13.7133 11.738 13.7316C11.6244 13.7527 11.4707 13.6718 11.1634 13.5102L8.24824 11.9772C8.15738 11.9294 8.11198 11.9056 8.06411 11.8962C8.02178 11.8878 7.97818 11.8878 7.93584 11.8962C7.88798 11.9056 7.84258 11.9294 7.75178 11.9772L4.83659 13.5102C4.52926 13.6718 4.37558 13.7527 4.26196 13.7316C4.1631 13.7133 4.07779 13.6513 4.0298 13.563C3.97464 13.4614 4.004 13.2903 4.06269 12.948L4.61924 9.70309C4.63658 9.60196 4.64526 9.55136 4.63939 9.50296C4.63419 9.46009 4.62072 9.41863 4.59972 9.38096C4.57599 9.33836 4.53923 9.30249 4.4657 9.23089L2.10702 6.93356C1.85842 6.69143 1.73412 6.57035 1.719 6.45581C1.70584 6.35616 1.73834 6.25589 1.80748 6.18292C1.88694 6.09905 2.05862 6.07396 2.402 6.02377L5.66285 5.54714C5.76426 5.53232 5.81496 5.52491 5.85912 5.50438C5.89822 5.4862 5.93342 5.4606 5.96277 5.42902C5.99592 5.39334 6.0186 5.34738 6.06396 5.25548L7.52178 2.30218Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartFavoriteIconSm(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M7.99593 3.95617C6.79629 2.54491 4.79585 2.16528 3.29282 3.45758C1.78978 4.74988 1.57818 6.91056 2.75852 8.43895C3.65006 9.59337 6.18278 11.911 7.36881 12.976C7.58685 13.1718 7.69587 13.2697 7.82349 13.3082C7.93431 13.3417 8.05749 13.3417 8.16831 13.3082C8.29593 13.2697 8.40495 13.1718 8.62299 12.976C9.80901 11.911 12.3417 9.59337 13.2333 8.43895C14.4136 6.91056 14.2278 4.73629 12.699 3.45758C11.1701 2.17887 9.19551 2.54491 7.99593 3.95617Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIconSm(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M13.4 6.8H2.60002M10.4 2V4.4M5.60002 2V4.4M5.48002 14H10.52C11.5281 14 12.0321 14 12.4172 13.8038C12.7559 13.6312 13.0313 13.3559 13.2038 13.0172C13.4 12.6321 13.4 12.1281 13.4 11.12V6.08C13.4 5.0719 13.4 4.56786 13.2038 4.18282C13.0313 3.84412 12.7559 3.56876 12.4172 3.39619C12.0321 3.2 11.5281 3.2 10.52 3.2H5.48002C4.47193 3.2 3.96788 3.2 3.58284 3.39619C3.24415 3.56876 2.96878 3.84412 2.79621 4.18282C2.60002 4.56786 2.60002 5.0719 2.60002 6.08V11.12C2.60002 12.1281 2.60002 12.6321 2.79621 13.0172C2.96878 13.3559 3.24415 13.6312 3.58284 13.8038C3.96788 14 4.47193 14 5.48002 14Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneMobileIconSm(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M6.00953 14.1111H9.99048C10.5772 14.1111 10.8706 14.1111 11.0947 13.9779C11.2918 13.8608 11.4521 13.6738 11.5525 13.4438C11.6667 13.1824 11.6667 12.8401 11.6667 12.1556V3.84447C11.6667 3.15996 11.6667 2.81771 11.5525 2.55626C11.4521 2.32628 11.2918 2.13931 11.0947 2.02213C10.8706 1.88892 10.5772 1.88892 9.99048 1.88892H6.00953C5.42281 1.88892 5.12944 1.88892 4.90535 2.02213C4.70822 2.13931 4.54796 2.32628 4.44752 2.55626C4.33334 2.81771 4.33334 3.15997 4.33334 3.84447V12.1556C4.33334 12.8401 4.33334 13.1824 4.44752 13.4438C4.54796 13.6738 4.70822 13.8608 4.90535 13.9779C5.12944 14.1111 5.4228 14.1111 6.00953 14.1111Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.16663 12.2778H9.83329" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path
        d="M9.83325 2.08582C9.83325 2.42807 9.83325 2.5992 9.76664 2.72992C9.70804 2.84491 9.6146 2.93839 9.49959 2.99699C9.36887 3.06359 9.19776 3.06359 8.85548 3.06359H7.14437C6.80208 3.06359 6.63098 3.06359 6.50026 2.99699C6.38527 2.93839 6.29179 2.84491 6.23319 2.72992C6.16659 2.5992 6.16659 2.42807 6.16659 2.08582"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AddBookIconSm(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <path
        d="M8.66663 12.6666L8.60657 12.5832C8.18981 12.0044 7.60863 11.5428 7.33329 11.3333M8.66663 12.6666V6.22218M8.66663 12.6666L8.72669 12.5832C9.14345 12.0044 9.35183 11.715 9.62717 11.5054C9.87089 11.3199 10.1517 11.1807 10.4537 11.0958C10.7946 11 11.1704 11 11.9217 11H12.7466C13.4187 11 13.7547 11 14.0114 10.8788C14.2372 10.7723 14.4208 10.6023 14.5358 10.3933C14.6666 10.1556 14.6666 9.84446 14.6666 9.22218V4.4444C14.6666 3.82212 14.6666 3.51098 14.5358 3.2733C14.4208 3.06423 14.2372 2.89425 14.0114 2.78773C13.7547 2.66663 13.4187 2.66663 12.7466 2.66663H12.5066C11.1625 2.66663 10.4904 2.66663 9.97703 2.90883C9.52547 3.12189 9.15833 3.46184 8.92823 3.87998C8.66663 4.35534 8.66663 4.97762 8.66663 6.22218M2.66663 6.99996V4.4444C2.66663 3.82212 2.66663 3.51098 2.79742 3.2733C2.91246 3.06423 3.09604 2.89425 3.32184 2.78773C3.57853 2.66663 3.91456 2.66663 4.58663 2.66663H4.82663C6.17075 2.66663 6.84281 2.66663 7.3562 2.90883C7.80779 3.12189 8.17493 3.46184 8.40503 3.87998C8.66663 4.35534 8.66663 4.97762 8.66663 6.22218"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33337 9V13M1.33337 11H5.33337"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
