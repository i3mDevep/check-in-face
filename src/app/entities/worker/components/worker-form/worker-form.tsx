import { useForm, SubmitHandler } from 'react-hook-form';
import { useGraphqlWorker } from '../../hooks/useGraphqlWorker';

type WorkerInputs = {
  fullName: string;
  identification: string;
  email?: string;
  phone?: string;
};

export const WorkerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkerInputs>();

  const {
    mutationCreateWorker: [createWorker, { loading }],
  } = useGraphqlWorker();

  const onSubmit: SubmitHandler<WorkerInputs> = (data) => {
    createWorker({
      variables: {
        props: { fullName: data.fullName, identification: data.identification },
      },
    });
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Worker create
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="fullName"
            >
              FullName
            </label>
            <input
              id="fullName"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              {...register('fullName')}
            />
            {errors.fullName && <span>This field is required</span>}
          </div>

          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="identification"
            >
              Identification
            </label>
            <input
              id="identification"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              {...register('identification')}
            />
            {errors.identification && <span>This field is required</span>}
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              {...register('email')}
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              {...register('phone')}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            disabled={loading}
            type="submit"
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            {loading ? 'Loading' : 'Save'}
          </button>
        </div>
      </form>
    </section>
  );
};
