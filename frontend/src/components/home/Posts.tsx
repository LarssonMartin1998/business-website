import { twMerge } from 'tailwind-merge';

import { bg, text, border, raw } from 'design-system/colors';
import { ButtonAccent } from 'components/Button';
import { useBlogPosts } from 'hooks/useBlogPosts';
import BlogMeta from 'components/BlogMeta';
import { useNavigate } from 'react-router-dom';
import { CardDefault } from 'components/Card';
import SectionHeading from 'components/home/SectionHeading';
import { BlogPost } from 'api/blog';

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

interface DinMammaMannenProps {
  className: string;
  cardClasses: string;
  numPosts: number
  posts: BlogPost[];
}

function DinMammaMannen({ className, cardClasses, numPosts, posts }: DinMammaMannenProps) {
  const navigate = useNavigate();

  const onPressPost = (postId: number) => {
    navigate('/blog', { state: { expandPostId: postId } });
  };

  return (
    <ul className={className}>
      {posts.slice(0, numPosts).map((blogPost, _) => (
        <CardDefault key={blogPost.id} className={cardClasses}>
          <BlogMeta headerClasses='text-md max-[500px]:!text-xs' blogPost={blogPost} onClick={() => { onPressPost(blogPost.id); }} />
        </CardDefault>
      ))}
    </ul>
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

  const screenSizes = [
    [
      2,
      'flex px-2 min-[600px]:!px-10 min-[800px]:!px-30 min-[1000px]:!px-40 min-[1150px]:!px-60 flex-col items-center gap-y-4 mt-10 min-[1300px]:hidden',
      'p-4 shadow w-full'
    ],
    [
      2,
      'hidden min-[1300px]:flex min-[1920px]:hidden justify-center gap-x-20 mt-10',
      'p-4 shadow min-w-2/5'
    ],
    [
      3,
      'hidden min-[1920px]:flex justify-center gap-x-16 mt-10 min-[2100px]:!gap-x-20',
      'p-4 shadow min-w-3/10 min-[2100px]:!min-w-1/4'
    ],
  ];

  return (
    <>
      {screenSizes.map(([numPosts, className, cardClasses], idx) => (
        <DinMammaMannen key={idx} posts={posts} numPosts={numPosts as number} className={className as string} cardClasses={cardClasses as string} />
      ))}
    </>
  );
}

function Posts() {
  // The firGreen text is based on the section above accent background.
  // Could couple it against it, but really feel like that is overkill.
  const highlight = 'default';
  const insetShadow = 'shadow-[inset_0_10px_20px_rgba(0,0,0,0.30)]';
  return (
    <div className={twMerge(bg(highlight), border(highlight), insetShadow, 'relative border-t-2 flex flex-col min-h-64 py-8')}>
      <SectionHeading className={text(raw.firGreen)}>Posts</SectionHeading>
      <BlogPosts />
    </div>);
}

export default Posts;
