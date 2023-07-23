import { WorkerItem } from './worker-item';
import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';

export const WorkerList = () => {
  const { resultGetWorker: { data } } = useGraphqlWorker()

  return (
    <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
      <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">
        Workers
      </h2>
      <div className="mt-8 space-y-4">
        {data?.getListWorker.map((worker) => (
          <WorkerItem key={worker.identification} {...worker} />
        ))}
      </div>
    </div>
  );
};
