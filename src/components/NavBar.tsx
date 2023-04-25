import { Box, Button, Flex, Text, color } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    requestPolicy: 'cache-and-network',
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Box mr='4'>
          <NextLink href={'/login'}>Login</NextLink>
        </Box>
        <Box>
          <NextLink href={'/register'}>Register</NextLink>
        </Box>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex align={'center'}>
        <Box mr={4}>{data?.me?.username}</Box>
        <Button
          variant='link'
          onClick={() => {
            //@ts-ignore
            logout();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg={'teal'} p={4} justify={'end'}>
      {body}
    </Flex>
  );
};
