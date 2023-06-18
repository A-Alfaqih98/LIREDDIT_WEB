import { Button, Box } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import router from 'next/router';
import react, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';
import { useForgotPasswordMutation } from '../generated/graphql';
import { BlobOptions } from 'buffer';

export const forgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>forgot password email sent</Box>
          ) : (
            <Form>
              <InputField
                name='email'
                placeholder='Email'
                label='Email'
                autoFocus
                autoComplete='on'
              />
              <Button
                mt={4}
                type='submit'
                color='teal'
                isLoading={isSubmitting}
              >
                Send Forgot Password Email
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default forgotPassword;
