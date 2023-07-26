import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import SidebarItem from "./sidebar-item";
import SidebarItemCollapse from "./sidebar-collapse";
import appRoutes from "./build-sidebar";
import { sizeConfigs } from "src/app/shared/config/size-config";
import { colorConfigs } from "src/app/shared/config/color-config";


export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        height: '100%',
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          position: 'static',
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: 20
        }
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <Avatar src={''} />
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) => (
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        ))}
      </List>
    </Drawer>
  );
};

