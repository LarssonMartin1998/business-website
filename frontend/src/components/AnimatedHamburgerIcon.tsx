import { twMerge } from "tailwind-merge";

interface AnimatedHamburgerIconProps {
  isExpanded: boolean;
}

function AnimatedHamburgerIcon({ isExpanded }: AnimatedHamburgerIconProps) {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        className={twMerge(
          'transition-all duration-300 ease-in-out origin-center',
          isExpanded ? 'rotate-45 translate-x-[-4.5px] translate-y-[4.5px]' : ''
        )}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16"
      />
      <path
        className={twMerge(
          'transition-all duration-200 ease-in-out',
          isExpanded ? 'opacity-0' : 'opacity-100'
        )}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12h16"
      />
      <path
        className={twMerge(
          'transition-all duration-300 ease-in-out origin-center',
          isExpanded ? '-rotate-45 translate-x-[-4px] translate-y-[-4px]' : ''
        )}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 18h16"
      />
    </svg>
  );
}

export default AnimatedHamburgerIcon;
