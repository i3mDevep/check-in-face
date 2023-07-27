import { Storage } from 'aws-amplify';
import { useState } from 'react';

export const useStorageMarkTimeWorker = () => {
  const [loading, setLoading] = useState(false);
  const saveImage = async (params: { name: string; file: File }) => {
    setLoading(true);
    const response = await Storage.put(params.name, params.file, {
      contentType: 'image/png',
      customPrefix: {
        public: 'timeline-worker/',
      },
    });
    setLoading(false);
    return response;
  };

  return { saveImage, loading };
};
