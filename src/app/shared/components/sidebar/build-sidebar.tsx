// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
// import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
// import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';

import { SidebarTypes } from './types/sidebar';


const appRoutes: SidebarTypes[] = [
  {
    path: "/app/worker",
    sidebarProps: {
      displayText: "Workers",
      icon: <PeopleAltOutlinedIcon />
    }
  },
  {
    path: "/app/tracer-time",
    sidebarProps: {
      displayText: "Tracer time",
      icon: <FeedOutlinedIcon />
    }
  }
  // {
  //   path: "/dashboard",
  //   sidebarProps: {
  //     displayText: "Dashboard",
  //     icon: <DashboardOutlinedIcon />
  //   },
  //   child: [
  //     {
  //       path: "/dashboard/default",
  //       sidebarProps: {
  //         displayText: "Default"
  //       },
  //     },
  //     {
  //       path: "/dashboard/analytics",
  //       sidebarProps: {
  //         displayText: "Analytic"
  //       }
  //     },
  //     {
  //       path: "/dashboard/saas",
  //       sidebarProps: {
  //         displayText: "Saas"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/component",
  //   sidebarProps: {
  //     displayText: "Components",
  //     icon: <AppsOutlinedIcon />
  //   },
  //   child: [
  //     {
  //       path: "/component/alert",
  //       sidebarProps: {
  //         displayText: "Alert"
  //       },
  //     },
  //     {
  //       path: "/component/button",
  //       sidebarProps: {
  //         displayText: "Button"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/documentation",
  //   sidebarProps: {
  //     displayText: "Documentation",
  //     icon: <ArticleOutlinedIcon />
  //   }
  // },
  // {
  //   path: "/changelog",
  //   sidebarProps: {
  //     displayText: "Changelog",
  //     icon: <FormatListBulletedOutlinedIcon />
  //   }
  // }
];

export default appRoutes;