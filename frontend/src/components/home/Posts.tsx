import { twMerge } from 'tailwind-merge';

import { BlogPost, } from 'api/blog';
import { bg, text, border, raw } from 'design-system/colors';
import { ButtonAccent } from 'components/Button';
import { HeadingRaw } from 'components/Heading';
import { extractHeader, extractAndLimitBread } from 'utils/helpers';
import { useBlogPosts } from 'hooks/useBlogPosts';

interface PostEntryProps {
  header: string;
  bread: string;
}

function PostEntry({ header, bread }: PostEntryProps) {
  return (
    <li className='max-w-1/5'>
      <h3 className={twMerge(text('defaultCard'), 'font-bold')}>{header}</h3>
      <p className={twMerge(text('defaultCard'), 'italic mt-1')}>{bread}</p>
    </li>
  );
}

function Spinner() {
  return (
    <div className='flex justify-center items-center py-4'>
      <span className={text('default')}>Loading posts...</span>
    </div>
  );
}

function CriticalError() {
  return (
    <div className='flex flex-col items-center py-4'>
      <span className='text-red-400 font-bold'>Internal error loading posts.</span>
    </div>
  );
}

function ReloadButton({ refetch }: { refetch: () => void }) {
  return (
    <div className='flex flex-col items-center py-8 gap-y-4'>
      <ButtonAccent onClick={refetch}>
        Refresh
      </ButtonAccent>
      <span className={twMerge(text('default'), '')}>Temporary failure when loading posts, please try again.</span>
    </div>
  );
}

function NoPostsFound() {
  return (
    <span className={text('default')}>
      There are no written posts yet.
    </span>
  );
}

function BlogPosts() {
  const { posts, state, refetch } = useBlogPosts();

  if (state === 'loading') {
    return (
      <Spinner />
    );
  }

  if (state === 'critical-failure') {
    return (
      <CriticalError />
    );
  }

  if (state === 'temporary-failure') {
    return (
      <ReloadButton refetch={refetch} />
    );
  }

  if (state === 'success' && posts.length === 0) {
    return (
      <NoPostsFound />
    );
  }

  return (
    <ul className='flex justify-center gap-x-20 mt-10'>
      {posts.slice(0, 3).map(({ id, content }, _) => (
        <PostEntry key={id} header={extractHeader(content)} bread={extractAndLimitBread(content)} />
      ))}
    </ul>
  );
}

function Posts() {
  // The firGreen text is based on the section above accent background.
  // Could couple it against it, but really feel like that is overkill.
  const highlight = 'default';
  const insetShadow = 'shadow-[inset_0_10px_20px_rgba(0,0,0,0.30)]';
  return (
    <div className={twMerge(bg(highlight), border(highlight), insetShadow, 'relative border-y-2 flex flex-col min-h-64 p-8 pb-12')}>
      <HeadingRaw textStr='Posts' className='font-bold text-center text-shadow-sm' size='lg' color={raw.firGreen} />
      <BlogPosts />
    </div>);
}

export default Posts;
