import { Outlet } from 'react-router-dom';
import { Stack, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Sidebar } from '../sidebar';
import { sizeConfigs } from 'src/app/shared/config/size-config';

function appBarLabel(label: string) {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

export const MainLayout = () => {
  return (
    <Stack flexDirection="initial" height="100vh">
      <Box
        component="nav"
        sx={{
          flexShrink: 0,
          width: sizeConfigs.sidebar.width,
          margin: 10,
        }}
      >
        <Sidebar />
      </Box>
      <Stack flexDirection="column" width="100%">
        <AppBar
          position="static"
          sx={{
            boxShadow: 'none',
            backgroundColor: 'white',
            color: 'black',
            marginBottom: 20,
          }}
          enableColorOnDark
        >
          {appBarLabel('Worker')}
        </AppBar>
        <Outlet />
      </Stack>
    </Stack>
  );
};
