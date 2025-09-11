import { useId } from 'react';
import { Input, Label, TextArea } from 'components/forms/FormElements';

interface BaseFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

interface FieldProps extends BaseFieldProps {
  type: 'text' | 'email';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextAreaFieldProps extends BaseFieldProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

function Field({ label, type, name, value, onChange, placeholder, required, error }: FieldProps) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={errorId}
        error={!!error}
      />
      {error && (
        <p id={errorId} className='mt-1 text-xs text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, placeholder, required, rows = 5, error }: TextAreaFieldProps) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <TextArea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={errorId}
        error={!!error}
      />
      {error && (
        <p id={errorId} className='mt-1 text-xs text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
}


export { Field, TextAreaField, };
