import { bg } from 'design-system/colors';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MainProps {
  children: React.ReactNode;
  className?: string;
}

function Main({ children, className }: MainProps) {
  return (
    <main className={twMerge(bg('default'), 'min-h-screen m-auto', className)}>
      {children}
    </main>
  );
}

export default Main;
