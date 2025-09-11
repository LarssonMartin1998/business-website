import { twMerge } from 'tailwind-merge';

import { text, border, from, raw, to } from 'design-system/colors';

import { LogotypeLight, Rss } from 'components/generated/index';
import { ButtonAccentInvis } from 'components/Button';
import { PageLink, AnchorLink } from 'components/Link';
import { Page, Href, hrefs } from 'design-system/pages';

interface BaseFooterLink {
  children: React.ReactNode;
  'aria-label': string;
}

function FooterPageLink({ page, children, ...props }: { page: Page; } & BaseFooterLink) {
  return (
    <PageLink page={page} {...props}><li className='hover:underline'>{children}</li></PageLink>
  );
}


function FooterAnchorLink({ href, children, ...props }: { href: Href; } & BaseFooterLink) {
  return (
    <AnchorLink href={href} {...props}><li className='hover:underline'>{children}</li></AnchorLink>
  );
}

function LogotypeRss({ className }: { className?: string; }) {
  return (
    <div className={twMerge('flex flex-col gap-y-4 h-9/10', className)}>
      <PageLink aria-label='Navigate to home page' page='/'><LogotypeLight /></PageLink>
      <ButtonAccentInvis aria-label='Subscribe to RSS feed' buttonLink={hrefs.rss} size='md' className='flex justify-center items-center font-bold'><Rss className='w-8 pb-2' />RSS</ButtonAccentInvis>
    </div>
  );
}
function Navigation() {
  return (
    <div className='flex items-center'>
      <div className={twMerge(text('accent'), 'flex gap-x-20')}>
        <nav>
          <ul>
            <FooterPageLink aria-label='Navigate to home page' page='/'>Home</FooterPageLink>
            <FooterPageLink aria-label='Navigate to contact page' page='/contact'>Contact</FooterPageLink>
            <FooterPageLink aria-label='Navigate to blog page' page='/blog'>Blog</FooterPageLink>
          </ul>
        </nav>

        <nav>
          <ul>
            <FooterAnchorLink aria-label='Open external page LinkedIn' href={hrefs.linkedIn}>LinkedIn</FooterAnchorLink>
            <FooterAnchorLink aria-label='Open external page Github' href={hrefs.github}>Github</FooterAnchorLink>
            <FooterAnchorLink aria-label='Open external page Mastodon' href={hrefs.mastodon}>Mastodon</FooterAnchorLink>
          </ul>
        </nav>

      </div>
    </div>);
}

function Footer() {
  return (
    <div className={twMerge(from(raw.firGreen), to(raw.firGreenLight), border('accent'), 'bg-gradient-to-b border-t-2 shadow-2xl flex flex-col justify-center min-h-80 p-8')}>

      <div className='hidden lg:grid grid-cols-3 gap-16 xl:gap-30 w-full' style={{ gridTemplateColumns: '1fr auto 1fr' }}>
        <div className='flex justify-end items-center'>
          <LogotypeRss className='pr-16 xl:pr-30' />
          <div className={twMerge(border(raw.cloudHaze30), 'w-1 h-9/10 border-r-1')}> </div>
        </div>

        <Navigation />
        <div></div>
      </div>

      <div className='flex lg:hidden flex-col gap-y-16 py-8 justify-center items-center'>
        <LogotypeRss />
        <div className={twMerge(border(raw.cloudHaze30), 'w-80 h-1 border-t-1')}> </div>
        <Navigation />
      </div>

    </div>
  );
}

export default Footer;
