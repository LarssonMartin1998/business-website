import Hero from 'components/home/Hero';
import Clients from 'components/home/Clients';
import Services from 'components/home/Services';
import Posts from 'components/home/Posts';
import Resume from 'components/home/Resume';
import Socials from 'components/home/Socials';
import { useRef } from 'react';

function Home() {
  const scrollToServicesRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Hero scrollToServicesRef={scrollToServicesRef} />

      <main>
        <Clients />

        <Services scrollToServicesRef={scrollToServicesRef} />

        <Posts />

        <Resume />

        <Socials />
      </main >
    </>
  );
}

export default Home;
