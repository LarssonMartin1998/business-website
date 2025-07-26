import { twMerge } from "tailwind-merge";
import { logotype } from "../assets/Logotype";
import { base } from './../designSystem/colors';

interface HeaderListItemProps {
  name: string;
}

function HeaderLogo() {
  return (
    <a className='flex items-center h-full'>
      <img className='h-full w-auto' src={logotype} alt="" />
    </a>
  );
}

function HeaderListItem({ name }: HeaderListItemProps) {
  return (<li className={twMerge('justify-center', base.fg.default, 'font-bold', 'text-xl')}>
    {name}
  </li>);
}

function Header() {
  const flex = 'flex gap-x-8';
  return (<header className='absolute w-full z-20 bg-opacity-100 p-5 h-32'>
    <nav className={twMerge(flex, 'justify-center', 'h-full')}>
      <HeaderLogo />
      <ul className={twMerge(flex, 'items-center')}>
        <HeaderListItem name='Contact' />
        <HeaderListItem name='Blog' />
      </ul>
    </nav>
  </header>);
}

export default Header;
