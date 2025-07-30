import { twMerge } from "tailwind-merge";

import { bg, text, border } from "design-system/colors";

function Clients() {
  const highlight = 'default';
  const background = twMerge(bg(highlight), border(highlight), 'border-y-2');
  const shadow = 'shadow-[inset_0_40px_52px_rgba(0,0,0,0.15)]'; // large due to the skew from the hero.

  const font = twMerge(text(highlight), 'font-bold text-3xl uppercase');

  return (
    <div className={twMerge(background, shadow, 'flex h-64 justify-center ')}>
      <ul className={twMerge(font, 'flex items-center gap-x-10')}>
        <li>Farm Heroes Saga</li>
        <li>Atlas</li>
        <li>Mannequin</li>
        <li>Cities VR</li>
        <li>The Curious Tale of the Stolen Pets</li>
      </ul>
    </div>
  );
}

export default Clients;
