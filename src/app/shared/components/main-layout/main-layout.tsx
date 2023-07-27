import { Outlet } from 'react-router-dom';
import { Stack, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { SidebarV2 } from '../sidebar';

export const MainLayout = () => {
  return (
    <Stack flexDirection="initial" height="100vh">
      <Box
        component="nav"
        sx={{
          flexShrink: 0,
          margin: 10,
        }}
      >
        <SidebarV2 />
      </Box>
      <Stack margin={10} flexDirection="column" width="100%">
        <AppBar
          position="static"
          sx={{
            boxShadow: 'none',
            marginBottom: 20,
            borderRadius: 10,
          }}
          enableColorOnDark
        >
          <Toolbar>
            <Typography>Worker application tracer</Typography>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Stack>
    </Stack>
  );
};
