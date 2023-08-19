import { LoadingButton } from '@mui/lab';
import { Alert, Stack, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInputCurrency } from 'src/app/shared/components/form-inputs/currency-input';
import { FormInputText } from 'src/app/shared/components/form-inputs/text-field';
import { useGraphqlPayments } from '../../hooks/useGraphqlPayment';
import { useMemo } from 'react';
import { useNotification } from 'src/app/shared/hooks/useNotification';

type PaymentTemplate = {
  baseHourDay: number;
  baseHourHoliday: number;
  hoursMinimum: number;
  extraHourNormalDay: number;
  extraHourHoliday: number;
  nocturnHourNormalDay: number;
  nocturnHourHoliday: number;
  intervalNonNightSince: string;
  intervalNonNightUntil: string;
};

export const CreateTemplatePayment = () => {
  const {
    resultGetPaymentTemplate: { loading: loadingGetPayment, data },
    putTemplatePayment: [mutationPutTemplatePayment, { loading }],
  } = useGraphqlPayments({ skipPaymentTemplate: false });

  const { component, setMessageSnackbar } = useNotification()

  const dtoDateForm = useMemo(() => {
    if (!data?.getPaymentTemplate) return;

    function convertToTimeString(totalMinutes: number) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
      const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

      return `${hoursString}:${minutesString}`;
    }

    const { intervalNonNight, __typename,  ...rest } = data.getPaymentTemplate;
    return {
      ...(rest as PaymentTemplate),
      intervalNonNightSince: convertToTimeString(intervalNonNight?.since ?? 0),
      intervalNonNightUntil: convertToTimeString(intervalNonNight?.until ?? 0),
    } as PaymentTemplate;
  }, [data]);

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<PaymentTemplate>({
    defaultValues: {
      intervalNonNightSince: '00:00',
      intervalNonNightUntil: '00:00',
      hoursMinimum: 8,
    },
    values: dtoDateForm,
  });



  const onSubmit: SubmitHandler<PaymentTemplate> = async (data) => {
    const { intervalNonNightSince, intervalNonNightUntil, ...restForm } = data;
    const getMinutes = (timeString: string) => {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    };
    try {
      await mutationPutTemplatePayment({
        variables: {
          props: {
            ...restForm,
            intervalNonNight: {
              since: getMinutes(intervalNonNightSince),
              until: getMinutes(intervalNonNightUntil),
            },
          },
        },
      });
      setMessageSnackbar({ message: 'template payment saved', severity: 'success' })
    } catch (error) {
      setMessageSnackbar({
        message: (error as { message: string }).message,
        severity: 'error',
      });
    }

  };
  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      data-cy="form-container-create-worker"
      minWidth={500}
      gap={10}
      margin="auto"
    >
      {component}
      <Typography variant="h5">
        Template payment
      </Typography>
      <Alert severity="info" color="warning">
        Validate the information with this the payment is generated
      </Alert>

      <Stack marginTop={10} gap={5} direction="row">
        <FormInputText
          control={control}
          label="Minimum hour"
          name="hoursMinimum"
          textFieldProps={{ required: true, type: 'number' }}
        />
        <FormInputText
          control={control}
          label="Start night"
          name="intervalNonNightSince"
          textFieldProps={{ required: true, type: 'time' }}
        />
        <FormInputText
          control={control}
          label="End night"
          name="intervalNonNightUntil"
          textFieldProps={{ required: true, type: 'time' }}
        />
      </Stack>
      <Stack gap={5} direction="row">
        <FormInputCurrency
          control={control}
          label="Basic hour price"
          name="baseHourDay"
          textFieldProps={{ variant: 'outlined' }}
        />
        <FormInputCurrency
          control={control}
          label="Holiday hour price"
          name="baseHourHoliday"
          textFieldProps={{ variant: 'outlined' }}
        />
      </Stack>
      <Stack gap={5} direction="row">
        <FormInputCurrency
          control={control}
          label="Basic extra hour price"
          name="extraHourNormalDay"
          textFieldProps={{ variant: 'outlined' }}
        />
        <FormInputCurrency
          control={control}
          label="Holiday extra hour price"
          name="extraHourHoliday"
          textFieldProps={{ variant: 'outlined' }}
        />
      </Stack>
      <Stack gap={5} direction="row">
        <FormInputCurrency
          control={control}
          label="Basic night hour"
          name="nocturnHourNormalDay"
          textFieldProps={{ variant: 'outlined' }}
        />
        <FormInputCurrency
          control={control}
          label="Holiday night hour"
          name="nocturnHourHoliday"
          textFieldProps={{ variant: 'outlined' }}
        />
      </Stack>
      <LoadingButton
        loading={loading}
        disabled={!isDirty || loadingGetPayment}
        variant="contained"
        type="submit"
      >
        Save payment template
      </LoadingButton>
    </Stack>
  );
};
