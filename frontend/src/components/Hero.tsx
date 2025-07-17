interface HeroProps {
  headline: String,
  subheadline: String,
}

function Hero(p: HeroProps) {
  return (
    <section>
      <div className="min-h-screen bg-red-400">
        <h1 className="text-4xl font-bold sm:text-5xl">{p.headline}</h1>
        <p className="">{p.subheadline}</p>
      </div>
    </section>
  );
}

export default Hero;
