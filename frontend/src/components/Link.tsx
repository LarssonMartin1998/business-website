import { Link, Route } from 'react-router-dom';

import { Href, Page, RouteEntry } from 'design-system/pages';

interface PageLinkProps {
  children: React.ReactNode;
  page: Page;
}

interface AnchorLinkProps {
  children: React.ReactNode;
  className?: string;
  href: Href;
  external?: boolean;
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

function PageLink({ children, page }: PageLinkProps) {
  return (
    <Link to={page}>{children}</Link>
  );
}

function AnchorLink({ children, className, href, external = true }: AnchorLinkProps) {
  return (
    <a
      className={className}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

export { CreateTypedRoute, PageLink, AnchorLink };
