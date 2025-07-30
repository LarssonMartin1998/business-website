import { twMerge } from 'tailwind-merge';
import { logotype } from 'assets/Logotype';
import { hoverRaw, raw, text } from 'design-system/colors';

interface HeaderListItemProps {
  name: string;
}

function HeaderLogo() {
  return (
    <img className='drop-shadow-xl hover:drop-shadow-rust-orange/50' src={logotype} alt='' />
  );
}

function HeaderListItem({ name }: HeaderListItemProps) {
  const colors = twMerge(text('default'), hoverRaw(text(raw.rustOrange)));
  const font = 'uppercase font-bold text-xl';

  return (
    <li className={twMerge(colors, font, 'text-shadow-lg ')}>
      {name}
    </li>
  );
}

function Header() {
  const flex = 'flex gap-x-8';

  return (
    <header className='absolute w-full z-20 p-5 h-32'>
      <nav className={twMerge(flex, 'justify-center', 'h-full')}>
        <HeaderLogo />
        <ul className={twMerge(flex, 'items-center')}>
          <HeaderListItem name='Contact' />
          <HeaderListItem name='Blog' />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
