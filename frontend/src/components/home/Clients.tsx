import { twMerge } from 'tailwind-merge';

import { bg, text, border } from 'design-system/colors';

function GridText({ text }: { text: string; }) {
  return (
    <span className='text-center'>{text}</span>
  );
}

function Clients() {
  const highlight = 'default';
  const background = twMerge(bg(highlight), border(highlight), 'pt-4');

  const font = twMerge(text(highlight), 'font-bold uppercase');
  const clients = [
    'Farm Heroes Saga',
    'Atlas',
    'Mannequin',
    'Cities VR',
    'The Curious Tale of the Stolen Pets',
  ];

  return (
    <div className={twMerge(background, 'shadow-2xl flex min-h-64 justify-center items-center')}>
      <ul className={twMerge(font, 'flex flex-col md:hidden justify-center items-center gap-y-4 max-[380px]:!text-sm sm:text-md')}>
        {clients.map((client) => (
          <li key={client}>{client}</li>
        ))}
      </ul>

      <div className={twMerge(font, 'hidden md:flex min-[1275px]:!hidden flex-col w-full gap-y-4 text-2xl')}>
        <div className='grid grid-cols-2 grid-rows-2 gap-y-4'>
          {clients.slice(0, clients.length - 1).map((client) => (
            <GridText key={client} text={client} />
          ))}
        </div>
        <span className='text-center'>{clients[clients.length - 1]}</span>
      </div>

      <ul className={twMerge(font, 'hidden min-[1275px]:flex items-center gap-x-14 text-xl min-[1500px]:text-2xl min-[1800px]:text-3xl')}>
        {clients.map((client) => (
          <li key={client}>{client}</li>
        ))}
      </ul>

    </div>
  );
}

export default Clients;
