import { useId } from 'react';
import { Input, Label, TextArea } from 'components/forms/FormElements';

interface BaseFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
}

interface FieldProps extends BaseFieldProps {
  type: 'text' | 'email';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextAreaFieldProps extends BaseFieldProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

function Field({ label, type, name, value, onChange, placeholder, required }: FieldProps) {
  const id = useId();

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
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, placeholder, required, rows = 5 }: TextAreaFieldProps) {
  const id = useId();

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
      />
    </div>
  );
}

export { Field, TextAreaField, };
