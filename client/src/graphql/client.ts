import { ApolloClient } from '@apollo/client';
import { getCache } from './cache';

const GRAPHQL_SERVER_URI = 'http://localhost:4000';

let client: ApolloClient<unknown> | null = null;

const createClient = () => {
  const cache = getCache();

  return new ApolloClient({
    uri: GRAPHQL_SERVER_URI,
    cache,
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
};

export const getClient = (): ApolloClient<unknown> => {
  if (!client) client = createClient();
  return client;
};
