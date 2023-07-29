import { Chip } from '@mui/material';

export enum TRACER_REASON {
  START_ANY_REASON = 'start any reason',
  START_WORK = 'start work',
  START_LUNCH = 'start lunch',
  END_LUNCH = 'end lunch',
  END_WORK = 'end work',
  END_ANY_REASON = 'end any reason',
}

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
          {...(selected !== reason && { variant: 'outlined' })}
        />
      ))}
    </>
  );
};
