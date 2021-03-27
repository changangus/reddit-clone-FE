import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useMutation } from 'urql';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
interface RegisterProps {

};

const RegisterPage: React.FC<RegisterProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik 
        initialValues={{username: "", email: "", password: ""}}
        onSubmit={async (values, { setErrors }) => { 
          const response = await register(values);
          console.log(response)
          if(response.data?.register.errors){
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            // register worked
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
                placeholder="email"
                name="email"
                label="Email"
                type="email"
                />
            </Box>
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
              >Register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
};

export default withUrqlClient(createUrqlClient)(RegisterPage)