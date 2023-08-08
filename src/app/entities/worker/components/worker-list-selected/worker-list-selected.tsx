import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';
import { ListSubheader } from '@mui/material';

const { VITE_CDN_IMAGES_WORKER } = import.meta.env;

export function WorkerListSelected({
  onClickItem,
}: {
  onClickItem: (id: string) => void;
}) {
  const {
    resultGetWorker: { data },
  } = useGraphqlWorker();
  return (
    <List
      dense
      subheader={<ListSubheader>Select a worker</ListSubheader>}
      sx={{
        width: '100%',
        maxWidth: 500,
        bgcolor: 'background.paper',
        margin: 'auto',
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
