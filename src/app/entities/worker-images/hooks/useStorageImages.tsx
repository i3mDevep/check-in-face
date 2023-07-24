import { Storage } from 'aws-amplify';

export const useStorageImages = () => {
  const saveImage = async (params: {
    name: string;
    file: File;
    identification: string;
  }) => {
    await Storage.put(params.name, params.file, {
      contentType: 'image/png',
      customPrefix: {
        public: `${params.identification}/`,
      },
    });
  };

  return { saveImage };
};
