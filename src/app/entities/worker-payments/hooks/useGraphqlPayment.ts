import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import GET_TEMPLATE_PAYMENT from 'src/graphql/queries/getTemplatePayment.gql';
import GENERATE_WORKER_PAYMENT from 'src/graphql/queries/generatePaymentWorker.gql';

import PUT_TEMPLATE_PAYMENT from 'src/graphql/mutations/putTemplatePayment.gql';

import {
  MutationPutTemplatePaymentArgs,
  MutationResolvers,
  Query,
  QueryGenerateWorkerPaymentArgs,
} from 'src/api-graphql-types';

export const useGraphqlPayments = ({
  skipPaymentTemplate,
  generateWorkerPaymentArgs,
  onCompletedGenerator,
}: {
  skipPaymentTemplate: boolean;
  generateWorkerPaymentArgs?: QueryGenerateWorkerPaymentArgs;
  onCompletedGenerator?: () => void
}) => {
  const resultGetPaymentTemplate = useQuery<
    {
      getPaymentTemplate: Query['getPaymentTemplate'];
    },
    { identification: string }
  >(GET_TEMPLATE_PAYMENT, { skip: skipPaymentTemplate });

  const resultGeneratePaymentWorker = useQuery<
    {
      generateWorkerPayment: Query['generateWorkerPayment'];
    },
    QueryGenerateWorkerPaymentArgs
  >(GENERATE_WORKER_PAYMENT, {
    variables: generateWorkerPaymentArgs,
    skip: !generateWorkerPaymentArgs,
    onCompleted: () => onCompletedGenerator?.()
  });

  const lazyGetPaymentTemplate = useLazyQuery<
    {
      getPaymentTemplate: Query['getPaymentTemplate'];
    },
    { identification: string }
  >(GET_TEMPLATE_PAYMENT);

  const putTemplatePayment = useMutation<
    MutationResolvers['putTemplatePayment'],
    MutationPutTemplatePaymentArgs
  >(PUT_TEMPLATE_PAYMENT, { refetchQueries: [GET_TEMPLATE_PAYMENT] });

  return {
    resultGetPaymentTemplate,
    putTemplatePayment,
    lazyGetPaymentTemplate,
    resultGeneratePaymentWorker,
  };
};
