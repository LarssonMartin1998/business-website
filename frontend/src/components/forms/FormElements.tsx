import { twMerge } from 'tailwind-merge';

import { useInputStyling } from 'utils/form';
import { text } from 'design-system/colors';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

interface InputProps {
  type: 'text' | 'email';
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
}

interface TextAreaProps {
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: boolean;
}

function Label({ children, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(text('default'), 'block text-sm font-medium mb-2')}
    >
      {children}
    </label>
  );
}
function Input({ id, error, ...props }: InputProps) {
  return (
    <input
      id={id}
      className={useInputStyling(!!error)}
      {...props}
    />
  );
}

function TextArea({ id, error, ...props }: TextAreaProps) {
  return (
    <textarea
      id={id}
      className={useInputStyling(!!error)}
      {...props}
    />
  );
}

export { Label, Input, TextArea, };
