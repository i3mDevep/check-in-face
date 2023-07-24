import { WorkerItem } from './worker-item';
import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';
import {
  useIdentificationDispatch,
  useIdentificationState,
} from 'src/app/shared/provider/identification-provider';
import { SelectedActionType } from 'src/app/shared/provider/identification-provider/state';

export const WorkerList = () => {
  const {
    resultGetWorker: { data },
  } = useGraphqlWorker();
  const dispatchIdentification = useIdentificationDispatch();
  const { workerSelected } = useIdentificationState();

  return (
    <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
      <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">
        Workers
      </h2>
      <div className="mt-8 space-y-4">
        {data?.getListWorker.map((worker) => (
          <WorkerItem
            key={worker.identification}
            workerSelected={workerSelected?.identification}
            onClickWorker={(worker_) =>
              dispatchIdentification({
                type: SelectedActionType.SELECT,
                payload: worker_,
              })
            }
            {...worker}
          />
        ))}
      </div>
    </div>
  );
};
