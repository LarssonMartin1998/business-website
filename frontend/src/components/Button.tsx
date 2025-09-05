import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Href, Page, pages } from 'design-system/pages';
import { bg, text, border, hover, type TwColor, type TwStateColor, splitTwColor, Intent, } from 'design-system/colors';
import Size from 'design-system/sizes';

import { PageLink, AnchorLink } from 'components/Link';

interface ButtonColor {
  default: TwColor;
  hover?: TwStateColor;
}

interface SealedButtonProps {
  children: React.ReactNode;
  size?: Size;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  buttonLink?: Page | Href;
}

interface CustomButtonProps {
  border?: ButtonColor;
  bg: ButtonColor;
  fg: ButtonColor;
}

function CustomButton({ children, size = 'md', border, bg, fg, className, buttonLink, ...props }: CustomButtonProps & SealedButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer';

  const sizes = {
    xs: 'px-2 py-1 text-xs w-18 h-10',
    sm: 'px-3 py-1.5 text-sm w-24 h-12',
    md: 'px-4 py-2 text-base w-40 h-14',
    lg: 'px-6 py-3 text-lg w-48 h-14',
    xl: 'px-6 py-3 text-lg w-68 h-16',
  };

  const borderProps = border != undefined ? twMerge(border.default, border.hover, 'border-2') : undefined;

  const buttonClassName = twMerge(
    base,
    sizes[size],
    borderProps,
    bg.default,
    bg.hover,
    fg.default,
    fg.hover,
    className
  );

  if (!buttonLink) {
    return (
      <button className={buttonClassName} {...props}>
        {children}
      </button>
    );
  }

  if ((pages as readonly string[]).includes(buttonLink)) {
    return (
      <PageLink page={buttonLink as Page} className={buttonClassName} {...props}>
        {children}
      </PageLink>
    );
  } else {
    return (
      <AnchorLink href={buttonLink as Href} className={buttonClassName} {...props}>
        {children}
      </AnchorLink>
    );
  }
}

function ButtonIntentVariant({ intent, useBorder, ...props }: SealedButtonProps & { useBorder: boolean, intent: Intent }) {
  const bgCol = bg(intent);
  const textCol = text(intent);
  const borderObj = useBorder ? {
    default: border(intent),
    hover: hover(border(intent))
  } : undefined;

  return (
    <CustomButton
      bg={{
        default: bgCol,
        hover: hover(bgCol)
      }}
      fg={{
        default: textCol,
        hover: hover(textCol)
      }}
      border={borderObj}
      {...props}
    />
  );
}

function ButtonInvisIntentVariant({ intent, ...props }: SealedButtonProps & { intent: Intent }) {
  const textCol = text(intent);

  const [, bgColRaw] = splitTwColor(bg(intent));
  const [, textColRaw] = splitTwColor(textCol);

  return (
    <CustomButton
      bg={{
        default: bg('transparent'),
        hover: hover(bg(textColRaw))
      }}
      fg={{
        default: textCol,
        hover: hover(text(bgColRaw))
      }}
      border={{
        default: border(textColRaw)
      }}
      {...props}
    />
  );
}

function ButtonAccent(props: SealedButtonProps) {
  return (<ButtonIntentVariant intent='accent' useBorder={false} {...props} />);
}

function ButtonAccentInvis(props: SealedButtonProps) {
  return (<ButtonInvisIntentVariant intent='accent' {...props} />);
}

function ButtonAlert(props: SealedButtonProps) {
  return (<ButtonIntentVariant intent='alert' useBorder={true} {...props} />);
}

function ButtonAlertInvis(props: SealedButtonProps) {
  return (<ButtonInvisIntentVariant intent='alert' {...props} />);
}

export { CustomButton, ButtonAccent, ButtonAccentInvis, ButtonAlert, ButtonAlertInvis, };
export type { ButtonColor };
