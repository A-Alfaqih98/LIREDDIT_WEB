import { Button, Flex, Text, useColorMode, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { usePostsQuery } from '../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { cacheExchange, fetchExchange } from 'urql';

const Index = () => {
  const { toggleColorMode } = useColorMode();
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <Button className='_text' onClick={toggleColorMode}>
        Toggle color mode
      </Button>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </>
  );
};

export default Index;

// Todo: add ssr to Index page maybe with apollo

// export default withUrqlClient(
//   (_ssrExchange, ctx) => ({
//     // ...add your Client options here
//     url: 'http://localhost:4000/graphql',
//     exchanges: [_ssrExchange, fetchExchange, cacheExchange],
//   }),
//   { ssr: true },
// )(Index);
