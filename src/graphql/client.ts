import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


export const client = new ApolloClient({
  uri: 'https://oe5p6maoovfzjdfd7kxva7ali4.appsync-api.us-east-1.amazonaws.com/graphql',
  headers: {
    'x-api-key': 'da2-2jsncbvpkzdo3hzczn36vjfw4i'
  },
  cache: new InMemoryCache(),
});