import { Outlet } from 'react-router-dom';
import { Stack, Box, AppBar, Toolbar } from '@mui/material';
import { SidebarV2 } from '../sidebar';
import { CustomizedBreadcrumbs } from '../breadcrumbs';

export const MainLayout = () => {
  return (
    <Stack flexDirection="initial" minHeight='100vh'>
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
            <CustomizedBreadcrumbs />
          </Toolbar>
        </AppBar>
        <Outlet />
      </Stack>
    </Stack>
  );
};
