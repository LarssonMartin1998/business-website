import { twMerge } from 'tailwind-merge';

import { BlogPost } from 'api/blog';
import { bg, border, groupHoverRaw, raw, text } from 'design-system/colors';

import { extractHeader } from 'utils/helpers';
import { HeadingDefaultCard } from 'components/Heading';

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

interface PostDetailsProps {
  date: Date;
  readTimeMins: number;
  tags: string;
}
function PostDetails({ date, readTimeMins, tags }: PostDetailsProps) {
  const splitTags = tags.split(",");
  return (
    <div className='flex gap-x-4 text-xs'>
      <span>{date.toLocaleDateString('sv-SE')}</span>
      <span>{readTimeMins} min</span>
      {splitTags.length > 0 && <div className='flex gap-x-1'>
        {splitTags.map((tag, idx) => (
          <PostTag key={idx}>{tag}</PostTag>
        ))}
      </div>}
    </div>
  );
}

interface BlogMetaProps {
  blogPost: BlogPost;
  onClick: () => void;
}

function BlogMeta({ blogPost, onClick }: BlogMetaProps) {
  const extractedHeader = extractHeader(blogPost.content);

  const publishedAtTime = blogPost.published_at.getTime();
  const updatedAtTime = blogPost.updated_at.getTime();
  const latestBlogTime = Math.max(publishedAtTime, updatedAtTime);

  const now = new Date();
  const diff = Math.abs(now.getTime() - latestBlogTime);
  const daysSinceBlogDate = Math.floor(diff / (1000 * 60 * 60 * 24));
  const newPostThresholdInDays = 14;
  const shouldMarkPostAsNew = daysSinceBlogDate <= newPostThresholdInDays;

  const readSpeedAvgWordsPerMin = 238;
  const technicalComplexityPunishmentGuess = 0.8;
  const markdownSyntaxRemovalGuess = 0.95;
  const wordCount = blogPost.content.split(' ').length;
  const readingTimeGuess = Math.max(1, Math.round(wordCount / readSpeedAvgWordsPerMin) * technicalComplexityPunishmentGuess * markdownSyntaxRemovalGuess);
  return (
    <div className='group min-h-12 flex flex-col gap-y-1 justify-center' onClick={onClick}>
      <div className='flex gap-x-2 items-center'>
        <HeadingDefaultCard className={twMerge(groupHoverRaw(text(raw.firGreen)), 'font-bold group-hover:underline decoration-dashed')} textStr={extractedHeader} size='xs' />
        {shouldMarkPostAsNew && <NewPostBanner />}
      </div>

      <PostDetails date={blogPost.published_at} tags={blogPost.tags} readTimeMins={readingTimeGuess} />
    </div>
  );
}

export default BlogMeta;
