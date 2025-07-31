import { RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

import { CogWheels, Layers, Lightbulb } from 'components/generated/index';
import { ListCardDefault } from 'components/Card';
import { bg, RawColor, splitTwColor, text } from 'design-system/colors';
import { ButtonAccent, ButtonAccentInvis } from 'components/Button';

interface ServiceProps {
  Icon: React.ComponentType<{ className?: string }>;
  bgColRaw: RawColor,
  header: string;
  bread: string;
}

function ServiceCard({ Icon, bgColRaw, header, bread }: ServiceProps) {
  const mimickBgTextCol = text(bgColRaw);
  const iconProps = {
    className: twMerge(mimickBgTextCol, 'w-24 h-24')
  } as const;

  return (
    <ListCardDefault className='w-64 h-80'>
      <div className='flex flex-col items-center'>
        <Icon {...iconProps} />
        <h3 className={twMerge(mimickBgTextCol, 'font-bold mt-2')}>{header}</h3>
      </div>
      <p className={twMerge(text('default'), 'mt-4 min-h-24')}>{bread}</p>
    </ListCardDefault>
  );
}

type ServiceTuple = [React.ComponentType<{ className?: string }>, string, string];
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
      {services.map(([Icon, header, bread]) => (
        <ServiceCard key={header} Icon={Icon} bgColRaw={bgColRaw} header={header} bread={bread} />
      ))}
    </ul>
  );
}

function Services({ scrollToServicesRef }: ServicesProps) {
  const header = 'Services';
  const paragraph = 'Lorem, ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus vitae ante sed lobortis. Sed posuere hendrerit purus, eu cursus purus facilisis eget. Quisque sodales vitae lacus pretium blandit. Maecenas at sem euismod, interdum elit eget, mattis tortor. Etiam sed molestie arcu, nec euismod sem. Maecenas tincidunt venenatis leo eu.';

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
        'From backend to frontend, Game Engine to Gameplay, automated tools, and deployment.',
      ],
      [
        Lightbulb,
        'From Idea to Delivery',
        'I help bring your product vision to life. Clearly, efficiently, and with full execution from start to finish.',
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
        <h2 className={twMerge(textCol, 'font-bold text-5xl text-shadow-sm')}>{header}</h2>
        <p className={twMerge(textCol, 'text-center w-1/2 mt-4')}>{paragraph}</p>

        <ServicesGroup bgColRaw={bgColRaw} {...servicesGroupProps} />

        <div className='flex gap-x-4 mt-4 p-8'>
          <ButtonAccent>View Portfolio</ButtonAccent>
          <ButtonAccentInvis buttonLink='/contact'>Get in touch</ButtonAccentInvis>
        </div>
      </div>
    </div>
  );
}

export default Services;
