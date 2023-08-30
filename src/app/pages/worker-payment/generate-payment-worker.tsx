import { CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QueryGenerateWorkerPaymentArgs } from 'src/api-graphql-types';
import {
  PaymentWorkerPDF,
} from 'src/app/entities/worker-payments/components/generate-worker-payment';
import { SelectIntervalAndHoliday } from 'src/app/entities/worker-payments/components/select-interval-and-holidays/select-interval-and-holidays';
import { useGraphqlPayments } from 'src/app/entities/worker-payments/hooks/useGraphqlPayment';
import { useGraphqlWorker } from 'src/app/entities/worker/hooks/useGraphqlWorker';
import { DialogBase } from 'src/app/shared/components/dialog-base';

export const GeneratePaymentWorker = () => {
  const { identification } = useParams();
  const navigation = useNavigate();
  const [openModalHoliday, setOpenModalHoliday] = useState(true);
  const [dataGeneratePayment, setDataGeneratePayment] = useState<{
    start: string;
    end: string;
    holidays: number[];
  }>();

  const dtoQueryGenerator: QueryGenerateWorkerPaymentArgs | undefined =
    dataGeneratePayment && identification
      ? {
          query: {
            ...dataGeneratePayment,
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

  const {
    detailWorker: [getDetailWorker, result],
  } = useGraphqlWorker(true);

  useEffect(() => {
    getDetailWorker({
      variables: { identification: identification as string },
    });
  }, [getDetailWorker, identification]);

  const dtoDataPdf = (data?.generateWorkerPayment as PaymentWorker[]) ?? [];
  if (!result.data) return <CircularProgress />;

  const { fullName, identification: id } = result.data.getDetailWorker;

  const paymentPeriod = `${dayjs(dataGeneratePayment?.start).format(
    'MMMM D, YYYY'
  )}  -  ${dayjs(dataGeneratePayment?.end).format('MMMM D, YYYY')}`;

  return (
    <>
      {!openModalHoliday && (
        <PaymentWorkerPDF
          fullName={fullName}
          identification={id}
          paymentPeriod={paymentPeriod}
          data={dtoDataPdf}
        />
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
