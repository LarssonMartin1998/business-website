import { bg, hover } from 'design-system/colors';
import { twMerge } from 'tailwind-merge';

function Contact() {
  const bgCol = bg('accent');
  return (
    <div className={twMerge(bgCol, hover(bgCol), 'w-full h-64')}>
      Contact
    </div>
  );
}

export default Contact;
