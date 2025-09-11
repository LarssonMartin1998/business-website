import { bg, border, text } from 'design-system/colors';
import { twMerge } from 'tailwind-merge';

type BannerState = 'success' | 'error' | 'sending';

interface BannerProps {
  state: BannerState;
  children: React.ReactNode;
  className?: string;
}

function Banner({ state, children, className }: BannerProps) {
  const base = 'rounded-md text-sm p-3 border flex gap-2 items-start';

  const variantClasses: Record<BannerState, string> = {
    success: `${bg('accent')} ${text('accent')} ${border('accent')}`,
    error: `${bg('alert')} ${text('alert')} ${border('alert')}`,
    sending: `${bg('defaultCard')} ${text('defaultCard')} ${border('defaultCard')}`,
  };

  const role = state === 'error' ? 'alert' : 'status';
  const ariaLive = state === 'error' ? 'assertive' : 'polite';

  return (
    <div
      role={role}
      aria-live={ariaLive}
      className={twMerge(base, variantClasses[state], className)}
    >
      {children}
    </div>
  );
}

export default Banner;
