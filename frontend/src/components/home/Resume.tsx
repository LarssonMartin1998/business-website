import { twMerge } from 'tailwind-merge';

import { ButtonAlertInvis } from 'components/Button';
import { raw, from, to, border } from 'design-system/colors';

function Resume() {
  return (
    <div className={twMerge(from(raw.rustOrange), to(raw.rustOrangeLight), border('alert'), 'relative bg-gradient-to-b border-t-2 min-h-30 flex flex-col items-center justify-center overflow-hidden')}>
      <div className={twMerge(from(raw.rustOrangeLight), to(raw.rustOrange), 'bg-gradient-to-b absolute w-full h-110 skew-12 -top-10 z-0')}></div>
      <ButtonAlertInvis size='xl' className='border-3 font-bold uppercase z-1'>Download Resume</ButtonAlertInvis>
    </div>
  );
}

export default Resume;
