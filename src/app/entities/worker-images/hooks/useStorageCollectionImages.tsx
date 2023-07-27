import { Storage } from 'aws-amplify';

export const useStorageCollectionImages = () => {
  const saveImage = async (params: {
    name: string;
    file: File;
    identification: string;
  }) => {
    await Storage.put(params.name, params.file, {
      contentType: 'image/png',
      customPrefix: {
        public: `collection-images/${params.identification}/`,
      },
    });
  };

  return { saveImage };
};
