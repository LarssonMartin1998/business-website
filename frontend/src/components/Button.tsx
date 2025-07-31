import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Page, PageLink } from 'design-system/pages';
import { bg, text, border, hover, type TwColor, type TwStateColor, splitTwColor, Intent } from 'design-system/colors';

interface ButtonColor {
  default: TwColor;
  hover?: TwStateColor;
}

interface SealedButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  buttonLink?: Page;
}

interface CustomButtonProps {
  border?: ButtonColor;
  bg: ButtonColor;
  fg: ButtonColor;
}

function CustomButton({ children, size = 'md', border, bg, fg, className, buttonLink, ...props }: CustomButtonProps & SealedButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none';
  const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-deep-forest-blue';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm w-24 h-12',
    md: 'px-4 py-2 text-base w-36 h-14',
    lg: 'px-6 py-3 text-lg w-48 h-14',
    xl: 'px-6 py-3 text-lg w-64 h-16',
  };

  const borderProps = border != undefined ? twMerge(border.default, border.hover, 'border-2') : undefined;

  const buttonClassName = twMerge(
    base,
    focus,
    sizes[size],
    borderProps,
    bg.default,
    bg.hover,
    fg.default,
    fg.hover,
    className
  );

  const finalButton = (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );

  return buttonLink
    ? <PageLink page={buttonLink}>{finalButton}</PageLink>
    : finalButton;
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
  const bgCol = bg(intent);
  const textCol = text(intent);

  const [, bgColRaw] = splitTwColor(bgCol);
  const [, textColRaw] = splitTwColor(textCol);

  return (
    <CustomButton
      bg={{
        default: bgCol,
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

export { ButtonAccent, ButtonAccentInvis, ButtonAlert, ButtonAlertInvis, };
