import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
 variant?: "small" | "medium"
};

const Wrapper: React.FC<WrapperProps> = ({ children, variant="medium" }) => {
  const maxWidth = {
    small: "400px",
    medium: "800px"
  }

  return (
    <Box 
      maxWidth={maxWidth[variant]} 
      w="100%"
      mt={8}
      mx="auto"
      >
        {children}
    </Box>
  )

};

export default Wrapper;