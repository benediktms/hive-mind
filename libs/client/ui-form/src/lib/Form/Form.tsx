import { z } from 'zod';
import { FormProps, Form as FinalForm } from 'react-final-form';
import { ReactNode } from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props<S extends z.ZodType<any, any>> = {
  schema: S;
  onSubmit: FormProps<z.infer<S>>['onSubmit'];
  submitText?: string;
  fullWidthSubmit?: boolean;
  initialValues: FormProps<z.infer<S>>['initialValues'];
  children?: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Form<S extends z.ZodType<any, any>>({
  children,
  schema,
  onSubmit,
  fullWidthSubmit = true,
  submitText,
  initialValues,
}: Props<S>) {
  const validateSchema =
    (schema: S) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (values: any) => {
      try {
        schema.parse(values);
        return {};
      } catch (err) {
        return (err as z.ZodError).formErrors.fieldErrors;
      }
    };

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validateSchema(schema)}
      initialValues={initialValues}
      render={({
        handleSubmit,
        submitting,
        submitError,
        hasValidationErrors,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            {children}

            {submitError && (
              <Box role="alert" style={{ color: 'red' }}>
                {submitError}
              </Box>
            )}

            {submitText && (
              <HStack>
                <Button
                  type="submit"
                  disabled={submitting || hasValidationErrors}
                  colorScheme="purple"
                  w={fullWidthSubmit ? 'full' : 'auto'}
                  isLoading={submitting}
                >
                  {submitText}
                </Button>
              </HStack>
            )}
          </form>
        );
      }}
    ></FinalForm>
  );
}
