import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';

interface CardAnalyticsProps {
  title: string;
  value?: number | string;
  icon: JSX.Element;
  avatarSx?: SxProps;
  onClickButton?: () => void;
}

export const CardAnalytics = (props: CardAnalyticsProps) => {
  return (
    <Card
      variant="outlined"
      elevation={0}
      sx={{
        borderRadius: 10,
        margin: 5,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <IconButton onClick={props?.onClickButton}>
          <Avatar sx={{ bgcolor: 'secondary.main', ...props.avatarSx }}>
            {props.icon}
          </Avatar>
        </IconButton>
        <CardContent>
          <Typography color="gray" variant="subtitle2">
            {props.title}
          </Typography>
          {props.value && (
            <Typography textAlign="center" variant="h6" fontWeight={600}>
              {props.value}
            </Typography>
          )}
        </CardContent>
      </Stack>
    </Card>
  );
};
