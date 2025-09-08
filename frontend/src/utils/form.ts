import { twMerge } from 'tailwind-merge';
import { border, placeholder, raw, text } from 'design-system/colors';

function useInputStyling(): string {
  return twMerge(
    text('default'),
    placeholder(text(raw.pineInk50)),
    border('default'),
    'w-full p-3 border rounded-lg transition-colors duration-200'
  );
}

export { useInputStyling };
