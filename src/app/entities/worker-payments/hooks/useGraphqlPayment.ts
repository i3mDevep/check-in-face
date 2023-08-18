import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import GET_TEMPLATE_PAYMENT from 'src/graphql/queries/getTemplatePayment.gql';
import PUT_TEMPLATE_PAYMENT from 'src/graphql/mutations/putTemplatePayment.gql';

import {
  MutationPutTemplatePaymentArgs,
  MutationResolvers,
  Query,
} from 'src/api-graphql-types';

export const useGraphqlPayments = () => {
  const resultGetPaymentTemplate = useQuery<
    {
      getPaymentTemplate: Query['getPaymentTemplate'];
    },
    { identification: string }
  >(GET_TEMPLATE_PAYMENT);

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
  };
};
