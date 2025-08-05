import { twMerge } from 'tailwind-merge';

import { ButtonAlertInvis } from 'components/Button';
import { bg } from 'design-system/colors';

function Resume() {
  return (
    <div className={twMerge(bg('alert'), 'h-48 pb-10 flex flex-col items-center justify-center')}>
      <ButtonAlertInvis size='xl' className='border-3 font-bold uppercase'>Download Resume</ButtonAlertInvis>
    </div>
  );
}

export default Resume;
