import { Chip } from '@mui/material';
import { TRACER_REASON } from '../../const/tracer-types';


export const TracerTimeReason = ({
  onClick,
  selected,
}: {
  onClick: (reason: string) => void;
  selected: TRACER_REASON;
}) => {
  return (
    <>
      {Object.entries(TRACER_REASON).map(([key, reason]) => (
        <Chip
          key={key}
          onClick={() => onClick(reason)}
          label={reason}
          sx={{ margin: '0px !important' }}
          color='primary'
          {...(selected !== reason && { variant: 'outlined' })}
        />
      ))}
    </>
  );
};
