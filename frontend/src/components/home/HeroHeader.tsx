import { Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { AnchorLink, PageLink } from 'components/Link';
import { border, from, hoverRaw, raw, text, to } from 'design-system/colors';
import { hrefs, Page } from 'design-system/pages';
import { LogotypeLight } from 'components/generated/index';

interface HeaderListItemProps {
  name: string;
  routerPath: Page;
  'aria-label': string;
}

function HeaderListItem({ name, routerPath, ...props }: HeaderListItemProps) {
  const colors = twMerge(text('accent'), hoverRaw(text(raw.emberBark)));
  const font = 'uppercase font-bold text-md sm:text-lg';

  return (
    <li className={twMerge(colors, font, 'text-shadow-lg ')}>
      <PageLink page={routerPath} {...props}>{name}</PageLink>
    </li>
  );
}

function HeroHeader() {
  return (
    <header className='w-full z-20 flex justify-center pt-8'>
      <div className={twMerge(from(raw.firGreen), to(raw.firGreenLight), border('accent'), 'bg-gradient-to-b shadow-2xl rounded-l-full rounded-r-full border-2 min-h-16 w-fit p-2.5 pr-14')}>

        <nav className='flex gap-x-6 justify-center h-fit'>
          <AnchorLink external={false} aria-label='Refresh home page' href={hrefs.home}><LogotypeLight className='w-24 h-24 drop-shadow-2xl' /></AnchorLink>
          <ul className='flex gap-x-6 sm:gap-x-8 items-center'>
            <HeaderListItem aria-label='Navigate to contact page' routerPath='/contact' name='Contact' />
            <HeaderListItem aria-label='Navigate to blog page' routerPath='/blog' name='Blog' />
          </ul>
        </nav>

        <Outlet />
      </div>
    </header >
  );
}

export default HeroHeader;
