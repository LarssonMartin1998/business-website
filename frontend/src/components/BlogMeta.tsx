import { twMerge } from 'tailwind-merge';

import { BlogPost } from 'api/blog';
import { bg, border, groupHoverRaw, raw, text } from 'design-system/colors';

import { extractHeader } from 'utils/helpers';

function NewPostBanner() {
  return (
    <span
      className={twMerge(
        bg('alert'),
        text('alert'),
        'min-h-5 flex rounded-full font-bold text-xs px-2.5 w-fit justify-center items-center')}
      aria-label="New article"
    >
      New
    </span>
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
    <div className='flex flex-col gap-y-1 text-xs'>
      <div className='flex gap-x-4'>
        <time>{date.toLocaleDateString('sv-SE')}</time>
        <span>{readTimeMins} min</span>
        {splitTags.length > 0 && <div className='hidden min-[500px]:!flex gap-x-1'>
          {splitTags.map((tag, idx) => (
            <PostTag key={idx}>{tag}</PostTag>
          ))}
        </div>}
      </div>
      {splitTags.length > 0 && <div className='hidden max-[499px]:!flex gap-x-1'>
        {splitTags.map((tag, idx) => (
          <PostTag key={idx}>{tag}</PostTag>
        ))}
      </div>}
    </div>
  );
}

interface BlogMetaProps {
  headerClasses?: string;
  blogPost: BlogPost;
  applyUnderline: boolean;
}

function BlogMeta({ headerClasses, blogPost, applyUnderline, }: BlogMetaProps) {
  const extractedHeader = extractHeader(blogPost.content);

  const publishedAtTime = blogPost.published_at.getTime();
  const updatedAtTime = blogPost.updated_at.getTime();
  const latestBlogTime = Math.max(publishedAtTime, updatedAtTime);

  const now = new Date();
  const diff = Math.abs(now.getTime() - latestBlogTime);
  const daysSinceBlogDate = Math.floor(diff / (1000 * 60 * 60 * 24));
  const newPostThresholdInDays = 7;
  const shouldMarkPostAsNew = daysSinceBlogDate <= newPostThresholdInDays;

  const readSpeedAvgWordsPerMin = 200;
  const technicalComplexityPunishmentGuess = 0.7;
  const markdownSyntaxRemovalGuess = 0.90;
  const wordCount = blogPost.content.split(' ').length;
  const readingTimeGuess = Math.max(1, Math.floor(((wordCount / readSpeedAvgWordsPerMin) * technicalComplexityPunishmentGuess * markdownSyntaxRemovalGuess) + 0.999));
  return (
    <div className={twMerge(text('defaultCard'), 'select-none min-h-12 flex flex-col gap-y-1 justify-center')} >
      <div className='flex gap-x-2 items-center'>
        <h3 className={twMerge(
          groupHoverRaw(text(raw.firGreen)),
          'font-bold decoration-dashed text-left text-sm min-[640px]:!text-base',
          applyUnderline && 'group-hover:underline',
          headerClasses)}
        >
          {extractedHeader}
        </h3>
        {shouldMarkPostAsNew && <NewPostBanner />}
      </div>

      <PostDetails date={blogPost.published_at} tags={blogPost.tags} readTimeMins={readingTimeGuess} />
    </div>
  );
}

export default BlogMeta;
