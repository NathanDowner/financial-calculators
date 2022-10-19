import { TextInput, TextInputProps } from '@mantine/core';
import { useFormik } from 'formik';

type TextFieldProps = TextInputProps &
  React.RefAttributes<HTMLInputElement> & {
    errors?: ReturnType<typeof useFormik>['errors'];
    touched?: ReturnType<typeof useFormik>['touched'];
  };

export const TextField = ({ errors, touched, ...props }: TextFieldProps) => {
  const formError = errors ? errors[props.name as string] : undefined;
  const formTouched = touched ? touched[props.name as string] : undefined;

  return (
    <TextInput
      styles={{}}
      variant="filled"
      color="gray-dark"
      error={formError && formTouched && (formError as string)}
      {...props}
    />
  );
};
