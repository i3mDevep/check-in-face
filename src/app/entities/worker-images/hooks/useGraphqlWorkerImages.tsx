import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  DisassociateWorkerImages,
  DisassociateWorkerImagesVariables,
} from 'src/graphql/mutations/__generated__/DisassociateWorkerImages';
import { GetListWorkerImages_getWorkerImages } from 'src/graphql/queries/__generated__/GetListWorkerImages';
import GET_LIST_WORKER_IMAGES from 'src/graphql/queries/getListWorkerImages.gql';
import DISASSOCIATE_WORKER_IMAGES from 'src/graphql/mutations/disassociateWorkerImages.gql';

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

  const lazyGetWorkerImages = useLazyQuery<
    {
      getWorkerImages: GetListWorkerImages_getWorkerImages[];
    },
    { identification: string }
  >(GET_LIST_WORKER_IMAGES, { fetchPolicy: 'network-only' });

  const disassociateDeleteImagesWorker = useMutation<
    DisassociateWorkerImages,
    DisassociateWorkerImagesVariables
  >(DISASSOCIATE_WORKER_IMAGES, { refetchQueries: [GET_LIST_WORKER_IMAGES] });

  return {
    resultGetWorkerImages,
    disassociateDeleteImagesWorker,
    lazyGetWorkerImages,
  };
};
