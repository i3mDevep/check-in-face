import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GetListWorker_getListWorker } from 'src/graphql/queries/__generated__/GetListWorker';
import GET_LIST_WORKER from 'src/graphql/queries/getListWorker.gql';
import GET_DETAIL_WORKER from 'src/graphql/queries/getDetailWorker.gql';

import CREATE_WORKER from 'src/graphql/mutations/createWorker.gql';
import {
  CreateWorker,
  CreateWorkerVariables,
} from 'src/graphql/mutations/__generated__/CreateWorker';
import {
  GetDetailWorkerVariables,
  GetListWorker_getDetailWorker,
} from 'src/graphql/queries/__generated__/GetDetailWorker';

export const useGraphqlWorker = (skipList?: boolean) => {
  const resultGetWorker = useQuery<{
    getListWorker: GetListWorker_getListWorker[];
  }>(GET_LIST_WORKER, { skip: skipList });

  const detailWorker = useLazyQuery<
    { getDetailWorker: GetListWorker_getDetailWorker },
    GetDetailWorkerVariables
  >(GET_DETAIL_WORKER);

  const mutationCreateWorker = useMutation<CreateWorker, CreateWorkerVariables>(
    CREATE_WORKER,
    { refetchQueries: [GET_LIST_WORKER, GET_DETAIL_WORKER] }
  );

  return { resultGetWorker, mutationCreateWorker, detailWorker };
};
