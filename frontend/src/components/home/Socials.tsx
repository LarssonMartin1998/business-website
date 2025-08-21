import { twMerge } from 'tailwind-merge';

import { border, from, intentToRaw, raw, text, to, } from 'design-system/colors';
import { Href, hrefs } from 'design-system/pages';

import { GithubLogo, LinkedinLogo, MastodonLogo } from 'components/generated/index';
import { CardAccent } from 'components/Card';
import { AnchorLink } from 'components/Link';
import { HeadingRaw } from 'components/Heading';

interface LogoProps {
  LogoType: React.ComponentType<{ className?: string }>;
  href: Href;
}

function Logo({ LogoType, href }: LogoProps) {
  const animation = 'transition-transform duration-200 hover:scale-102 hover:-translate-y-1 hover:drop-shadow-lg';
  return (
    <AnchorLink href={href}>
      <LogoType className={twMerge(text('defaultCard'), animation, 'w-20 h-20 md:w-32 md:h-32')} />
    </AnchorLink>
  );
}

function Socials() {
  return (
    <div className={twMerge(from(raw.firGreen), to(raw.firGreenLight), border('accent'), 'bg-gradient-to-b relative border-t-2 p-8 pb-12 flex flex-col gap-y-8 items-center')}>

      <HeadingRaw textStr='Socials' className='font-bold text-center text-shadow-sm' size='lg' color={intentToRaw('text', 'accent')} />
      <CardAccent className='w-auto h-auto p-8 md:p-12'>
        <div className='flex gap-x-10 md:gap-x-20'>
          <Logo LogoType={LinkedinLogo} href={hrefs.linkedIn} />
          <Logo LogoType={GithubLogo} href={hrefs.github} />
          <Logo LogoType={MastodonLogo} href={hrefs.mastodon} />
        </div>
      </CardAccent>

    </div>
  );
}

export default Socials;
