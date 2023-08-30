import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import MARK_TIME__WORKER from 'src/graphql/mutations/markTimeWorker.gql';
import GET_LIST_MARK_TIME__WORKER from 'src/graphql/queries/getListWorkerMarkTime.gql';
import GET_WORKER_INTERVALS_TIME from 'src/graphql/queries/getWorkerIntervalsTime.gql';

import {
  MarkTimeWorker,
  MarkTimeWorkerVariables,
} from 'src/graphql/mutations/__generated__/MarkTimeWorker';
import {
  GetListWorkerMarkTimeVariables,
  GetListWorkerMarkTime_getListWorkerMarkTime,
} from 'src/graphql/queries/__generated__/GetListWorkerMarkTime';
import { Query, QueryGetWorkerIntervalsTimeArgs } from 'src/api-graphql-types';

type GetListWorkerMarkTimeResponse = {
  getListWorkerMarkTime: GetListWorkerMarkTime_getListWorkerMarkTime[];
};

export const useGraphqlMarkTimeWorker = (
  params?: GetListWorkerMarkTimeVariables
) => {
  const query = params?.query;
  const resultMarkTimeWorker = useQuery<
    GetListWorkerMarkTimeResponse,
    GetListWorkerMarkTimeVariables
  >(GET_LIST_MARK_TIME__WORKER, {
    variables: { query } as GetListWorkerMarkTimeVariables,
    skip: !query,
  });

  const lazyQuery = useLazyQuery<
    GetListWorkerMarkTimeResponse,
    GetListWorkerMarkTimeVariables
  >(GET_LIST_MARK_TIME__WORKER);

  const lazyQueryIntervalsTime = useLazyQuery<
    Pick<Query, 'getWorkerIntervalsTime'>,
    QueryGetWorkerIntervalsTimeArgs
  >(GET_WORKER_INTERVALS_TIME);

  const mutationMarkTimeWorker = useMutation<
    MarkTimeWorker,
    MarkTimeWorkerVariables
  >(MARK_TIME__WORKER, { refetchQueries: [GET_LIST_MARK_TIME__WORKER] });

  return {
    mutationMarkTimeWorker,
    resultMarkTimeWorker,
    lazyQuery,
    lazyQueryIntervalsTime,
  };
};
