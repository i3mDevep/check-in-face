import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CreateTemplatePayment } from 'src/app/entities/worker-payments/components/create-template-payment';
import { WorkerListSelected } from 'src/app/entities/worker/components/worker-list-selected';

export const WorkerPayment = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      margin="20px 0"
      justifyContent="space-between"
    >
      <CreateTemplatePayment />
      <WorkerListSelected
      title='Select one user if you want to generate payment:'
        onClickItem={(identification) => navigate(identification)}
      />

    </Stack>
  );
};
