import { twMerge } from 'tailwind-merge';

import { bg, text, border } from 'design-system/colors';
import { Href, hrefs } from 'design-system/pages';
import { AnchorLink } from 'components/Link';

function Clients() {
  const highlight = 'default';
  const background = twMerge(bg(highlight), border(highlight), 'pt-4');

  const font = twMerge(text(highlight), 'font-bold uppercase');

  type Client = {
    name: string;
    props: {
      href: Href;
      'aria-label': string;
    };
  };
  const clients: Client[] = [
    { name: 'Farm Heroes Saga', props: { href: hrefs.fhs, 'aria-label': '', } },
    { name: 'Atlas', props: { href: hrefs.atlas, 'aria-label': '', } },
    { name: 'Mannequin', props: { href: hrefs.mannequin, 'aria-label': '', } },
    { name: 'Cities VR', props: { href: hrefs.citiesVr, 'aria-label': '', } },
    { name: 'The Curious Tale of the Stolen Pets', props: { href: hrefs.curiousTale, 'aria-label': '', } },
  ];
  for (let i = 0; i < clients.length; i++) {
    clients[i].props['aria-label'] = `Open external project page of ${clients[i].name}`;
  }

  const lastClient = clients[clients.length - 1];
  return (
    <section className={twMerge(background, 'shadow-2xl flex min-h-64 justify-center items-center')}>
      <ul className={twMerge(font, 'flex flex-col md:hidden justify-center items-center gap-y-4 max-[380px]:!text-sm sm:text-md')}>
        {clients.map(({ name, props }) => (
          <li key={name}><AnchorLink className='hover:underline' {...props}>{name}</AnchorLink></li>
        ))}
      </ul>

      <div className={twMerge(font, 'hidden md:flex min-[1275px]:!hidden flex-col w-full gap-y-4 text-2xl')}>
        <div className='grid grid-cols-2 grid-rows-2 gap-y-4'>
          {clients.slice(0, clients.length - 1).map(({ name, props }) => (
            <AnchorLink key={name} className='text-center hover:underline' {...props}>{name}</AnchorLink>
          ))}
        </div>
        <span className='text-center'>{}</span>
        <AnchorLink className='text-center hover:underline' {...lastClient.props}>{lastClient.name}</AnchorLink>
      </div>

      <ul className={twMerge(font, 'hidden min-[1275px]:flex items-center gap-x-14 text-xl min-[1500px]:text-2xl min-[1800px]:text-3xl')}>
        {clients.map(({ name, props }) => (
          <li key={name}><AnchorLink className='hover:underline' {...props}>{name}</AnchorLink></li>
        ))}
      </ul>

    </section>
  );
}

export default Clients;
