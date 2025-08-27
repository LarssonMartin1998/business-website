import { twMerge } from 'tailwind-merge';

import { text } from 'design-system/colors';

interface MainHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function MainHeading({ children, className }: MainHeaderProps) {
  return (
    <h1 className={twMerge(text('default'), 'font-bold text-2xl', className)}>{children}</h1>
  );
}

export default MainHeading;
