import { heroBackground } from 'assets/HeroAssets';

function HeroBackground() {
  return (
    <picture>
      <source type="image/avif" srcSet={heroBackground.xl_avif} media="(min-width: 2150px)" />
      <source type="image/webp" srcSet={heroBackground.xl} media="(min-width: 2150px)" />

      <source type="image/avif" srcSet={heroBackground.lg_avif} media="(min-width: 1280px)" />
      <source type="image/webp" srcSet={heroBackground.lg} media="(min-width: 1280px)" />

      <source type="image/avif" srcSet={heroBackground.md} media="(min-width: 640px)" />
      <source type="image/webp" srcSet={heroBackground.md_bkp} media="(min-width: 640px)" />

      <source type="image/avif" srcSet={heroBackground.sm_avif} />
      <img
        src={heroBackground.sm}
        alt="Hero Background"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </picture>
  );
}

export default HeroBackground;
