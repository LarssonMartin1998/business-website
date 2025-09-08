import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useLocation, Location } from 'react-router-dom';

import { bg, border, from, hover, hoverRaw, raw, text, to, } from 'design-system/colors';
import { Href, hrefs, Page } from 'design-system/pages';

import { ButtonColor, CustomButton, } from 'components/Button';
import { PageLink } from 'components/Link';
import AnimatedHamburgerIcon from 'components/AnimatedHamburgerIcon';
import { LogoHorizontalShort } from 'components/generated/index';
import { Rss } from 'components/generated/index';

interface HeaderProps {
  location: Location;
}

interface HeaderCTAButtonProps {
  children: React.ReactNode;
  'aria-label': string;
  buttonLink?: Page | Href;
  bg: ButtonColor;
  fg: ButtonColor;
  className?: string;
}

interface NavListEntryProps {
  children: React.ReactNode;
  'aria-label': string;
  page: Page;
  currentRoute: string;
}

function isCurrentRoute(currentRoute: string, page: Page): boolean {
  return currentRoute === page;
}

function headerColor(): string {
  return twMerge(from(raw.firGreen), to(raw.firGreenLight), 'bg-gradient-to-b');
}

function HeaderCTAButton({ children, className, ...props }: HeaderCTAButtonProps) {
  const classes = twMerge(
    className,
    'rounded-lg font-bold text-xs flex justify-center items-center h-9 w-20 max-[640px]:!w-24 p-0'
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
    buttonLink: hrefs.rss,
  } as const;
  return (
    <HeaderCTAButton aria-label='Subscribe to RSS feed' {...props}><Rss className='w-4 h-4' /> RSS</HeaderCTAButton>
  );
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
  return (<HeaderCTAButton aria-label='Work With Me CTA - Navigate to contact page' {...props}>Lets Work</HeaderCTAButton>);
}

function WideNavListEntry({ children, page, currentRoute, ...props }: NavListEntryProps) {
  if (isCurrentRoute(currentRoute, page)) {
    return (
      <li className={twMerge(text(raw.emberBark), 'cursor-default select-none rounded-lg p-2')}>
        {children}
      </li>
    );
  }

  return (
    <PageLink page={page} {...props}>
      <li className={twMerge(bg('transparent'), 'hover:bg-black/5 rounded-lg p-2')}>
        {children}
      </li>
    </PageLink>
  );
}

function HamburgerNavListEntry({ children, currentRoute, page, ...props }: NavListEntryProps) {
  const liStyling = twMerge(
    border(raw.cloudHaze10),
    'border-b-1 first:border-t-1 uppercase font-bold'
  );
  const flex = 'flex justify-start items-center pl-2 ';

  if (isCurrentRoute(currentRoute, page)) {
    return (
      <li
        className={
          twMerge(
            text(raw.emberBark),
            liStyling,
            flex,
            'select-none cursor-default'
          )}
      >
        {children}
      </li>
    );
  }

  return (
    <li className={twMerge(text('accent'), liStyling, 'hover:bg-black/5')}>
      <PageLink
        className={twMerge(flex, 'w-full h-full')}
        page={page}
        {...props}
      >
        {children}
      </PageLink >
    </li >
  );
}

function HamburgerHeader({ location }: HeaderProps) {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!isExpanded);

  return (
    <div className={twMerge('block min-[640px]:!hidden', headerColor(), border('default'), 'border-b-2 shadow-2xl')}>
      <div className='flex flex-col justify-start'>
        <div className='h-16 py-1'>
          <div className='flex justify-around items-center h-full'>
            <LogoHorizontalShort className='select-none h-9/10 drop-shadow-2xl z-10' />
            <div></div>
            <button
              aria-label='Toggle navigation menu'
              aria-expanded={isExpanded}
              onClick={toggleExpanded}
              className={twMerge(text('accent'), 'mt-1 h-12 w-12 flex justify-center items-center rounded-lg hover:bg-black/5')}
            >
              <AnimatedHamburgerIcon isExpanded={isExpanded} />
            </button>
          </div>
        </div>
        {isExpanded && <nav className='flex justify-center'>
          <ul className='w-7/10 mt-2 [&>li]:h-16'>
            <HamburgerNavListEntry aria-label='Navigate to home page' page={'/'} currentRoute={location.pathname}>Home</HamburgerNavListEntry>
            <HamburgerNavListEntry aria-label='Navigate to contact page' page={'/contact'} currentRoute={location.pathname}>Contact</HamburgerNavListEntry>
            <HamburgerNavListEntry aria-label='Navigate to blog page' page={'/blog'} currentRoute={location.pathname}>Blog</HamburgerNavListEntry>

            <li className='flex justify-between items-center'>
              <RSSButton />
              <LetsWorkButton />
            </li>
          </ul>
        </nav>}
      </div>
    </div>
  );
}

function WideHeader({ location }: HeaderProps) {
  return (
    <div className={twMerge('hidden min-[640px]:!block', headerColor(), border('default'), 'border-b-2 h-16 shadow-2xl')}>
      <div className='flex justify-between items-center h-full px-6'>
        <LogoHorizontalShort className='select-none h-9/10 drop-shadow-2xl' />
        <div className='h-full w-fit'>
          <nav className='h-full'>
            <ul className={twMerge(text('accent'), 'flex h-full justify-center items-center font-bold uppercase gap-x-6 text-sm')}>
              <WideNavListEntry aria-label='Navigate to home page' page='/' currentRoute={location.pathname}>Home</WideNavListEntry>
              <WideNavListEntry aria-label='Navigate to contact page' page='/contact' currentRoute={location.pathname}>Contact</WideNavListEntry>
              <WideNavListEntry aria-label='Navigate to blog page' page='/blog' currentRoute={location.pathname}>Blog</WideNavListEntry>
            </ul>
          </nav>
        </div>
        <div className='flex gap-x-2 h-full w-fit items-center'>
          <RSSButton />
          <LetsWorkButton />
        </div>
      </div>
    </div>
  );
}

function Header() {
  const location = useLocation();

  return (
    <header>
      <HamburgerHeader location={location} />
      <WideHeader location={location} />
    </header>
  );
}

export default Header;
