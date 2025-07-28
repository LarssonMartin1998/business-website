import React from 'react';
import { twMerge } from 'tailwind-merge';
import { base, hover, type TwColor } from './../designSystem/colors.ts';

interface ButtonColor {
  default: TwColor;
  hover?: TwColor;
}

interface SealedButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

interface CustomButtonProps {
  border?: ButtonColor,
  bg: ButtonColor,
  fg: ButtonColor,
}

function CustomButton({ children, size = 'md', border, bg, fg, className, ...props }: CustomButtonProps & SealedButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none';
  const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-deep-forest-blue';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm w-24 h-12',
    md: 'px-4 py-2 text-base w-36 h-14',
    lg: 'px-6 py-3 text-lg w-48 h-14',
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

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>)
}

function DefaultButton(props: SealedButtonProps) {
  return (
    <CustomButton
      bg={{
        default: base.bg.accent,
        hover: hover.bg.accent
      }}
      fg={{
        default: base.fg.accent,
        hover: hover.fg.accent
      }}
      {...props}
    />
  );
}

function AlertButton(props: SealedButtonProps) {
  return (
    <CustomButton
      border={{
        default: base.border.alert,
        hover: hover.border.alert
      }}
      bg={{
        default: base.bg.alert,
        hover: hover.bg.alert
      }}
      fg={{
        default: base.fg.alert,
        hover: hover.fg.alert
      }}
      {...props}
    />
  );
}

export { CustomButton, DefaultButton, AlertButton };
