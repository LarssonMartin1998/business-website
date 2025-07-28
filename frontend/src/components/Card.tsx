import React from 'react';
import { twMerge } from 'tailwind-merge';
import { base, TwColor } from '../designSystem/colors';

interface CardProps {
  children: React.ReactNode;
  w: string,
  h: string,
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
  return Card(base.border.default, base.bg.defaultCard, props);
}

function CardAccent(props: CardProps) {
  return Card(base.border.accent, base.bg.accentCard, props);
}

function Card(border: TwColor, bg: TwColor, { children, w, h }: CardProps) {
  return (<div className={twMerge(border, bg, 'border-2', 'flex', 'flex-col', 'text-center', 'justify-center', 'items-center', 'rounded-2xl', 'p-2.5', w, h)}>
    {children}
  </div>);
}

export { ListCardDefault, ListCardAccent, CardDefault, CardAccent };
