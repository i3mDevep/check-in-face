import { GetListWorker_getListWorker } from 'src/graphql/queries/__generated__/GetListWorker';

export const WorkerItem = (
  props: GetListWorker_getListWorker & {
    onClickWorker: (worker: GetListWorker_getListWorker) => void;
    workerSelected: string | undefined;
  }
) => {
  const { fullName, identification, workerSelected } = props;
  const { onClickWorker, ...workerProps } = props;
  return (
    <button
      onClick={() => onClickWorker(workerProps)}
      className={`${
        workerSelected === identification && 'dark:bg-gray-800 bg-gray-100'
      } flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none`}
    >
      <img
        className="object-cover w-8 h-8 rounded-full"
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
        alt={identification}
      />

      <div className="text-left rtl:text-right">
        <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
          {fullName}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {identification}
        </p>
      </div>
    </button>
  );
};
