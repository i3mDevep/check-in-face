import { v4 as uuidV4 } from 'uuid';
import { useStorageImages } from '../../hooks/useStorageImages';
import { useIdentificationState } from 'src/app/shared/provider/identification-provider';
import { useGraphqlWorkerImages } from '../../hooks/useGraphqlWorkerImages';

export const InputImages = () => {
  const { resultGetWorkerImages } = useGraphqlWorkerImages();
  const { workerSelected } = useIdentificationState();
  const { saveImage } = useStorageImages();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !workerSelected)
      return alert('Error empty file or identification');
    await saveImage({
      file,
      identification: workerSelected?.identification,
      name: uuidV4(),
    });
    await new Promise((resolve) => setTimeout(resolve, 3000))
    await resultGetWorkerImages.refetch({
      identification: workerSelected.identification,
    });
  };

  return (
    <div className='w-36 h-48 '>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-gray-500 dark:text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>

        <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
          Image PNG
        </h2>

        <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
          Upload or darg & drop your file PNG or JPG
        </p>

        <input
          id="dropzone-file"
          type="file"
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  );
};
