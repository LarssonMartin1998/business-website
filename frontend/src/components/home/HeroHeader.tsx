import { Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { PageLink } from 'components/Link';
import { logotype } from 'assets/Logotype';
import { bg, border, hoverRaw, raw, text } from 'design-system/colors';
import { Page } from 'design-system/pages';

interface HeaderListItemProps {
  name: string;
  routerPath: Page;
}

function HeaderLogo() {
  return (
    <img className='h-full drop-shadow-xl' src={logotype} alt='' />
  );
}

function HeaderListItem({ name, routerPath }: HeaderListItemProps) {
  const colors = twMerge(text('accent'), hoverRaw(text(raw.emberBark)));
  const font = 'uppercase font-bold text-lg';

  return (
    <li className={twMerge(colors, font, 'text-shadow-lg ')}>
      <PageLink page={routerPath}>{name}</PageLink>
    </li>
  );
}

function HeroHeader() {
  return (
    <header className='w-full z-20 flex justify-center pt-5'>
      <div className={twMerge(bg('accent'), border('accent'), 'shadow-2xl rounded-l-full rounded-r-full border-2 min-h-16 w-fit p-2.5 pr-12')}>

        <nav className='flex gap-x-6 justify-center h-20'>
          <HeaderLogo />
          <ul className='flex gap-x-8 items-center'>
            <HeaderListItem routerPath='/contact' name='Contact' />
            <HeaderListItem routerPath='/blog' name='Blog' />
          </ul>
        </nav>

        <Outlet />
      </div>
    </header >
  );
}

export default HeroHeader;
