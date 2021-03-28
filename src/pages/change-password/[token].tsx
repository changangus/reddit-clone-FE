import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { NextComponentType, withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('')

  return (
    <div>
    { tokenError.length > 1 ? 
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{tokenError}</AlertTitle>
        <AlertDescription>There is a problem with the token and or account you are trying to update.</AlertDescription>
        <Box ml={2} >
          <NextLink href="/forgot-password">
            <Link color="blue">Try reset again</Link>
          </NextLink>
        </Box>
      </Alert>
      : null
      }
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            token,
            newPassword: values.newPassword
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token)
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // change password worked
            router.push('/');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              placeholder="New Password"
              name="newPassword"
              label="New Password"
              type="password"
            />
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="orange"
            >Change Password</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
    </div>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  }
}

export default withUrqlClient(createUrqlClient)(ChangePassword as unknown as NextComponentType);