import React from 'react';
import { twMerge } from 'tailwind-merge';

import { bg, border, TwColor } from 'design-system/colors';

interface BaseCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  border: TwColor;
  bg: TwColor;
  children: React.ReactNode;
}

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
}

function ListCardDefault(props: CardProps) {
  return (
    <li>
      <CardDefault {...props} />
    </li>);
}

function ListCardAccent(props: CardProps) {
  return (
    <li>
      <CardAccent {...props} />
    </li>);
}

function CardDefault(props: CardProps) {
  return (
    <Card border={border('defaultCard')} bg={bg('defaultCard')} {...props} />
  );
}

function CardAccent(props: CardProps) {
  return (
    <Card border={border('accentCard')} bg={bg('accentCard')} {...props} />
  );
}

function Card({ as: Component = 'div', border, bg, children, className, ...props }: BaseCardProps) {
  const pointerHover = props.onClick ? 'hover:cursor-pointer' : '';
  return (
    <Component className={twMerge(border, bg, 'border-1 rounded-2xl p-2.5 shadow-xl/10', pointerHover, className)} {...props}>
      {children}
    </Component>
  );
}

export { ListCardDefault, ListCardAccent, CardDefault, CardAccent };
