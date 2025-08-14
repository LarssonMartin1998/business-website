import Hero from 'components/home/Hero';
import Clients from 'components/home/Clients';
import Services from 'components/home/Services';
import Posts from 'components/home/Posts';
import Resume from 'components/home/Resume';
import Socials from 'components/home/Socials';
import { useRef } from 'react';
import Main from 'components/Main';

function Home() {
  const scrollToServicesRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Hero scrollToServicesRef={scrollToServicesRef} />

      <Main>
        <Clients />

        <Services scrollToServicesRef={scrollToServicesRef} />

        <Posts />

        <Resume />

        <Socials />
      </Main >
    </>
  );
}

export default Home;
