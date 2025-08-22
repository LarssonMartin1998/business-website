import { RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

import HeroHeader from 'components/home/HeroHeader';
import HeroBackground from './HeroBackground';
import { ButtonAccent, ButtonAlert } from 'components/Button';
import { from, raw, text, to } from 'design-system/colors';

function Separator() {
  return (
    <div className={twMerge(from(raw.firGreen), to(raw.firGreenLight), 'absolute bg-gradient-to-b -bottom-6 left-0 w-full h-16 z-20 pointer-events-none border-y-2 border-t-moss-teal border-b-granite-grey shadow-[0_-4px_14px_6px_rgba(0,0,0,0.25)]')} />
  );
}

interface HeroProps {
  scrollToServicesRef: RefObject<HTMLDivElement | null>,
}

function HeroHeading({ children, className }: { children: React.ReactNode; className: string; }) {
  return (
    <h1 className={className}>
      {children}
    </h1>
  );
}

function Hero({ scrollToServicesRef }: HeroProps) {
  const headline = 'Martin Larsson\u00A0\u00A0';
  const subheadline = '|\u00A0\u00A0Senior Consultant';
  const paragraph = 'Building reliable systems, from games reaching millions to modern web apps and automation.';

  const onClickViewServices = () => scrollToServicesRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className='flex flex-col justify-between min-h-screen'>
      <HeroHeader />
      <HeroBackground />
      <div className='relative flex justify-end'>
        <div className='flex flex-col gap-y-10 w-fit pb-32 pr-24'>

          <div className='flex flex-col'>
            <div className='flex text-shadow-lg font-bold text-6xl'>
              <HeroHeading className={text(raw.rustOrange)}>{headline}</HeroHeading>
              <HeroHeading className={text(raw.cloudHaze)}>{subheadline}</HeroHeading>
            </div>
            <p className={twMerge(text(raw.cloudHaze), 'grow text-shadow-md font-bold sm:text-l mt-2 ml-2')}>{paragraph}</p>
          </div>

          <div className='flex gap-x-4 pl-2'>
            <ButtonAccent className='shadow-xl' size='lg' onClick={onClickViewServices}>View Services</ButtonAccent>
            <ButtonAlert className='shadow-xl' size='lg' buttonLink='/contact'>Work With Me</ButtonAlert>
          </div>

        </div>
      </div>
      <Separator />
    </section >
  );
}

export default Hero;
