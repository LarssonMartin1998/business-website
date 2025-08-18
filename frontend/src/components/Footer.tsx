import { twMerge } from 'tailwind-merge';

import { text, border, from, raw, to } from 'design-system/colors';

import { LogotypeLight, Rss } from 'components/generated/index';
import { ButtonAccentInvis } from 'components/Button';
import { PageLink, AnchorLink } from 'components/Link';
import { Page, Href, hrefs } from 'design-system/pages';

function FooterPageLink({ page, children }: { page: Page; children: React.ReactNode; }) {
  return (
    <PageLink page={page}><li className='hover:underline'>{children}</li></PageLink>
  );
}


function FooterAnchorLink({ href, children }: { href: Href; children: React.ReactNode; }) {
  return (
    <AnchorLink href={href}><li className='hover:underline'>{children}</li></AnchorLink>
  );
}

function Footer() {
  return (
    <div className={twMerge(from(raw.firGreen), to(raw.firGreenLight), border('accent'), 'bg-gradient-to-b border-t-2 shadow-2xl flex flex-col justify-center min-h-80 p-8')}>

      <div className='grid grid-cols-3 gap-20 w-full' style={{ gridTemplateColumns: '1fr auto 1fr' }}>
        <div className='flex justify-end'>
          <div className='flex flex-col gap-y-4'>
            <LogotypeLight />
            <ButtonAccentInvis className='flex justify-center items-center font-bold'><Rss className='w-8 pb-2' />RSS</ButtonAccentInvis>
          </div>
        </div>
        <div className='flex items-center'>
          <div className={twMerge(text('accent'), 'flex gap-x-20')}>
            <nav>
              <ul>
                <FooterPageLink page='/'>Home</FooterPageLink>
                <FooterPageLink page='/contact'>Contact</FooterPageLink>
                <FooterPageLink page='/blog'>Blog</FooterPageLink>
              </ul>
            </nav>

            <nav>
              <ul>
                <FooterAnchorLink href={hrefs.linkedIn}>LinkedIn</FooterAnchorLink>
                <FooterAnchorLink href={hrefs.github}>Github</FooterAnchorLink>
                <FooterAnchorLink href={hrefs.mastodon}>Mastodon</FooterAnchorLink>
              </ul>
            </nav>

          </div>
        </div>
        <div></div>
      </div>

    </div>
  );
}

export default Footer;
