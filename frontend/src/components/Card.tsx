import React from 'react';
import { twMerge } from 'tailwind-merge';
import { bg, border, TwColor } from 'design-system/colors';

interface CardProps {
  children: React.ReactNode;
  className: string;
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
  return Card(border('defaultCard'), bg('defaultCard'), props);
}

function CardAccent(props: CardProps) {
  return Card(border('accentCard'), bg('accentCard'), props);
}

function Card(border: TwColor, bg: TwColor, { children, className }: CardProps) {
  return (<div className={twMerge(border, bg, 'border-2', 'flex', 'flex-col', 'text-center', 'justify-center', 'items-center', 'rounded-2xl', 'p-2.5', 'shadow-xl/10', className)}>
    {children}
  </div>);
}

export { ListCardDefault, ListCardAccent, CardDefault, CardAccent };
