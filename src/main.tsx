import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';

import { router } from './app/app';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { RouterProvider } from 'react-router-dom';

import './app/amplify';
import './index.css';
import { CssBaseline } from '@mui/material';
import createThemeCustom from './app/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider theme={createThemeCustom()}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
);
