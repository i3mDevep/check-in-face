import { useMutation, useQuery } from '@apollo/client';
import { GetListWorker_getListWorker } from 'src/graphql/queries/__generated__/GetListWorker';
import GET_LIST_WORKER from 'src/graphql/queries/getListWorker.gql';
import CREATE_WORKER from 'src/graphql/mutations/createWorker.gql';
import { CreateWorker, CreateWorkerVariables } from 'src/graphql/mutations/__generated__/CreateWorker';

export const useGraphqlWorker = () => {
  const resultGetWorker = useQuery<{
    getListWorker: GetListWorker_getListWorker[];
  }>(GET_LIST_WORKER);

  const mutationCreateWorker =
    useMutation<CreateWorker, CreateWorkerVariables>(CREATE_WORKER, {  refetchQueries: [GET_LIST_WORKER] });

    return { resultGetWorker, mutationCreateWorker };
};
