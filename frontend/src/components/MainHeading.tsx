import { twMerge } from 'tailwind-merge';

import { text } from 'design-system/colors';

interface MainHeaderProps {
  children: React.ReactNode;
}

function MainHeading({ children }: MainHeaderProps) {
  return (
    <h1 className={twMerge(text('default'), 'font-bold text-xl')}>{children}</h1>
  );
}
