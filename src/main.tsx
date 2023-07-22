import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import './index.css';

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Raleway',
//   },
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
