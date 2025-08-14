import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { BlogPost, getBlogPosts } from 'api/blog';
import { bg, text, border, raw } from 'design-system/colors';
import { ButtonAccent } from 'components/Button';
import { HeadingRaw } from 'components/Heading';

interface PostEntryProps {
  header: string;
  bread: string;
}

interface BlogPostsProps {
  posts: BlogPost[];
}

interface ReloadButtonProps {
  reloads: number;
  setReloads: React.Dispatch<React.SetStateAction<number>>;
}

function PostEntry({ header, bread }: PostEntryProps) {
  return (
    <li className='max-w-1/5'>
      <h3 className={twMerge(text('defaultCard'), 'font-bold')}>{header}</h3>
      <p className={twMerge(text('defaultCard'), 'italic mt-1')}>{bread}</p>
    </li>
  );
}

type UIState = {
  posts: BlogPost[];
  showCriticalError: boolean;
  showReloadButton: boolean;
  noPostsFound: boolean;
  showSpinner: boolean;
};

function extractHeader(content: string): string {
  const lines = content.split('\n');
  const headerLine = lines.find(line => line.trim().startsWith('#'));
  if (!headerLine) return 'Missing Title';
  let header = headerLine.replace(/^#+\s*/, '').trim();
  header = header.replace(/<[^>]*>/g, ''); // Remove any HTML tags
  return header;
}

function extractAndLimitBread(content: string): string {
  const lines = content.split('\n').slice(1);
  let bread = lines.join(' ').trim();

  // Remove markdown formatting
  bread = bread
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/__(.*?)__/g, '$1')     // underline
    .replace(/`(.*?)`/g, '$1')       // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/---/g, '')             // horizontal rule
    .replace(/#+\s/g, '')            // headers
    .replace(/<[^>]*>/g, '');        // HTML tags

  const maxLength = 100;
  if (bread.length > maxLength) {
    bread = bread.slice(0, maxLength).trim() + '...';
  }

  return bread;
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

function ReloadButton({ reloads, setReloads }: ReloadButtonProps) {
  return (
    <div className='flex flex-col items-center py-8 gap-y-4'>
      <ButtonAccent onClick={() => setReloads(reloads + 1)}>
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

function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <ul className='flex justify-center gap-x-20 mt-10'>
      {posts.slice(0, 3).map(({ id, content }, _) => (
        <PostEntry key={id} header={extractHeader(content)} bread={extractAndLimitBread(content)} />
      ))}
    </ul>
  );
}

function Posts() {
  const [uiState, setUIState] = useState<UIState>({
    posts: [],
    showCriticalError: false,
    showReloadButton: false,
    noPostsFound: false,
    showSpinner: true,
  });
  const [reloads, setReloads] = useState<number>(0);

  useEffect(() => {
    async function fetchLatestPosts() {
      setUIState(prev => ({
        ...prev,
        showSpinner: true,
      }));

      const blogPostsPromise = await getBlogPosts();

      setUIState(prev => ({
        ...prev,
        showSpinner: false,
      }));

      switch (blogPostsPromise.state) {
        case 'success':
          let postsData = blogPostsPromise.data ?? [];
          setUIState(prev => ({
            ...prev,
            posts: postsData,
            showCriticalError: false,
            showReloadButton: false,
            noPostsFound: postsData.length === 0,
          }));
          break;
        case 'temporary-failure':
          setUIState(prev => ({
            ...prev,
            posts: [],
            showCriticalError: false,
            showReloadButton: true,
          }));
          break;
        case 'critical-failure':
          setUIState(prev => ({
            ...prev,
            posts: [],
            showCriticalError: true,
            showReloadButton: false,
          }));
          break;
      }
    }

    fetchLatestPosts();
  }, [reloads]);

  // The firGreen text is based on the section above accent background.
  // Could couple it against it, but really feel like that is overkill.
  const highlight = 'default';
  const insetShadow = 'shadow-[inset_0_10px_20px_rgba(0,0,0,0.30)]';
  return (
    <div className={twMerge(bg(highlight), border(highlight), insetShadow, 'relative border-y-2 flex flex-col min-h-64 p-8 pb-12')}>
      <HeadingRaw textStr='Posts' className='font-bold text-center text-shadow-sm' size='lg' color={raw.firGreen} />
      {uiState.showSpinner && <Spinner />}
      {uiState.showCriticalError && <CriticalError />}
      {uiState.showReloadButton && <ReloadButton reloads={reloads} setReloads={setReloads} />}
      {uiState.noPostsFound && <NoPostsFound />}
      {!uiState.noPostsFound && <BlogPosts posts={uiState.posts} />}
    </div>);
}

export default Posts;
