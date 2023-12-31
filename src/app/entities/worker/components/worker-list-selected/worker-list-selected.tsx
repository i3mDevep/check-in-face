import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';
import { CircularProgress, ListSubheader } from '@mui/material';

const { VITE_CDN_IMAGES_WORKER } = import.meta.env;

export function WorkerListSelected({
  title = 'Select a worker',
  onClickItem,
}: {
  onClickItem: (id: string) => void;
  title?: string;
}) {
  const {
    resultGetWorker: { data, loading },
  } = useGraphqlWorker();
  return (
    <List
      dense
      subheader={
        <ListSubheader>
          {loading && <CircularProgress />}
          {title}
        </ListSubheader>
      }
      sx={{
        width: '100%',
        maxWidth: 500,
        bgcolor: 'background.paper',
        margin: 'auto',
        maxHeight: '80vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '0.3em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
        }
      }}
    >
      {data?.getListWorker?.map(({ identification, profilePath, fullName }) => {
        const labelId = `checkbox-list-secondary-label-${identification}`;
        return (
          <ListItem
            key={identification}
            onClick={() => onClickItem(identification)}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={identification}
                  src={
                    profilePath
                      ? `${VITE_CDN_IMAGES_WORKER}/${profilePath}`
                      : 'https://cdn-icons-png.flaticon.com/512/5556/5556512.png'
                  }
                />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={`${fullName} - ${identification}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
