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

function Hero({ scrollToServicesRef }: HeroProps) {
  const headline = 'Martin Larsson';
  const separator = '\u00A0\u00A0|\u00A0\u00A0';
  const subheadline = 'Senior Consultant';
  const paragraph = 'Building reliable systems, from games reaching millions to modern web apps and automation.';

  const containerPadding = twMerge(
    'pl-0',
    'min-[1280px]:pr-10',
    'min-[1500px]:pr-20',
    'min-[2000px]:pr-24',
    'min-[2150px]:pr-26',
    'min-[2320px]:pr-34',
  );

  const headingSizes = twMerge(
    'text-md',
    'min-[800px]:!text-xl',
    'min-[1280px]:!text-2xl',
    'min-[1350px]:!text-3xl',
    'min-[1500px]:!text-4xl',
    'min-[1975px]:!text-5xl',
    'min-[2240px]:!text-6xl',
  );

  const paragraphSizes = twMerge(
    'text-xs',
    'min-[1280px]:!text-s',
  );

  const onClickViewServices = () => scrollToServicesRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className='flex flex-col justify-between min-h-screen it'>
      <HeroHeader />
      <HeroBackground />
      <div className='relative flex justify-center min-[1280px]:!justify-end'>
        <div className={twMerge(containerPadding, 'flex flex-col gap-y-6 w-fit p-2 pb-16 min-[1280px]:!pb-64')}>

          <div className='hidden min-[1280px]:!flex flex-col'>
            <div className={twMerge('flex text-shadow-lg font-bold', headingSizes)}>
              <h1 className={text(raw.rustOrange)}>{headline}</h1>
              <h1 className={text(raw.cloudHaze)}>{separator + subheadline}</h1>
            </div>
            <p className={twMerge(text(raw.cloudHaze), paragraphSizes, 'grow text-shadow-md font-bold mt-2 min-[1280px]:!ml-2')}>{paragraph}</p>
          </div>

          <div className='hidden min-[640px]:!flex min-[1280px]:!hidden flex-col w-fit max-w-150 text-shadow-md font-bold text-justify'>
            <div className='flex'>
              <h1 className={twMerge(text(raw.rustOrange), 'text-4xl')}>{headline}</h1>
              <h1 className={twMerge(text(raw.cloudHaze), 'text-4xl')}>{separator + subheadline}</h1>
            </div>
            <p className={twMerge(text(raw.cloudHaze), paragraphSizes, 'mt-2 min-[1280px]:!ml-2')}>{paragraph}</p>
          </div>

          <div className='flex min-[640px]:!hidden flex-col w-fit max-w-90 text-shadow-md font-bold text-justify'>
            <h1 className={twMerge(text(raw.rustOrange), 'text-2xl')}>{headline}</h1>
            <h1 className={twMerge(text(raw.cloudHaze), 'text-2xl')}>{subheadline}</h1>
            <p className={twMerge(text(raw.cloudHaze), paragraphSizes, 'mt-2 min-[1280px]:!ml-2')}>{paragraph}</p>
          </div>

          <div className='flex gap-x-4 min-[1280px]:pl-2'>
            <ButtonAccent className='shadow-xl' size='md' onClick={onClickViewServices}>View Services</ButtonAccent>
            <ButtonAlert className='shadow-xl' size='md' buttonLink='/contact'>Work With Me</ButtonAlert>
          </div>

        </div>
      </div>
      <Separator />
    </section >
  );
}

export default Hero;
