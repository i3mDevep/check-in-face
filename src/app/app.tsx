import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from './shared/components/main-layout';
import { WorkerMain } from './pages/worker-main';

import { WorkerTracerTime } from './pages/worker-tracer-time/list';
import { WorkerTracerTimeDetail } from './pages/worker-tracer-time/detail';

import { MarkWorkerTime } from './entities/worker-timeline/components/mark-worker-time';
import { WorkerPayment } from './pages/worker-payment/payment-template';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarkWorkerTime modeFab={false} />,
  },
  {
    path: 'app',
    element: (
      <>
        <MarkWorkerTime modeFab />
        <MainLayout />
      </>
    ),
    children: [
      {
        path: 'worker',
        element: <WorkerMain />,
      },
      {
        path: 'tracer-time',
        children: [
          {
            element: <WorkerTracerTime />,
            index: true,
          },
          {
            path: ':identification',
            element: (
              <WorkerTracerTimeDetail />
            ),
          },
        ],
      },
      {
        path: 'payment',
        element: <WorkerPayment />
      }
    ],
  },
]);
