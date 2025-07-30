import { twMerge } from 'tailwind-merge';
import HeroBackground from './HeroBackground';
import { ButtonAccent, ButtonAlert } from 'components/Button';
import { bg, raw, text } from 'design-system/colors';

function SkewSeparator() {
  return (
    <div className={twMerge(bg('accent'), 'absolute -bottom-6 left-0 w-full h-16 -skew-y-1 z-20 pointer-events-none border-y-2 border-t-moss-teal border-b-granite-grey shadow-[0_-4px_14px_6px_rgba(0,0,0,0.25)]')} />
  );
}

function Hero() {
  const headline = 'Marsson\u00A0\u00A0';
  const subheadline = '|\u00A0\u00A0Senior Consultant';
  const paragraph = 'I help teams build cool shit in C++, C, Zig, Rust and other wack languages.'

  const orangeText = text(raw.rustOrange);
  const whiteText = text(raw.cloudHaze);
  const headerSize = 'text-8xl sm:text-6xl';

  return (
    <section className='flex min-h-screen pr-48 pb-32'>
      <HeroBackground />
      <div className='relative ml-auto mt-auto'>
        <div className='flex text-shadow-lg'>
          <h1 className={twMerge(orangeText, headerSize, 'font-bold')}>{headline}</h1>
          <h1 className={twMerge(whiteText, headerSize)}>{subheadline}</h1>
        </div>
        <p className={twMerge(whiteText, 'text-shadow-md font-bold sm:text-l mt-2 ml-2')}>{paragraph}</p>
        <div className='flex gap-x-4 mt-8 p-4 pl-2'>
          <ButtonAccent className='shadow-xl' size='lg'>Book a Free Call</ButtonAccent>
          <ButtonAlert className='shadow-xl' size='lg'>View Services</ButtonAlert>
        </div>
      </div>
      <SkewSeparator />
    </section >
  );
}

export default Hero;
