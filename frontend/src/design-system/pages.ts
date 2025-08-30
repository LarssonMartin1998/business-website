const hrefs = {
  linkedIn: 'https://www.linkedin.com/in/martin-larsson-b26200137/',
  github: 'https://www.github.com/LarssonMartin1998',
  mastodon: 'https://social.just-a-shell.dev/@martin',
  resume: '/resume.pdf',
  rss: '/rss',
} as const;
type Href = typeof hrefs[keyof typeof hrefs];

const pages = [
  '/',
  '/contact',
  '/blog',
  '/blog/post',
] as const;
type Page = typeof pages[number];

type SplitIntoSegments<S extends string, D extends string> =
  S extends '' ?
  [] :
  S extends `${infer T}${D}${infer U} ` ? [T, ...SplitIntoSegments<U, D>] : [S];

type AllSegments = Page extends infer P ?
  SplitIntoSegments<P & string, '/'>[number] :
  never;

type RouteEntry = '/' | '*' | Exclude<AllSegments, ''>;

export { pages, hrefs, };
export type { Page, Href, RouteEntry };
