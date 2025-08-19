import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { bg, intentToRaw, text } from 'design-system/colors';
import { hrefs } from 'design-system/pages';

import Hero from 'components/home/Hero';
import Clients from 'components/home/Clients';
import Services from 'components/Services';
import Posts from 'components/home/Posts';
import Resume from 'components/home/Resume';
import Socials from 'components/home/Socials';
import Main from 'components/Main';
import { ButtonAccent, ButtonAccentInvis } from 'components/Button';
import { HeadingRaw } from 'components/Heading';

function Home() {
  const scrollToServicesRef = useRef<HTMLDivElement>(null);
  const servicesIntent = 'accent';

  return (
    <>
      <Hero scrollToServicesRef={scrollToServicesRef} />

      <Main>
        <Clients />

        <div ref={scrollToServicesRef} className={twMerge(bg(servicesIntent), 'flex flex-col items-center p-8')}>

          <Services
            highlight={servicesIntent}
            title={
              <HeadingRaw className='font-bold text-shadow-sm text-center' textStr='Services' size='lg' color={intentToRaw('text', servicesIntent)} />}
            cta={
              <>
                <p className={twMerge(text(servicesIntent), 'font-bold')}>{'Ready to discuss your project?'}</p>
                <div className='flex gap-x-4 pt-8'>
                  <ButtonAccent buttonLink={hrefs.github}>See My Work</ButtonAccent>
                  <ButtonAccentInvis buttonLink='/contact'>Get in Touch</ButtonAccentInvis>
                </div>
              </>
            } />

        </div>

        <Posts />

        <Resume />

        <Socials />
      </Main >
    </>
  );
}

export default Home;
