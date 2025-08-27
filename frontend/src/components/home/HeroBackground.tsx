import { heroBackground } from 'assets/HeroAssets.ts';

function HeroBackground() {
  return (

    <picture>
      <source type="image/webp" srcSet={heroBackground.xl} media='(min-width: 2150px)' />
      <source type="image/webp" srcSet={heroBackground.lg} media='(min-width: 1280px)' />
      <source type="image/webp" srcSet={heroBackground.md} media='(min-width: 640px)' />
      <img
        src={heroBackground.sm}
        alt='Hero Background'
        fetchPriority='high'
        decoding='async'
        className='absolute inset-0 w-full h-full object-cover'
      />
    </picture>

  );
}

export default HeroBackground;
