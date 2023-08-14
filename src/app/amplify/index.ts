import { Amplify } from 'aws-amplify';
import {
  Predictions,
  AmazonAIPredictionsProvider,
} from '@aws-amplify/predictions';

const { VITE_IDENTITY_POOL_ID, VITE_BUCKET_IMAGES_WORKER } = import.meta.env;

Amplify.configure({
  Auth: {
    identityPoolId: VITE_IDENTITY_POOL_ID,
    region: 'us-east-1',
  },
  Storage: {
    bucket: VITE_BUCKET_IMAGES_WORKER,
    region: 'us-east-1',
  },
  predictions: {
    identify: {
      identifyEntities: {
        proxy: false,
        region: 'us-east-1',
        celebrityDetectionEnabled: false,
        defaults: {
          collectionId: 'collection-worker-faces-dev',
          maxEntities: 3,
        },
      },
    },
  },
});

// Predictions is optional, because we are working with this in backend, only is here for show how it would be the integration in frontend

Predictions.addPluggable(new AmazonAIPredictionsProvider());