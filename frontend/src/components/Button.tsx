import React from 'react';
import { twMerge } from 'tailwind-merge';
import { base, hover, type TwColor } from './../designSystem/colors.ts';

interface InternalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  bgColor: TwColor;
  hoverBgColor: TwColor;
  textColor: TwColor;
}

interface SealedButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

function InternalButton({
  children,
  size = 'md',
  bgColor,
  hoverBgColor,
  textColor,
  className,
  ...props }: InternalButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none';
  const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-deep-forest-blue';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  console.log(className);

  const buttonClassName = twMerge(
    base,
    focus,
    sizes[size],
    bgColor,
    hoverBgColor,
    textColor,
    className
  );

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>)
}

function DefaultButton({ ...props }: SealedButtonProps) {
  return (
    <InternalButton
      bgColor={base.bg.accent}
      hoverBgColor={hover.bg.accent}
      textColor={base.fg.accent}
      {...props}
    />
  );
}

function AlertButton({ ...props }: SealedButtonProps) {
  return (
    <InternalButton
      bgColor={base.bg.alert}
      hoverBgColor={hover.bg.alert}
      textColor={base.fg.alert}
      {...props}
    />
  );
}

export { DefaultButton, AlertButton };
