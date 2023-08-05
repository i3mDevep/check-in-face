import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.primary.light;
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;


const breadcrumbNameMap: Record<string, string> = {
  '/app/worker': 'Worker',
  '/app/tracer-time': 'Tracer time',
};

export function CustomizedBreadcrumbs() {
  const location = useLocation();
  const navigation = useNavigate();

  const pathnames = location.pathname.replace('/app', '').split('/').filter((x) => x);

  const handleOnClick = (path: string) => navigation(path);
  return (
    <div role="presentation">
      <Breadcrumbs sx={{ color: 'white' }} aria-label="breadcrumb">
        {pathnames.map((breadcrumbRoute, index) => {
          const to = `/app/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <StyledBreadcrumb
              key={to}
              component="button"
              label={breadcrumbNameMap?.[to] ?? breadcrumbRoute}
              onClick={() => handleOnClick(to)}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
