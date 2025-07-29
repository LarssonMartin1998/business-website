import HeroBackground from './HeroBackground';
import { DefaultButton, AlertButton } from './Button.tsx';
import { twMerge } from 'tailwind-merge';

interface HeroProps {
  headline: string,
  subheadline: string,
  paragraph: string,
}

function Hero({ headline, subheadline, paragraph }: HeroProps) {
  return (
    <section className='flex min-h-screen p-16 pb-32'>
      <HeroBackground />
      <div className={twMerge('relative', 'ml-auto', 'mt-auto')}>
        <div className='flex text-shadow-lg'>
          <h1 className='text-rust-orange text-8xl font-bold sm:text-6xl'>{headline}</h1>
          <h1 className='text-cloud-haze text-8xl sm:text-6xl'>{subheadline}</h1>
        </div>
        <p className='text-cloud-haze text-shadow-md text-l font-bold sm:text-l ml-2'>{paragraph}</p>
        <div className='flex gap-x-4 mt-8 p-4 pl-2'>
          <DefaultButton className='shadow-xl' size='lg'>Book a Free Call</DefaultButton>
          <AlertButton className='shadow-xl' size='lg'>View Services</AlertButton>
        </div>
      </div>
      <div className='absolute -bottom-6 left-0 w-full h-16 -skew-y-1 bg-fir-green z-20 pointer-events-none border-y-2 border-t-moss-teal border-b-granite-grey shadow-[0_-4px_14px_6px_rgba(0,0,0,0.25)]' />
    </section >
  );
}

export default Hero;
