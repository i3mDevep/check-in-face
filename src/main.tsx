import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './app/app';
import { CssBaseline } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
);
