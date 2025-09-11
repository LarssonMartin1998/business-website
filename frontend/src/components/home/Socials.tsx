import { twMerge } from 'tailwind-merge';

import { border, from, raw, text, to, } from 'design-system/colors';
import { Href, hrefs } from 'design-system/pages';

import { GithubLogo, LinkedinLogo, MastodonLogo } from 'components/generated/index';
import { CardAccent } from 'components/Card';
import { AnchorLink } from 'components/Link';
import SectionHeading from 'components/home/SectionHeading';

interface LogoProps {
  LogoType: React.ComponentType<{ className?: string }>;
  href: Href;
  'aria-label': string;
}

function Logo({ LogoType, href, ...props }: LogoProps) {
  const animation = 'transition-transform duration-200 hover:scale-102 hover:-translate-y-1 hover:drop-shadow-lg';
  return (
    <AnchorLink href={href} {...props}>
      <LogoType className={twMerge(text('defaultCard'), animation, 'w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32')} />
    </AnchorLink>
  );
}

function Socials() {
  return (
    <section className={twMerge(from(raw.firGreen), to(raw.firGreenLight), border('accent'), 'bg-gradient-to-b relative border-t-2 p-8 pb-12 flex flex-col gap-y-8 items-center')}>

      <SectionHeading className={text('accent')}>Socials</SectionHeading>
      <CardAccent className='w-auto h-auto p-6 sm:p-9 md:p-12'>
        <div className='flex gap-x-6 sm: sm:gap-x-12 md:gap-x-20'>
          <Logo aria-label='Open external page LinkedIn' LogoType={LinkedinLogo} href={hrefs.linkedIn} />
          <Logo aria-label='Open external page Github' LogoType={GithubLogo} href={hrefs.github} />
          <Logo aria-label='Open external page Mastodon' LogoType={MastodonLogo} href={hrefs.mastodon} />
        </div>
      </CardAccent>

    </section>
  );
}

export default Socials;
