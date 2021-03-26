import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik 
        initialValues={{username: "", password: ""}}
        onSubmit={async (values, { setErrors }) => { 
          const response = await login(values);
          if(response.data?.login.errors){
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // login worked
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField 
              placeholder="username"
              name="username"
              label="Username"
              />
            <Box mt={4}>
              <InputField 
                placeholder="password"
                name="password"
                label="Password"
                type="password"
                />
            </Box>
            <Button 
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="orange"
              >Login</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
};

export default withUrqlClient(createUrqlClient)(LoginPage)