import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInputText } from 'src/app/shared/components/form-inputs/text-field';
import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';

type WorkerInputs = {
  fullName: string;
  identification: string;
  email?: string;
  phone?: string;
};

export const FormCreateWorker = ({
  onSubmitEventSuccess,
}: {
  onSubmitEventSuccess: (data: WorkerInputs) => void;
}) => {
  const {
    mutationCreateWorker: [createWorker, { loading }],
  } = useGraphqlWorker();

  const { handleSubmit, control, formState: { isDirty } } = useForm<WorkerInputs>();

  const onSubmit: SubmitHandler<WorkerInputs> = async (data) => {
    await createWorker({
      variables: {
        props: { fullName: data.fullName, identification: data.identification },
      },
    });
    onSubmitEventSuccess(data);
  };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      data-cy='form-container-create-worker'
      gap={20}
      maxWidth={500}
    >
      <FormInputText
        control={control}
        label="Full name"
        name="fullName"
        textFieldProps={{ required: true }}
      />
      <FormInputText
        control={control}
        label="identification"
        name="identification"
        textFieldProps={{ required: true }}
      />
      <LoadingButton disabled={!isDirty} loading={loading} type="submit">
        Create
      </LoadingButton>
    </Stack>
  );
};
