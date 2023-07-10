import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3010/graphql', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default client;
