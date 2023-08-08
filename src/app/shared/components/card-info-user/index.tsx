import { Avatar, Card, CardContent, Stack } from '@mui/material';
import { ReactNode } from 'react';

interface CardAnalyticsProps {
  src?: string;
  children: ReactNode;
}

export const CardInfoUser = (props: CardAnalyticsProps) => {
  return (
    <Card
      variant="outlined"
      elevation={0}
      sx={{
        borderRadius: 10,
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        padding: 5
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Avatar src={props.src} />
        <CardContent>{props.children}</CardContent>
      </Stack>
    </Card>
  );
};
