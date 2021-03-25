import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = ({}) => {
    const [{data, fetching}, me] = useMeQuery();
    let body = null;
    // data is loading
    if(fetching) {
      // user is not logged in
    } else if (!data?.me) {
      body = ( 
        <>
          <NextLink href='/login'>
            <Link  mr={3}>Login</Link>
          </NextLink>
          <NextLink href='/register'>
            <Link>Register</Link>
          </NextLink>
        </>
      )
      // user is logged in 
    } else {
      body = (
        <Flex>
          <Box>
            {data.me.username}
          </Box>
          <Button variant="link" ml={4}>Logout</Button>
        </Flex>
      )
    }
    return (
        <Flex bg='orange' padding={4} ml='auto' justifyContent="space-between">
          <div>
            <NextLink href='/'>
              <Link>Home</Link>
            </NextLink>
            
          </div>
          <div>
            {body}
          </div>
        </Flex>
    );
}

export default Navbar;