import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { bg, raw, text } from 'design-system/colors';
import { hrefs } from 'design-system/pages';

import Hero from 'components/home/Hero';
import Clients from 'components/home/Clients';
import Services from 'components/Services';
import Posts from 'components/home/Posts';
import Resume from 'components/home/Resume';
import Socials from 'components/home/Socials';
import Main from 'components/Main';
import { ButtonAccent, ButtonAccentInvis } from 'components/Button';
import SectionHeading from 'components/home/SectionHeading';

function Home() {
  const scrollToServicesRef = useRef<HTMLDivElement>(null);
  const servicesIntent = 'accent';

  return (
    <>
      <Hero scrollToServicesRef={scrollToServicesRef} />

      <Main className={bg(raw.firGreenLight)}>
        <Clients />

        <div ref={scrollToServicesRef} className={twMerge(bg(servicesIntent), 'flex flex-col items-center p-8')}>

          <Services
            highlight={servicesIntent}
            title={
              <SectionHeading className={text('accent')}>Services</SectionHeading>
            }
            cta={
              <>
                <p className={twMerge(text(servicesIntent), 'font-bold')}>{'Ready to discuss your project?'}</p>
                <div className='flex gap-x-4 pt-8'>
                  <ButtonAccent buttonLink={hrefs.github}>See My Work</ButtonAccent>
                  <ButtonAccentInvis animated buttonLink='/contact' pageHash='contactForm'><span className='z-10'>Get in Touch</span></ButtonAccentInvis>
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
