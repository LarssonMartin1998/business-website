import React from 'react';
import { twMerge } from 'tailwind-merge';
import { bg, border, TwColor } from 'design-system/colors';

interface BaseCardProps extends CardProps {
  border: TwColor;
  bg: TwColor;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
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

function Card({ border, bg, children, className }: BaseCardProps) {
  return (<div className={twMerge(border, bg, 'border-1 rounded-2xl p-2.5 shadow-xl/10', className)}>
    {children}
  </div>);
}

export { ListCardDefault, ListCardAccent, CardDefault, CardAccent };
