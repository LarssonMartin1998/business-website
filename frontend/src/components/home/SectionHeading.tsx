import { twMerge } from 'tailwind-merge';

interface SectionHeadingProps {
  children: string;
  className: string;
}

function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2 className={twMerge('font-bold text-shadow-sm text-center text-3xl md:text-4xl', className)}>{children}</h2>
  );
}

export default SectionHeading;
