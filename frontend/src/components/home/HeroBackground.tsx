import { heroBackground } from 'assets/HeroAssets.ts';

function HeroBackground() {
  return (

    <picture>
      {/* <source srcSet={heroBackground.mobile} media='(max-width: 640px)' /> */}
      {/* <source srcSet={heroBackground.tablet} media='(max-width: 1024px)' /> */}
      <img
        src={heroBackground.desktop}
        alt='Hero Background'
        className='absolute inset-0 w-full h-full object-cover'
      />
    </picture>

  );
}

export default HeroBackground;
