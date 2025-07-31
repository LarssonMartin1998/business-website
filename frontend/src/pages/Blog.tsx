import { bg, hover } from 'design-system/colors';
import { twMerge } from 'tailwind-merge';

function Blog() {
  const bgCol = bg('alert');
  return (
    <div className={twMerge(bgCol, hover(bgCol), 'w-full h-64')}>
      Blog
    </div>
  );
}

export default Blog;
