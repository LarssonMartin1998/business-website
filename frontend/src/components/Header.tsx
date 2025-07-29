import { twMerge } from "tailwind-merge";
import { logotype } from "../assets/Logotype";
import { base, hover } from './../designSystem/colors';

interface HeaderListItemProps {
  name: string;
}

function HeaderLogo() {
  return (
    <a className='flex items-center h-full'>
      <img className='h-full w-auto drop-shadow-xl hover:drop-shadow-rust-orange/50' src={logotype} alt="" />
    </a>
  );
}

function HeaderListItem({ name }: HeaderListItemProps) {
  return (<li className={twMerge(base.fg.default, 'justify-center uppercase text-shadow-lg font-bold text-xl hover:text-rust-orange')}>
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
