import { RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

import { CogWheels, Layers, Lightbulb } from 'components/generated/index';
import { ListCardDefault } from 'components/Card';
import { bg, intentToRaw, RawColor, splitTwColor, text } from 'design-system/colors';
import { ButtonAccent, ButtonAccentInvis } from 'components/Button';
import { hrefs } from 'design-system/pages';
import { HeadingRaw } from 'components/Heading';

interface ServiceProps {
  Icon: React.ComponentType<{ className?: string }>;
  bgColRaw: RawColor,
  header: string;
  bread: string;
  className: string;
}

function ServiceCard({ Icon, bgColRaw, header, bread, className }: ServiceProps) {
  const mimickBgTextCol = text(bgColRaw);
  const iconProps = {
    className: twMerge(mimickBgTextCol, 'w-24 h-24', className)
  } as const;

  return (
    <ListCardDefault className='w-64 min-h-80 p-4 flex flex-col text-center justify-start items-center'>
      <div className='flex flex-col items-center'>
        <Icon {...iconProps} />
        <h3 className={twMerge(mimickBgTextCol, 'font-bold mt-2')}>{header}</h3>
      </div>
      <p className={twMerge(text('default'), 'mt-4 min-h-24')}>{bread}</p>
    </ListCardDefault>
  );
}

type ServiceTuple = [React.ComponentType<{ className?: string }>, string, string, string?];
interface ServicesGroupProps {
  services: ReadonlyArray<Readonly<ServiceTuple>>;
  bgColRaw: RawColor,
}

interface ServicesProps {
  scrollToServicesRef: RefObject<HTMLDivElement | null>,
}

function ServicesGroup({ services, bgColRaw }: ServicesGroupProps) {
  return (
    <ul className='flex mt-10 gap-x-14'>
      {services.map(([Icon, header, bread, className]) => (
        <ServiceCard key={header} Icon={Icon} bgColRaw={bgColRaw} header={header} bread={bread} className={className ?? ""} />
      ))}
    </ul>
  );
}

function Services({ scrollToServicesRef }: ServicesProps) {
  const header = 'Services';
  const paragraph = 'I help bring your ideas to market. I’ve shipped multiplayer and console games and worked on large-scale live services reaching millions of players (Farm Heroes Saga). My expertise spans from highly performant Game Engine development, web development with React and Go to low-level programming with C, C++, and Zig, alongside deep Linux experience. I can also help with automation, CI/CD, and hosting.';
  const cta = 'Ready to discuss your project?';

  const servicesGroupProps = {
    services: [
      [
        CogWheels,
        'Reliable Systems',
        'I design robust, maintainable solutions that scale with your business for long-term value.',
      ],
      [
        Layers,
        'Full-Stack Expertise',
        'From backend to frontend, Game Engine to networked Gameplay, automated tools, and deployment.',
        'p-2',
      ],
      [
        Lightbulb,
        'From Idea to Delivery',
        'I help bring your product vision to life. Clearly, efficiently, and with full execution from start to finish.',
        'p-1'
      ]
    ]
  } as const;

  const highlight = 'accent';
  const bgCol = bg(highlight);
  const textCol = text(highlight);
  const [, bgColRaw] = splitTwColor(bgCol);

  return (
    <div ref={scrollToServicesRef} className={twMerge(bgCol, 'p-8')}>
      <div className='flex flex-col items-center'>

        <HeadingRaw className='font-bold text-shadow-sm' textStr={header} size='lg' color={intentToRaw('text', highlight)} />
        <p className={twMerge(textCol, 'text-center w-2/5 mt-4')}>{paragraph}</p>

        <ServicesGroup bgColRaw={bgColRaw} {...servicesGroupProps} />

        <div className='flex flex-col items-center pt-8'>
          <p className={twMerge(textCol, 'font-bold')}>{cta}</p>
          <div className='flex gap-x-4 pt-6'>
            <ButtonAccent buttonLink={hrefs.github}>See My Work</ButtonAccent>
            <ButtonAccentInvis buttonLink='/contact'>Get in Touch</ButtonAccentInvis>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
