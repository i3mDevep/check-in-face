import { ListItemButton, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { SidebarTypes } from './types/sidebar';
import { colorConfigs } from 'src/app/shared/config/color-config';

type SidebarProps = {
  item: SidebarTypes;
};

const SidebarItem = ({ item }: SidebarProps) => {
  return item.sidebarProps && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        '&: hover': {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        },
        backgroundColor: 'unset',
        paddingY: '12px',
        paddingX: '24px',
      }}
    >
      <ListItemIcon
        sx={{
          color: colorConfigs.sidebar.color,
        }}
      >
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {item.sidebarProps.displayText}
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
