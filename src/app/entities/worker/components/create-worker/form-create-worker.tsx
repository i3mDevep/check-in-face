import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInputText } from 'src/app/shared/components/form-inputs/text-field';
import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';
import { MultipleSelectChip } from 'src/app/shared/components/form-inputs/select-input';
import { useMemo, useState } from 'react';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import dayjs from 'dayjs';

export type WorkerInputs = {
  fullName: string;
  identification: string;
  scheduleWeek: string[];
  email?: string;
  phone?: string;
};

export const FormCreateWorker = ({
  modeUpdate,
  initialValues,
  onSubmitEventSuccess,
}: {
  modeUpdate?: boolean;
  initialValues?: WorkerInputs;
  onSubmitEventSuccess: (data: WorkerInputs) => void;
}) => {
  const {
    mutationCreateWorker: [createWorker, { loading }],
  } = useGraphqlWorker();

  const [daysInWeek] = useState(
    eachDayOfInterval({
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
    })
  );

  const {
    watch,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<WorkerInputs>({
    defaultValues: {
      email: '',
      fullName: '',
      identification: '',
      phone: '',
      scheduleWeek: [],
    },
    values: initialValues,
  });

  const scheduleWeek = watch('scheduleWeek');

  const onSubmit: SubmitHandler<WorkerInputs> = async (data) => {
    await createWorker({
      variables: {
        props: {
          fullName: data.fullName,
          identification: data.identification,
          scheduleWeek: data.scheduleWeek,
          ...(modeUpdate && { isPatch: true }),
        },
      },
    });
    onSubmitEventSuccess(data);
  };

  const optionsSelect = useMemo(
    () =>
      daysInWeek.flatMap((day) =>
        !scheduleWeek.some((schedule) =>
          schedule.includes(dayjs(day).format('dddd'))
        )
          ? Array.from(Array(10)).map(
              (_, i) => `${dayjs(day).format('dddd')} ${i + 1} hours`
            )
          : [
              ...scheduleWeek.filter((schedule) =>
                schedule.includes(dayjs(day).format('dddd'))
              ),
            ]
      ),
    [daysInWeek, scheduleWeek]
  );

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      data-cy="form-container-create-worker"
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
        textFieldProps={{ required: true, disabled: modeUpdate }}
      />
      <MultipleSelectChip
        options={optionsSelect}
        control={control}
        label="Schedules week"
        name="scheduleWeek"
      />
      <LoadingButton disabled={!isDirty} loading={loading} type="submit">
        Save
      </LoadingButton>
    </Stack>
  );
};
