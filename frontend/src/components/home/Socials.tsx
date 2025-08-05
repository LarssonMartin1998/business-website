import { twMerge } from 'tailwind-merge';

import { bg, text, } from 'design-system/colors';
import { Href, hrefs } from 'design-system/pages';

import { GithubLogo, LinkedinLogo, MastodonLogo } from 'components/generated/index';
import { CardDefault } from 'components/Card';
import { AnchorLink } from 'components/Link';

interface LogoProps {
  LogoType: React.ComponentType<{ className?: string }>;
  href: Href;
}

interface SkewProps {
  className?: string;
}

function Logo({ LogoType, href }: LogoProps) {
  const animation = 'transition-transform duration-200 hover:scale-102 hover:-translate-y-1 hover:drop-shadow-lg';
  return (
    <AnchorLink href={href}>
      <LogoType className={twMerge(text('defaultCard'), animation, 'w-32 h-32 ')} />
    </AnchorLink>
  );
}

function Skew({ className }: SkewProps) {
  const shadow = 'shadow-[0_-3px_5px_3px_rgba(0,0,0,0.185)]';
  const shared = 'absolute left-0 w-full -skew-y-2 border-t-2';
  const classes = twMerge(shadow, shared, className);

  return (
    <div className={classes} />
  );
}

function SkewedBackground() {
  return (<Skew className={twMerge(bg('accent'), 'h-100 -top-8 z-0 border-t-moss-teal ')} />);
}

function SkewedBase() {
  return (
    <div className='relative h-40 overflow-hidden'>
      <Skew className={twMerge(bg('alert'), 'h-full -bottom-10 z-10 border-t-ember-bark')} />
    </div>
  );
}

function Socials() {
  return (
    <div className='relative'>
      <SkewedBackground />
      <div className={'relative p-4 pt-0 flex flex-col gap-y-8 items-center'}>
        <h2 className={twMerge(text('accent'), 'font-bold text-center text-5xl text-shadow-sm')}>Socials</h2>
        <CardDefault className=' w-auto h-auto p-12'>
          <div className='flex gap-x-20'>
            <Logo LogoType={LinkedinLogo} href={hrefs.linkedIn} />
            <Logo LogoType={GithubLogo} href={hrefs.github} />
            <Logo LogoType={MastodonLogo} href={hrefs.mastodon} />
          </div>
        </CardDefault>
      </div>
      <SkewedBase />
    </div>
  );
}

export default Socials;
