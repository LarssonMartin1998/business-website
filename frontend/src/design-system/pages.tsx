import { Route, Link } from 'react-router-dom';

type Page = '/' | '/contact' | '/blog' | '/blog/post';

type SplitIntoSegments<S extends string, D extends string> =
  S extends '' ?
  [] :
  S extends `${infer T}${D}${infer U}` ? [T, ...SplitIntoSegments<U, D>] : [S];
type AllSegments = Page extends infer P ?
  SplitIntoSegments<P & string, '/'>[number] :
  never;

type RouteEntry = '/' | '*' | Exclude<AllSegments, ''>;

interface PageLinkProps {
  children: React.ReactNode;
  page: Page;
}

type RouteTypedProps =
  // Grouping route (no element, just children)
  | { path: RouteEntry; children: React.ReactNode; element?: never; index?: false }
  // Layout route (element and children)
  | { path: RouteEntry; element: React.ReactNode; children: React.ReactNode; index?: false }
  // Leaf route (element, no children)
  | { path: RouteEntry; element: React.ReactNode; children?: never; index?: false }
  // Index route (element, no path, no children)
  | { index: true; element: React.ReactNode; path?: never; children?: never };

function PageLink({ children, page }: PageLinkProps) {
  return (
    <Link to={page}>{children}</Link>
  );
}

function CreateTypedRoute(props: RouteTypedProps) {
  if ('index' in props && props.index) {
    return <Route index element={props.element} />;
  }

  if ('children' in props && props.children) {
    if ('element' in props && props.element) {

      return (
        <Route path={props.path} element={props.element}>
          {props.children}
        </Route>
      );
    }

    return (
      <Route path={props.path}>
        {props.children}
      </Route>
    );
  }

  return <Route path={props.path} element={props.element} />;
}

export { PageLink, CreateTypedRoute };
export type { Page };
