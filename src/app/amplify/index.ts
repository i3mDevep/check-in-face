import { Amplify } from 'aws-amplify';
import {
  Predictions,
  AmazonAIPredictionsProvider,
} from '@aws-amplify/predictions';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:49c25012-178b-47ad-b350-f6ee17ea0deb',
    region: 'us-east-1',
  },
  Storage: {
    bucket: 'image-workers-dev',
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

Predictions.addPluggable(new AmazonAIPredictionsProvider());