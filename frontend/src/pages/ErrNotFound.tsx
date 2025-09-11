import { bg, hover, text } from 'design-system/colors';
import { twMerge } from 'tailwind-merge';

function ErrNotFound() {
  const highlight = 'default';
  const bgCol = bg(highlight);
  const textCol = text(highlight);
  return (
    <div className={twMerge(bgCol, hover(bgCol), textCol, hover(textCol), 'w-full h-64')}>
      404 Not Found
    </div>
  );
}

export default ErrNotFound;
