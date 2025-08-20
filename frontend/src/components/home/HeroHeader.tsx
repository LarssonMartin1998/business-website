import { Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { PageLink } from 'components/Link';
import { border, from, hoverRaw, raw, text, to } from 'design-system/colors';
import { Page } from 'design-system/pages';
import { LogotypeLight } from 'components/generated/index';

interface HeaderListItemProps {
  name: string;
  routerPath: Page;
}

function HeaderListItem({ name, routerPath }: HeaderListItemProps) {
  const colors = twMerge(text('accent'), hoverRaw(text(raw.emberBark)));
  const font = 'uppercase font-bold text-md sm:text-lg';

  return (
    <li className={twMerge(colors, font, 'text-shadow-lg ')}>
      <PageLink page={routerPath}>{name}</PageLink>
    </li>
  );
}

function HeroHeader() {
  return (
    <header className='w-full z-20 flex justify-center pt-8'>
      <div className={twMerge(from(raw.firGreen), to(raw.firGreenLight), border('accent'), 'bg-gradient-to-b shadow-2xl rounded-l-full rounded-r-full border-2 min-h-16 w-fit p-2.5 pr-14')}>

        <nav className='flex gap-x-6 justify-center h-fit'>
          <LogotypeLight className='w-24 h-24 drop-shadow-2xl' />
          <ul className='flex gap-x-6 sm:gap-x-8 items-center'>
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
