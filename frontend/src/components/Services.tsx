import { twMerge } from 'tailwind-merge';

import { CogWheels, Layers, Lightbulb } from 'components/generated/index';
import { ListCardDefault, ListCardAccent, } from 'components/Card';
import { bg, Intent, intentToRaw, RawColor, splitTwColor, text } from 'design-system/colors';
import { HeadingRaw } from 'components/Heading';

interface ServiceProps {
  Icon: React.ComponentType<{ className?: string }>;
  bgColRaw: RawColor,
  header: string;
  bread: string;
  className: string;
}

function ServiceCard({ Icon, bgColRaw, header, bread, className }: ServiceProps) {
  const ListCard = bgColRaw === intentToRaw('bg', 'accent') ? ListCardAccent : ListCardDefault;

  const [, rawAccentBg] = splitTwColor(bg('accent'));
  const headerTextCol = text(rawAccentBg);
  const iconProps = {
    className: twMerge(headerTextCol, 'w-24 h-24', className)
  } as const;

  return (
    <ListCard className='w-70 min-h-70 md:w-58 lg:w-64 md:min-h-80 p-4 flex flex-col text-center justify-start items-center'>
      <div className={twMerge('flex flex-col items-center')}>
        <Icon {...iconProps} />
        <HeadingRaw className='font-bold' textStr={header} size='xs' color={rawAccentBg} />
      </div>
      <p className={twMerge(text('default'), 'mt-4 min-h-24')}>{bread}</p>
    </ListCard>
  );
}

type ServiceTuple = [React.ComponentType<{ className?: string }>, string, string, string?];
interface ServicesGroupProps {
  services: ReadonlyArray<Readonly<ServiceTuple>>;
  bgColRaw: RawColor,
}

interface ServicesProps {
  highlight: Intent;
  cta: React.ReactNode;
  title?: React.ReactNode;
}

function ServicesGroup({ services, bgColRaw }: ServicesGroupProps) {
  return (
    <ul className='flex flex-col md:flex-row mt-10 gap-x-4 lg:gap-x-14 gap-y-8'>
      {services.map(([Icon, header, bread, className]) => (
        <ServiceCard key={header} Icon={Icon} bgColRaw={bgColRaw} header={header} bread={bread} className={className ?? ""} />
      ))}
    </ul>
  );
}

function Services({ title, highlight, cta }: ServicesProps) {
  const paragraph = 'I help bring your ideas to market. I’ve shipped multiplayer and console games and worked on large-scale live services reaching millions of players (Farm Heroes Saga). My expertise spans from highly performant Game Engine development, web development with React and Go to low-level programming with C, C++, and Zig, alongside deep Linux experience. I can also help with automation, CI/CD, and hosting.';

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

  const bgCol = bg(highlight);
  const textCol = text(highlight);
  const [, bgColRaw] = splitTwColor(bgCol);

  const width = twMerge(
    'w-full',
    'sm:w-3/4',
    'lg:w-4/5',
    'xl:w-4/5',
    '2xl:w-3/5',
    'min-[1850px]:!w-1/2',
    'min-[2100px]:!w-2/5'
  );
  return (
    <div className={twMerge(width, 'flex flex-col items-center')}>
      {title}
      <p className={twMerge(textCol, 'text-left mt-4')}>{paragraph}</p>

      <ServicesGroup bgColRaw={bgColRaw} {...servicesGroupProps} />

      <div className='flex flex-col items-center pt-8'>
        {cta}
      </div>
    </div>
  );
}

export default Services;
