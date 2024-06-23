import { useField } from 'formik';
import Input, { InputProps } from '../Input';
import type { FieldHookConfig } from 'formik';

type FormikInput = Pick<InputProps, 'label' | 'type' | 'placeholder'> & FieldHookConfig<string>;

export const FormikInput = ({ label, type, placeholder, ...props }: FormikInput) => {
  const [field, meta] = useField(props);

  return <Input label={label} type={type} placeholder={placeholder} {...field} {...meta} />;
};
