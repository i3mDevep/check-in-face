import { useQuery } from '@apollo/client';
import { GetListWorker_getListWorker } from 'src/graphql/queries/__generated__/GetListWorker';
import GET_LIST_WORKER from 'src/graphql/queries/getListWorker.gql';
import { WorkerItem } from './worker-item';

export const WorkerList = () => {
  const { data } = useQuery<{
    getListWorker: GetListWorker_getListWorker[];
  }>(GET_LIST_WORKER);

  return (
    <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
      <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">
        Workers
      </h2>
      <div className="mt-8 space-y-4">
        {data?.getListWorker.map((worker) => (
          <WorkerItem {...worker} />
        ))}
      </div>
    </div>
  );
};
