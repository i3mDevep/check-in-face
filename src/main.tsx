import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { router } from './app/app';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { RouterProvider } from 'react-router-dom';

import './app/amplify'
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
     <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
