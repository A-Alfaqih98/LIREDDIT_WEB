import { Button, Flex, Text, useColorMode, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { NavBar } from '../components/NavBar';

const Index = () => {
  const { toggleColorMode } = useColorMode();
  const [state, setState] = useState();
  return (
    <>
      <NavBar />
      <Flex
        direction='column'
        height={'100vh'}
        justifyContent='center'
        alignItems='center'
      >
        <Heading m={4} color='header' fontFamily='header'>
          Hello World!
        </Heading>
        <Button className='_text' onClick={toggleColorMode}>
          Toggle color mode
        </Button>
      </Flex>
    </>
  );
};

export default Index;
