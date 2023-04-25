import { QueryInput, cacheExchange } from '@urql/exchange-graphcache';
import { withUrqlClient } from 'next-urql';
import { fetchExchange, dedupExchange } from 'urql';
import { betterUpdateQuery } from './betterUpdateQuery';
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  LogoutMutation,
  RegisterMutation,
} from '../generated/graphql';

export default withUrqlClient((ssrExchange) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    // Include cookies in the request
    credentials: 'include' as const,
    cache: 'default' as const,
  },
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              },
            );
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => ({ me: null }),
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              },
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
    dedupExchange,
  ],
}));
