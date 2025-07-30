import { twMerge } from "tailwind-merge";

import { bg, text, border, raw } from "design-system/colors";

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

function fetchLatestPosts(): ReadonlyArray<Readonly<PostEntryProps>> {
  // TODO: Read posts from API
  return [ // Temp data
    {
      header: 'Header',
      bread: 'Lorem, ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus vitae ante sed lobortis. Sed posuere hendrerit purus, eu cursus purus facilisis eget. Quisque sodales vitae lacus pretium blandit...',
    },
    {
      header: 'Header',
      bread: 'Lorem, ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus vitae ante sed lobortis. Sed posuere hendrerit purus, eu cursus purus facilisis eget. Quisque sodales vitae lacus pretium blandit...',
    },
    {
      header: 'Header',
      bread: 'Lorem, ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus vitae ante sed lobortis. Sed posuere hendrerit purus, eu cursus purus facilisis eget. Quisque sodales vitae lacus pretium blandit...',
    },
  ];
}

function Posts() {
  const posts = fetchLatestPosts();

  // The firGreen text is based on the section above accent background.
  // Could couple it against it, but really feel like that is overkill.
  const highlight = 'default';
  const insetShadow = 'shadow-[inset_0_10px_20px_rgba(0,0,0,0.30)]';
  return (
    <div className={twMerge(bg(highlight), border(highlight), insetShadow, 'relative border-y-2 flex flex-col min-h-64 p-8 pb-12')}>
      <h2 className={twMerge(text(raw.firGreen), 'font-bold text-center text-5xl text-shadow-sm')}>Posts</h2>
      <ul className='flex justify-center gap-x-20 mt-10'>
        {posts.map(({ header, bread }, idx) => (
          <PostEntry key={idx} header={header} bread={bread} />
        ))}
      </ul>
    </div>);
}

export default Posts;
