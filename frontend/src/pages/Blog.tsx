import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

import Header from 'components/Header';
import Main from 'components/Main';
import { HeadingDefault, HeadingDefaultCard } from 'components/Heading';
import { BlogPost, getBlogPosts } from 'api/blog';
import { extractHeader, extractBread } from 'utils/helpers';
import { CardDefault } from 'components/Card';
import { twMerge } from 'tailwind-merge';
import { bg, border, groupHoverRaw, raw, text } from 'design-system/colors';

interface BlogEntryProps {
  markdown: string;
}

function NewPostBanner() {
  return (
    <div className={twMerge(bg('alert'), text('alert'), 'min-h-5 flex rounded-full font-bold text-xs px-2.5 w-fit justify-center items-center')}>
      New
    </div>
  );
}

interface PostTagProps {
  children: React.ReactNode;
}

function PostTag({ children }: PostTagProps) {
  return (
    <div className={twMerge(bg(raw.birchWhiteLight), border(raw.graniteGreyLight), 'rounded-full px-2 border-1')}>
      {children}
    </div>
  );
}

function PostMeta() {
  return (
    <div className='flex gap-x-4 text-xs'>
      <span>2025-05-24</span>
      <span>4 min</span>
      <div className='flex gap-x-1'>
        <PostTag>cpp</PostTag >
        <PostTag>meta</PostTag >
        <PostTag>tips</PostTag >
      </div>
    </div>
  );
}

function BlogEntry({ markdown }: BlogEntryProps) {
  const [show, setShow] = useState(false);
  const extractedHeader = extractHeader(markdown);
  return (
    <CardDefault className='p-4 px-4.5 rounded-xl shadow-md/10'>
      <div className='group min-h-12 flex flex-col gap-y-1 justify-center' onClick={() => setShow(!show)}>
        <div className='flex gap-x-2 items-center'>
          <HeadingDefaultCard className={twMerge(groupHoverRaw(text(raw.firGreen)), 'font-bold group-hover:underline')} textStr={extractedHeader} size='xs' />
          <NewPostBanner />
        </div>

        <PostMeta />
      </div>

      {show && <div className={twMerge(border(raw.graniteGreyLight), 'mt-4 border-dashed border-t-1 pt-4')}>
        <Markdown>{extractBread(markdown)}</Markdown>
      </div>}
    </CardDefault>
  );
}

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    async function fetchLatestPosts() {
      const blogPostsPromise = await getBlogPosts();
      switch (blogPostsPromise.state) {
        case 'success':
          let postsData = blogPostsPromise.data ?? [];
          setPosts(postsData);
          break;
        case 'temporary-failure':
          break;
        case 'critical-failure':
          break;
      }
    }

    fetchLatestPosts();
  }, []);

  const headline = 'Thoughts about Computers, Programming, and Life';
  return (
    <>
      <Header />
      <Main className='flex justify-center'>
        <div className='w-1/2 mt-4 p-2.5'>
          <HeadingDefault className='font-bold' textStr={headline} size='sm' />
          <div className='flex flex-col gap-y-4 p-2.5 mt-4'>
            {posts.map(({ id, content }, _) => (
              <BlogEntry key={id} markdown={content} />
            ))}
          </div>

        </div>
      </Main >
    </>
  );
}

export default Blog;
