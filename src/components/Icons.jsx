import { siGithub } from 'simple-icons';

const Svg = ({ size = 18, children, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const ArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);

export const ArrowDown = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Svg>
);

export const ArrowUp = (p) => (
  <Svg {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
);

export const Download = (p) => (
  <Svg {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Svg>
);

export const Mail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
);

export const GitHub = ({ size = 20, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...p}
  >
    <path d={siGithub.path} />
  </svg>
);

export const LinkedIn = ({ size = 20, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="currentColor"
    aria-hidden="true"
    {...p}
  >
    <path d="M37.04 0H2.95C1.32 0 0 1.29 0 2.88v34.23C0 38.7 1.32 40 2.95 40h34.09C38.67 40 40 38.7 40 37.12V2.88C40 1.29 38.67 0 37.04 0ZM11.87 34.09H5.93V14.99h5.94v19.1ZM8.9 12.39a3.44 3.44 0 1 1 0-6.88 3.44 3.44 0 0 1 0 6.88Zm25.19 21.7h-5.93V24.8c0-2.21-.04-5.06-3.09-5.06-3.09 0-3.56 2.41-3.56 4.9v9.44h-5.92v-19.1h5.69v2.61h.08c.79-1.5 2.72-3.09 5.61-3.09 6 0 7.12 3.95 7.12 9.1v10.49Z" />
  </svg>
);

