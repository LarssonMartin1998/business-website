import { Link, Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { logotype } from 'assets/Logotype';
import { hoverRaw, raw, text } from 'design-system/colors';

interface HeaderListItemProps {
  name: string;
  routerPath: string;
}

function HeaderLogo() {
  return (
    <Link to='/' className='h-full flex'>
      <img className='drop-shadow-xl hover:drop-shadow-rust-orange/50' src={logotype} alt='' />
    </Link>
  );
}

function HeaderListItem({ name, routerPath }: HeaderListItemProps) {
  const colors = twMerge(text('default'), hoverRaw(text(raw.rustOrange)));
  const font = 'uppercase font-bold text-xl';

  return (
    <li className={twMerge(colors, font, 'text-shadow-lg ')}>
      <Link to={routerPath}>{name}</Link>
    </li>
  );
}

function HeroHeader() {
  const flex = 'flex gap-x-8';

  return (
    <header className='absolute w-full z-20 p-5 h-32'>
      <nav className={twMerge(flex, 'justify-center', 'h-full')}>
        <HeaderLogo />
        <ul className={twMerge(flex, 'items-center')}>
          <HeaderListItem routerPath='/contact' name='Contact' />
          <HeaderListItem routerPath='/blog' name='Blog' />
        </ul>
      </nav>

      <Outlet />
    </header>
  );
}

export default HeroHeader;
