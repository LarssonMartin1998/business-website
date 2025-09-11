import { twMerge } from 'tailwind-merge';
import { border, placeholder, raw, text } from 'design-system/colors';

function useInputStyling(error: boolean = false): string {
  return twMerge(
    text('default'),
    placeholder(text(raw.pineInk50)),
    border('default'),
    'w-full p-3 border rounded-lg transition-colors duration-200',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500 ring-1 ring-red-300'
  );
}

export { useInputStyling };
