import React from 'react';
import Box from '@mui/material/Box';
import {
  styled,
  ThemeProvider,
  createTheme,
  useTheme,
} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import Dns from '@mui/icons-material/Dns';
import { Avatar, Drawer, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';

const data = [
  { icon: <People />, label: 'Worker', path: '/app/worker' },
  { icon: <Dns />, label: 'Tracer time', path: '/app/tracer-time' },
  { icon: <PaidIcon />, label: 'Payment', path: '/app/payment' },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export function SidebarV2() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
        },
        palette: {
          mode: 'dark',
          primary: { main: 'rgb(102, 157, 246)' },
          background: { paper: 'rgb(5, 30, 52)' },
        },
      })}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: 'fit-content',
          height: '100%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            position: 'static',
            boxSizing: 'border-box',
            borderRadius: 3,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{ maxWidth: 256, ...(isMobile && { width: 52 }) }}
        >
          <FireNav sx={{ position: 'relative' }} component="nav" disablePadding>
            <ListItemButton sx={{ '&.MuiListItemButton-root': { paddingLeft: 1.5 } }} disableTouchRipple component="a" href="/">
              <Avatar src="https://cdn-icons-png.flaticon.com/512/5556/5556512.png" />
              <ListItemIcon
                sx={{ fontSize: 14, left: 50, bottom: 0, position: 'absolute' }}
              >
                <span aria-label="icon-app" role="img">
                  🔥
                </span>
              </ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Hegel app"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <Divider />
            <Box
              sx={{
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
              >
                {!isMobile && (
                  <ListItemText
                    primary="Services"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      mb: '2px',
                    }}
                    secondary="Worker list, create new worker and mark option"
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: '16px',
                      color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                  />
                )}
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    component={Link}
                    to={item.path}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 'medium',
                      }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </Drawer>
    </ThemeProvider>
  );
}
