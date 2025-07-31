import HeroHeader from 'components/home/HeroHeader';
import Hero from 'components/home/Hero'
import Clients from 'components/home/Clients';
import Services from 'components/home/Services';
import Posts from 'components/home/Posts';
import Resume from 'components/home/Resume';
import Socials from 'components/home/Socials';

function Home() {
  return (
    <>
      <HeroHeader />

      <main>
        <Hero />

        <Clients />

        <Services />

        <Posts />

        <Resume />

        <Socials />
      </main >
    </>
  );
}

export default Home;
