import { twMerge } from 'tailwind-merge';

import { ButtonAlertInvis } from 'components/Button';
import { raw, from, to, border } from 'design-system/colors';
import { AnchorLink } from 'components/Link';
import { hrefs } from 'design-system/pages';

function Resume() {
  const skewPos = twMerge(
    'skew-10 -top-10 rotate-10',
    'sm:skew-10 sm:-top-10 sm:rotate-10',
    'md:skew-10 md:-top-10 md:rotate-10',
    'lg:skew-13 lg:-top-8 lg:rotate-4',
    'xl:skew-12 xl:-top-8 xl:rotate-0',
  );
  return (
    <div className={twMerge(from(raw.rustOrange), to(raw.rustOrangeLight), border('alert'), 'relative bg-gradient-to-b border-t-2 min-h-30 flex flex-col items-center justify-center overflow-hidden')}>
      <div className={twMerge(from(raw.rustOrangeLight), to(raw.rustOrange), 'bg-gradient-to-b absolute w-2/1 h-110', skewPos)}></div>
      <AnchorLink className='z-10' href={hrefs.resume}>
        <ButtonAlertInvis size='xl' className='border-3 font-bold uppercase z-1'>Download Resume</ButtonAlertInvis>
      </AnchorLink>
    </div>
  );
}

export default Resume;
