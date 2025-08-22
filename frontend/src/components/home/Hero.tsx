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
  const headline = 'Martin Larsson\u00A0\u00A0';
  const subheadline = '|\u00A0\u00A0Senior Consultant';
  const paragraph = 'Building reliable systems, from games reaching millions to modern web apps and automation.';

  const containerPadding = twMerge(
    'pl-0',
    'min-[380px]:pl-3',
    'min-[400px]:pl-5',
    'min-[450px]:pl-20',
    'min-[550px]:pl-30',
    'min-[650px]:pl-40',
    'min-[750px]:pl-50',
    'min-[850px]:pl-0 min-[850px]:pr-5',
    'min-[1200px]:pr-10',
    'min-[1400px]:pr-15',
    'min-[1650px]:pr-20',
    'min-[2000px]:pr-24',
    'min-[2150px]:pr-28',
    'min-[2300px]:pr-35',
  );

  const headingSizes = twMerge(
    'text-md',
    'min-[800px]:!text-xl',
    'min-[1200px]:!text-2xl',
    'min-[1350px]:!text-3xl',
    'min-[1500px]:!text-4xl',
    'min-[1900px]:!text-5xl',
  );

  const paragraphSizes = twMerge(
    'text-xs',
    'min-[800px]:!text-sm',
    'min-[1200px]:!text-md',
  );


  const onClickViewServices = () => scrollToServicesRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className='flex flex-col justify-between min-h-screen'>
      <HeroHeader />
      <HeroBackground />
      <div className='relative flex justify-center min-[850px]:!justify-end'>
        <div className={twMerge(containerPadding, 'flex flex-col gap-y-10 w-fit p-1 pb-64')}>

          <div className='flex flex-col'>
            <div className={twMerge('flex text-shadow-lg font-bold', headingSizes)}>
              <h1 className={text(raw.rustOrange)}>{headline}</h1>
              <h1 className={text(raw.cloudHaze)}>{subheadline}</h1>
            </div>
            <p className={twMerge(text(raw.cloudHaze), paragraphSizes, 'grow text-shadow-md font-bold mt-2 ml-2')}>{paragraph}</p>
          </div>

          <div className='flex gap-x-4 pl-2'>
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
