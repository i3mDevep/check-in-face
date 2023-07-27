import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './shared/components/main-layout';
import { WorkerMain } from './pages/worker-main';
import { MarkWorkerTime } from './entities/worker-timeline/components/mark-worker-time';
import { WorkerTracerTime } from './pages/worker-tracer-time';
import { WorkerTracerTimeDetail } from './pages/worker-tracer-time-detail';

export const router = createBrowserRouter([
  {
    path: 'app',
    element: (
      <>
        <MarkWorkerTime />
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
            index: true
          },
          {
            path: ':identification',
            element: <WorkerTracerTimeDetail />,
          },
        ],
      },
    ],
  },
]);
