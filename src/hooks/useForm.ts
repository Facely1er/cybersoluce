import { useState, useCallback } from 'react';

interface FormFieldConfig {
  required?: boolean;
  validate?: (value: any) => string | null;
  transform?: (value: any) => any;
}

interface FormConfig {
  [key: string]: FormFieldConfig;
}

interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: FormConfig;
  onSubmit?: (values: T) => Promise<void> | void;
}

interface UseFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: (name: keyof T, value: any) => void;
  setFieldError: (name: keyof T, error: string) => void;
  setFieldTouched: (name: keyof T, touched?: boolean) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  validateField: (name: keyof T) => void;
  validateForm: () => boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema = {},
  onSubmit
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: validationSchema[name as string]?.transform?.(value) ?? value
    }));
    
    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as string];
        return newErrors;
      });
    }
  }, [errors, validationSchema]);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name as string]: error }));
  }, []);

  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name as string]: isTouched }));
  }, []);

  const validateField = useCallback((name: keyof T) => {
    const fieldConfig = validationSchema[name as string];
    const value = values[name];

    if (!fieldConfig) return;

    // Required validation
    if (fieldConfig.required && (!value || (typeof value === 'string' && !value.trim()))) {
      setFieldError(name, `${String(name)} is required`);
      return;
    }

    // Custom validation
    if (fieldConfig.validate && value) {
      const error = fieldConfig.validate(value);
      if (error) {
        setFieldError(name, error);
        return;
      }
    }

    // Clear error if validation passes
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name as string];
      return newErrors;
    });
  }, [values, validationSchema, setFieldError]);

  const validateForm = useCallback((): boolean => {
    let isFormValid = true;
    const newErrors: Record<string, string> = {};

    Object.keys(validationSchema).forEach(fieldName => {
      const fieldConfig = validationSchema[fieldName];
      const value = values[fieldName as keyof T];

      // Required validation
      if (fieldConfig.required && (!value || (typeof value === 'string' && !value.trim()))) {
        newErrors[fieldName] = `${fieldName} is required`;
        isFormValid = false;
        return;
      }

      // Custom validation
      if (fieldConfig.validate && value) {
        const error = fieldConfig.validate(value);
        if (error) {
          newErrors[fieldName] = error;
          isFormValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isFormValid;
  }, [values, validationSchema]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validate form
    if (!validateForm()) {
      return;
    }

    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setFieldError,
    setFieldTouched,
    handleSubmit,
    reset,
    validateField,
    validateForm
  };
}

export default useForm;