const opacityLevels = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100] as const;
type OpacityLevels = typeof opacityLevels[number];

function withTransparency<T extends Record<string, string>>(colors: T) {
  const transparencyEntries = Object.entries(colors)
    .flatMap(([key, value]) =>
      opacityLevels.map(opacity =>
        [`${key}${opacity}`, `${value}/${opacity}`] as const
      )
    );

  return {
    ...colors,
    ...Object.fromEntries(transparencyEntries)
  } as T & {
    [K in keyof T as `${string & K}${OpacityLevels}`]: `${T[K]}/${OpacityLevels}`
  };
}

const colors = {
  fogGrey: 'fog-grey',
  fogGreyLight: 'fog-grey-light',
  pineInk: 'pine-ink',
  pineInkLight: 'pine-ink-light',
  birchWhite: 'birch-white',
  birchWhiteLight: 'birch-white-light',
  firGreen: 'fir-green',
  firGreenLight: 'fir-green-light',
  rustOrange: 'rust-orange',
  rustOrangeLight: 'rust-orange-light',
  cloudHaze: 'cloud-haze',
  cloudHazeLight: 'cloud-haze-light',
  graniteGrey: 'granite-grey',
  graniteGreyLight: 'granite-grey-light',
  mossTeal: 'moss-teal',
  mossTealLight: 'moss-teal-light',
  pearlMist: 'pearl-mist',
  pearlMistLight: 'pearl-mist-light',
  deepForestBlue: 'deep-forest-blue',
  emberBark: 'ember-bark',
  emberBarkLight: 'ember-bark-light',
} as const;

const raw = {
  transparent: 'transparent',
  ...withTransparency(colors),
} as const;

const twPrefixes = ['bg', 'text', 'border',] as const;
type TwPrefix = typeof twPrefixes[number];

// Only used to generate safelist
const specialTwPrefixes = ['from', 'to',] as const;

const twStateVariants = ['hover', 'group-hover', 'peer-hover', 'placeholder',] as const;
type TwStateVariant = typeof twStateVariants[number];

type RawColor = typeof raw[keyof typeof raw];
type TwColor = `${TwPrefix}-${RawColor}`;
type TwStateColor = `${TwStateVariant}:${TwColor}`;

const intents = ['default', 'accent', 'alert', 'defaultCard', 'accentCard',] as const;
type Intent = typeof intents[number];
const intentMap = {
  bg: {
    default: raw.fogGrey,
    accent: raw.firGreen,
    alert: raw.rustOrange,
    defaultCard: raw.birchWhite,
    accentCard: raw.pearlMist,
  },
  text: {
    default: raw.pineInk,
    accent: raw.birchWhite,
    alert: raw.cloudHaze,
    defaultCard: raw.pineInk,
    accentCard: raw.birchWhite,
  },
  border: {
    default: raw.graniteGrey,
    accent: raw.mossTeal,
    alert: raw.emberBark,
    defaultCard: raw.graniteGrey,
    accentCard: raw.mossTeal,
  },
} as const;

function toLight(color: RawColor): RawColor {
  if (color.endsWith('-light')) {
    return color;
  }

  return `${color}-light` as RawColor;
}

function splitTwColor(color: TwColor): [TwPrefix, RawColor] {
  const [prefix, ...rest] = color.split('-') as [TwPrefix, ...string[]];
  return [prefix, rest.join('-') as RawColor];
}

function isIntent(x: unknown): x is Intent {
  return typeof x === 'string' && (intents as readonly string[]).includes(x);
}

function makeConcreteColor(prefix: TwPrefix, value: RawColor | Intent): TwColor {
  const rawColor: RawColor = isIntent(value) ? intentToRaw(prefix, value) : value;
  return `${prefix}-${rawColor}`;
}

function bg(color: RawColor): TwColor;
function bg(intent: Intent): TwColor;
function bg(value: RawColor | Intent): TwColor {
  return makeConcreteColor('bg', value);
}

function text(color: RawColor): TwColor;
function text(intent: Intent): TwColor;
function text(value: RawColor | Intent): TwColor {
  return makeConcreteColor('text', value);
}

function border(color: RawColor): TwColor;
function border(intent: Intent): TwColor;
function border(value: RawColor | Intent): TwColor {
  return makeConcreteColor('border', value);
}

function from(color: RawColor): string {
  return `from-${color}`;
}

function to(color: RawColor): string {
  return `to-${color}`;
}

function placeholder(color: TwColor): TwStateColor {
  return `placeholder:${color}`;
}

function hoverRaw(color: TwColor): TwStateColor {
  return `hover:${color}`;
}

function groupHoverRaw(color: TwColor): TwStateColor {
  return `group-hover:${color}`;
}

function peerHoverRaw(color: TwColor): TwStateColor {
  return `peer-hover:${color}`;
}

function hover(color: TwColor): TwStateColor {
  const [prefix, raw] = splitTwColor(color);
  const light = toLight(raw);
  return hoverRaw(`${prefix}-${light}`);
}

function intentToRaw(prefix: TwPrefix, intent: Intent): RawColor {
  return intentMap[prefix][intent];
}

export { raw, twPrefixes, twStateVariants, specialTwPrefixes, bg, text, border, placeholder, hover, hoverRaw, groupHoverRaw, peerHoverRaw, splitTwColor, intentToRaw, from, to };
export type { RawColor, TwPrefix, TwStateVariant, Intent, TwColor, TwStateColor, };
