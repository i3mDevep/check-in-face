import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { QueryGenerateWorkerPaymentArgs } from 'src/api-graphql-types';
import { PaymentWorkerPDF } from 'src/app/entities/worker-payments/components/generate-worker-payment';
import { SelectIntervalAndHoliday } from 'src/app/entities/worker-payments/components/select-interval-and-holidays/select-interval-and-holidays';
import { useGraphqlPayments } from 'src/app/entities/worker-payments/hooks/useGraphqlPayment';
import { useGraphqlWorker } from 'src/app/entities/worker/hooks/useGraphqlWorker';
import { DialogBase } from 'src/app/shared/components/dialog-base';
import { ModalSettingsPDF } from 'src/app/entities/worker-payments/components/generate-worker-payment/modal-settings-pdf';
import dayjs from 'dayjs';

export const GeneratePaymentWorker = () => {
  const { identification } = useParams();
  const navigation = useNavigate();
  const [openModalHoliday, setOpenModalHoliday] = useState(true);
  const [dataGeneratePayment, setDataGeneratePayment] = useState<{
    start: string;
    end: string;
    holidays: number[];
  }>();

  const {
    detailWorker: [getDetailWorker, result],
  } = useGraphqlWorker(true);

  const dtoQueryGenerator: QueryGenerateWorkerPaymentArgs | undefined =
    dataGeneratePayment && identification
      ? {
          query: {
            ...dataGeneratePayment,
            scheduleWeek: result.data?.getDetailWorker.scheduleWeek ?? [],
            identification,
          },
        }
      : undefined;

  const {
    resultGeneratePaymentWorker: { data, loading },
  } = useGraphqlPayments({
    skipPaymentTemplate: true,
    generateWorkerPaymentArgs: dtoQueryGenerator,
    onCompletedGenerator: () => setOpenModalHoliday(false),
  });

  const [paymentsItems, setPaymentsItems] = useState<
    {
      label: string;
      value: number;
      highlighted?: boolean;
      id: string;
      canDelete?: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (!data?.generateWorkerPayment) return;

    const { __typename, ...restSurcharges } =
      data?.generateWorkerPayment?.payment?.surcharges ?? {};

    const paymentTotal =
      Number(data?.generateWorkerPayment?.payment?.paymentHoursBasic) +
      (Object.values(restSurcharges).reduce(
        (prev, curr) => (prev ?? 0) + Number(curr),
        0
      ) ?? 0);

   const defaultPayments =  [
      {
        id: 'payment_total',
        label: 'Pago Total:',
        value: paymentTotal,
        highlighted: true,
      },
      {
        id: 'payment_hours_basic',
        label: 'Pago horas basicas:',
        value: Number(data?.generateWorkerPayment?.payment?.paymentHoursBasic),
      },
      {
        id: 'payment_surcharges_holiday',
        label: 'Pago recargo festivo:',
        value: Number(data?.generateWorkerPayment?.payment?.surcharges?.paymentHoursBasicHoliday),
      },
      {
        id: 'payment_hours_extra',
        label: 'Pago horas extra:',
        value: Number(
          data?.generateWorkerPayment?.payment?.surcharges?.paymentHoursExtra
        ),
      },
      {
        id: 'payment_hours_extra_holiday',
        label: 'Pago horas extra festivo:',
        value: Number(
          data?.generateWorkerPayment?.payment?.surcharges
            ?.paymentHoursExtraHoliday
        ),
      },
      {
        id: 'payment_hours_night',
        label: 'Pago horas nocturnas:',
        value: Number(
          data?.generateWorkerPayment?.payment?.surcharges?.paymentHoursNight
        ),
      },
      {
        id: 'payment_hours_night_holiday',
        label: 'Pago horas nocturnas festivo:',
        value: Number(
          data?.generateWorkerPayment?.payment?.surcharges
            ?.paymentHoursNightHoliday
        ),
      },
    ]
    try {
      const memorizedPayments = JSON.parse(localStorage.getItem('payments-data') ?? '[]')
      memorizedPayments.forEach((memorized: any) => {
        if(defaultPayments.some((dp) => dp.id === memorized.id)) return
        defaultPayments.push(memorized)
      });

      const totalPayment = Object.values(defaultPayments).reduce(
        (prev, item) =>
          item.id === 'payment_total' ? prev : prev + Number(item.value),
        0
      )
      defaultPayments[0] = {...defaultPayments[0], value: totalPayment }
    // eslint-disable-next-line no-empty
    } catch (error) {
      
    }
    setPaymentsItems(defaultPayments);
  }, [data?.generateWorkerPayment]);

  useEffect(() => {
    getDetailWorker({
      variables: { identification: identification as string },
    });
  }, [getDetailWorker, identification]);

  const dtoDataPdf = data?.generateWorkerPayment ?? {};

  if (!result.data) return <CircularProgress />;

  const { fullName, identification: id } = result.data.getDetailWorker;

  const paymentPeriod = `${dayjs(dataGeneratePayment?.start).format(
    'MMMM D, YYYY'
  )}  -  ${dayjs(dataGeneratePayment?.end).format('MMMM D, YYYY')}`;

  return (
    <>
      {!openModalHoliday && paymentsItems.length && (
        <>
          <ModalSettingsPDF
            onUpdatePaymentItem={(items) => {
              localStorage.setItem('payments-data', JSON.stringify(items))
              setPaymentsItems(items)
            }}
            paymentItems={paymentsItems}
          />
          <PaymentWorkerPDF
            paymentItems={paymentsItems}
            paymentPeriod={paymentPeriod}
            fullName={fullName}
            identification={id}
            data={dtoDataPdf}
          />
        </>
      )}
      <DialogBase
        dialogProps={{
          open: openModalHoliday,
          onClose: () => navigation('/app/payment'),
        }}
      >
        <SelectIntervalAndHoliday
          loading={loading}
          onGenerate={(res) => {
            setDataGeneratePayment(res);
          }}
        />
      </DialogBase>
    </>
  );
};
