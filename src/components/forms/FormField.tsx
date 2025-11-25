import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectOption } from '../ui/select';

interface FormFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  value: any;
  onChange: (value: any) => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: SelectOption[];
  rows?: number;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  helperText,
  placeholder,
  required = false,
  disabled = false,
  options = [],
  rows = 4,
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(newValue);
  };

  if (type === 'textarea') {
    return (
      <Textarea
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={className}
      />
    );
  }

  if (type === 'select') {
    return (
      <Select
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        options={options}
        className={className}
      />
    );
  }

  return (
    <Input
      name={name}
      type={type}
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={className}
    />
  );
};

export default FormField;