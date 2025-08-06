import { Link, Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { logotype } from 'assets/Logotype';
import { bg, border, hoverRaw, raw, text } from 'design-system/colors';

interface HeaderListItemProps {
  name: string;
  routerPath: string;
}

function HeaderLogo() {
  return (
    <img className='h-full drop-shadow-xl' src={logotype} alt='' />
  );
}

function HeaderListItem({ name, routerPath }: HeaderListItemProps) {
  const colors = twMerge(text('accent'), hoverRaw(text(raw.emberBark)));
  const font = 'uppercase font-bold text-xl';

  return (
    <li className={twMerge(colors, font, 'text-shadow-lg ')}>
      <Link to={routerPath}>{name}</Link>
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
