import { ApolloClient, InMemoryCache } from '@apollo/client';
const { VITE_API_URL, VITE_API_KEY } = import.meta.env;


export const client = new ApolloClient({
  uri: VITE_API_URL,
  headers: {
    'x-api-key': VITE_API_KEY
  },
  cache: new InMemoryCache(),
});