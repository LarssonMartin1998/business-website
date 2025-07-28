// Fuck tailwind:
// This code is working, meaning I don't have to hard code the above tw class names and maintain base and hover
// However, Tailwind sucks ass and prunes the classnames unless they're available in the code base, somewhere, even as comments.
// This code below would literally work if I just pasted the custom colors as a comment somewhere including the whole action prefix and -hover suffix.
//
// We could have this beautiful maintainable love show below unless for tailwinds idiotic and poorly implemented pruning.
//
// const baseColors = {
//   bg: {
//     default: 'fog-grey',
//     defaultCard: 'birch-white',
//     accentCard: 'pearl-mist',
//     accent: 'fir-green',
//     alert: 'rust-orange',
//   },
//   fg: {
//     default: 'pine-ink',
//     accent: 'birch-white',
//     alert: 'cloud-haze',
//   },
//   border: {
//     default: 'granite-grey',
//     accent: 'moss-teal',
//   },
// } as const;
//
// const createPalette = <T extends Record<string, Record<string, string>>>(colors: T) => {
//   const base = {} as Record<string, Record<string, string>>;
//   const hover = {} as Record<string, Record<string, string>>;;
//
//   for (const [category, categoryColors] of Object.entries(colors)) {
//     base[category] = {};
//     hover[category] = {};
//
//     for (const [variant, color] of Object.entries(categoryColors)) {
//       const prefix = category === 'bg' ? 'bg-' : category === 'fg' ? 'text-' : 'border-';
//       base[category][variant] = `${prefix}${color}`;
//       hover[category][variant] = `hover:${prefix}${color}-hover`;
//     }
//   }
//
//   return { base, hover };
// };
//
// const palette = createPalette(baseColors);
const base = {
  bg: {
    default: 'bg-fog-grey',
    defaultCard: 'bg-birch-white',
    accentCard: 'bg-pearl-mist',
    accent: 'bg-fir-green',
    alert: 'bg-rust-orange',
  },
  fg: {
    default: 'text-pine-ink',
    accent: 'text-birch-white',
    alert: 'text-cloud-haze',
    accentText: 'text-fir-green',
  },
  border: {
    default: 'border-granite-grey',
    accent: 'border-moss-teal',
    alert: 'border-ember-bark',
  },
} as const;

const hover = {
  bg: {
    default: 'hover:bg-fog-grey-hover',
    defaultCard: 'hover:bg-birch-white-hover',
    accentCard: 'hover:bg-pearl-mist-hover',
    accent: 'hover:bg-fir-green-hover',
    alert: 'hover:bg-rust-orange-hover',
  },
  fg: {
    default: 'hover:text-pine-ink-hover',
    accent: 'hover:text-birch-white-hover',
    alert: 'hover:text-cloud-haze-hover',
  },
  border: {
    default: 'hover:border-granite-grey-hover',
    accent: 'hover:border-moss-teal-hover',
    alert: 'hover:border-ember-bark-hover',
  },
}

const active = {
  bg: {
    default: 'active:bg-fog-grey-hover',
    defaultCard: 'active:bg-birch-white-hover',
    accentCard: 'active:bg-pearl-mist-hover',
    accent: 'active:bg-fir-green-hover',
    alert: 'active:bg-rust-orange-hover',
  },
  fg: {
    default: 'active:text-pine-ink-hover',
    accent: 'active:text-birch-white-hover',
    alert: 'active:text-cloud-haze-hover',
  },
  border: {
    default: 'active:border-granite-grey-hover',
    accent: 'active:border-moss-teal-hover',
  },
}

// Extract the actual Tailwind class names from the generated palette
type ExtractClassNames<T> = T extends Record<string, Record<string, infer U>> ? U : never;
type TwColor =
  | ExtractClassNames<typeof base>
  | ExtractClassNames<typeof hover>
  | ExtractClassNames<typeof active>;

export { base, hover, active };
export type { TwColor };
