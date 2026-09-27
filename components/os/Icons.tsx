/* Ghost OS iconography — thin-stroke line art, no fills, no colour.
   Every icon reads as an etching in fog rather than a glyph. */
const S = ({ children, size = 42 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
       stroke="currentColor" strokeWidth={1.1}
       strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const IconDoc = (p: { size?: number }) => (
  <S {...p}>
    <path d="M13 5h15l7 7v31H13z" />
    <path d="M28 5v7h7" />
    <path d="M18 22h12M18 28h12M18 34h8" opacity=".55" />
  </S>
);

export const IconPDF = (p: { size?: number }) => (
  <S {...p}>
    <path d="M13 5h15l7 7v31H13z" />
    <path d="M28 5v7h7" />
    <text x="24" y="34" textAnchor="middle" fontSize="9" fill="currentColor"
          stroke="none" fontFamily="monospace" letterSpacing=".5">PDF</text>
  </S>
);

export const IconFolder = (p: { size?: number }) => (
  <S {...p}>
    <path d="M5 13h14l4 5h20v25H5z" />
    <path d="M5 22h38" opacity=".4" />
  </S>
);

export const IconApp = (p: { size?: number }) => (
  <S {...p}>
    <rect x="7" y="7" width="34" height="34" rx="8" />
    <circle cx="24" cy="24" r="8" opacity=".75" />
    <circle cx="24" cy="24" r="2.4" fill="currentColor" stroke="none" />
  </S>
);

export const IconSystems = (p: { size?: number }) => (
  <S {...p}>
    <rect x="5" y="9" width="13" height="10" rx="2.5" />
    <rect x="30" y="9" width="13" height="10" rx="2.5" />
    <rect x="17.5" y="30" width="13" height="10" rx="2.5" />
    <path d="M18 14h12M11.5 19v6h25v-6M24 25v5" opacity=".65" />
  </S>
);

export const IconTerminal = (p: { size?: number }) => (
  <S {...p}>
    <rect x="5" y="9" width="38" height="30" rx="4" />
    <path d="M5 17h38" opacity=".4" />
    <path d="M12 24l5 4-5 4M21 32h10" />
  </S>
);

export const IconMail = (p: { size?: number }) => (
  <S {...p}>
    <rect x="5" y="11" width="38" height="26" rx="4" />
    <path d="M6 14l18 12 18-12" />
  </S>
);

export const IconTrash = (p: { size?: number }) => (
  <S {...p}>
    <path d="M9 13h30" />
    <path d="M19 13V8h10v5" />
    <path d="M12 13l2 30h20l2-30" />
    <path d="M20 21v15M28 21v15" opacity=".5" />
  </S>
);

export const IconLink = (p: { size?: number }) => (
  <S {...p}>
    <rect x="7" y="7" width="34" height="34" rx="8" />
    <path d="M18 30l12-12M21 18h9v9" />
  </S>
);

export const IconMovie = (p: { size?: number }) => (
  <S {...p}>
    <rect x="5" y="11" width="38" height="26" rx="3" />
    <path d="M13 11v26M35 11v26" opacity=".45" />
    <path d="M5 19h8M5 29h8M35 19h8M35 29h8" opacity=".45" />
    <path d="M21 19l7 5-7 5z" />
  </S>
);

export const IconFinder = (p: { size?: number }) => (
  <S {...p}>
    <rect x="7" y="7" width="34" height="34" rx="8" />
    <path d="M24 7v34" opacity=".4" />
    <path d="M14 19v4M34 19v4" />
    <path d="M14 31c3 3 7 3 10 0M24 31c3 3 7 3 10 0" opacity=".7" />
  </S>
);
