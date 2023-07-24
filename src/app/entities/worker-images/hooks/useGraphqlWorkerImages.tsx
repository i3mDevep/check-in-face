import { useQuery } from '@apollo/client';
import { GetListWorkerImages_getWorkerImages } from 'src/graphql/queries/__generated__/GetListWorkerImages';
import GET_LIST_WORKER_IMAGES from 'src/graphql/queries/getListWorkerImages.gql';

export const useGraphqlWorkerImages = (identification?: string) => {
  const resultGetWorkerImages = useQuery<
    {
      getWorkerImages: GetListWorkerImages_getWorkerImages[];
    },
    { identification: string }
  >(GET_LIST_WORKER_IMAGES, {
    variables: { identification: identification as string },
    skip: !identification,
  });

  return { resultGetWorkerImages };
};
