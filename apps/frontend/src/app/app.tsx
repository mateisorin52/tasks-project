// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { ApolloProvider } from '@apollo/client';
import client from './providers/graphqlClient';
import RouterContainer from './routes/RoutesContainer';

export function App() {

  return (
    <ApolloProvider client={client}>
      <RouterContainer />
    </ApolloProvider>
  );

}

export default App;
