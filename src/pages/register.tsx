import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

interface RegisterProps {

};

const RegisterPage: React.FC<RegisterProps> = () => {
  return (
    <Wrapper variant="small">
      <Formik 
        initialValues={{username: "", password: ""}}
        onSubmit={(values) => {console.log(values)}}>
        {({values, handleChange}) => (
          <Form>
            <InputField 
              placeholder="username"
              name="username"
              label="Username"
              />
            <InputField 
              placeholder="password"
              name="password"
              label="Password"
              type="password"
              />
              
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
};

export default RegisterPage