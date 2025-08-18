import { twMerge } from 'tailwind-merge';
import { useLocation } from 'react-router-dom';

import { ButtonColor, CustomButton, } from 'components/Button';

import { bg, border, from, hover, hoverRaw, raw, text, to, } from 'design-system/colors';
import { Rss } from 'components/generated/index';
import { Page } from 'design-system/pages';
import { PageLink } from './Link';
import { LogoHorizontalShort } from 'components/generated/index';

interface HeaderCTAButtonProps {
  children: React.ReactNode;
  bg: ButtonColor;
  fg: ButtonColor;
  className?: string;
}

function HeaderCTAButton({ children, className, ...props }: HeaderCTAButtonProps) {
  const classes = twMerge(
    className,
    'rounded-lg font-bold text-xs flex justify-center items-center h-9 w-20 p-0'
  );

  return (
    <CustomButton className={classes} {...props}> {children}</CustomButton >
  );
}

function RSSButton() {
  const props = {
    bg: {
      default: `${bg(raw.birchWhite5)}`,
      hover: hoverRaw(`${bg(raw.transparent)}`),
    } as const,
    fg: {
      default: text('accent'),
    } as const,
    border: {
      default: border(raw.birchWhite20)
    },
    className: 'border-1 flex gap-x-1',
  } as const;
  return (<HeaderCTAButton {...props}><Rss className='w-4 h-4' /> RSS</HeaderCTAButton>);
}

function LetsWorkButton() {
  const alertBg = bg('alert');
  const alertText = text('alert');
  const props = {
    bg: {
      default: alertBg,
      hover: hover(alertBg),
    } as const,
    fg: {
      default: alertText,
      hover: hover(alertText),
    } as ButtonColor,
    buttonLink: '/contact'
  } as const;
  return (<HeaderCTAButton  {...props}>Lets Work</HeaderCTAButton>);
}

interface NavListEntryProps {
  children: React.ReactNode;
  page: Page;
  currentRoute: string;
}

function NavListEntry({ children, page, currentRoute }: NavListEntryProps) {
  const isCurrentRoute = currentRoute === page;

  if (isCurrentRoute) {
    return (
      <li className={twMerge(text(raw.emberBark), 'rounded-lg p-2')}>
        {children}
      </li>
    );
  }

  return (
    <PageLink page={page}>
      <li className={twMerge(bg('transparent'), `${hover(bg(raw.birchWhite))}/5`, 'rounded-lg p-2')}>
        {children}
      </li>
    </PageLink>
  );
}

function Header() {
  const location = useLocation();

  return (
    <header className={twMerge(from(raw.firGreen), to(raw.firGreenLight), border('default'), 'bg-gradient-to-b border-b-2 h-16 shadow-2xl')}>
      <div className='flex justify-between items-center h-full px-6'>
        <LogoHorizontalShort className='h-9/10 drop-shadow-2xl' />
        <div className='h-full w-fit'>
          <nav className='h-full'>
            <ul className={twMerge(text('accent'), 'flex h-full justify-center items-center font-bold uppercase gap-x-6 text-sm')}>
              <NavListEntry page='/' currentRoute={location.pathname}>Home</NavListEntry>
              <NavListEntry page='/contact' currentRoute={location.pathname}>Contact</NavListEntry>
              <NavListEntry page='/blog' currentRoute={location.pathname}>Blog</NavListEntry>
            </ul>
          </nav>
        </div>
        <div className='flex gap-x-2 h-full w-fit items-center'>
          <RSSButton />
          <LetsWorkButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
