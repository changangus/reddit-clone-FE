import { Box, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <Flex bg='orange' padding={4} ml='auto' justifyContent="space-between">
          <div>
            <NextLink href='/'>
              <Link>Home</Link>
            </NextLink>
            
          </div>
          <div>
            <NextLink href='/login'>
              <Link  mr={3}>Login</Link>
            </NextLink>
            <NextLink href='/register'>
              <Link>Register</Link>
            </NextLink>
            
          </div>
        </Flex>
    );
}

export default Navbar;