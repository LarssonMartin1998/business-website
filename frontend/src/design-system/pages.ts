const hrefs = {
  home: '/',
  linkedIn: 'https://www.linkedin.com/in/larssonmartin1998/',
  github: 'https://git.just-a-shell.dev/larssonmartin1998',
  mastodon: 'https://social.just-a-shell.dev/@martin',
  resume: '/resume.pdf',
  podcast: 'https://shows.acast.com/anderspodcast/episodes/26-over-350-dagar-i-rad-martin-larsson-ar-disciplin',
  rss: '/rss',

  dungeonsTwo: 'https://www.minecraft.net/en-us/about-dungeons-ii',
  fhs: 'https://www.king.com/game/farmheroes',
  atlas: 'https://git.just-a-shell.dev/larssonmartin1998/atlas.git',
  mannequin: 'https://fasttravelgames.com/games/mannequin',
  citiesVr: 'https://fasttravelgames.com/games/citiesvr',
  curiousTale: 'https://fasttravelgames.com/games/thecurioustaleofthestolenpets',
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
