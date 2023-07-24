// /* eslint-disable import/first */
// import { ChangeEvent, useCallback, useState } from 'react';
// import styled from 'styled-components';

// window.global = window;

// import { Amplify, Storage } from 'aws-amplify';
// import {
//   Predictions,
//   AmazonAIPredictionsProvider,
// } from '@aws-amplify/predictions';
// import { WebcamImage } from './webcam';
// import { Sidebar } from './ui/sidebar';
// import { WorkListTable } from './worker-table';
// import { WorkerList } from './worker/worker-list';
// import { Indicators } from './ui/indicators/indicators';
// import { WorkerInfo } from './worker/worker-info';

// Amplify.configure({
//   Auth: {
//     identityPoolId: 'us-east-1:49c25012-178b-47ad-b350-f6ee17ea0deb',
//     region: 'us-east-1',
//   },
//   Storage: {
//     bucket: 'image-workers-dev',
//     region: 'us-east-1',
//   },
//   predictions: {
//     identify: {
//       identifyEntities: {
//         proxy: false,
//         region: 'us-east-1',
//         celebrityDetectionEnabled: false,
//         defaults: {
//           collectionId: 'collection-worker-faces-dev',
//           maxEntities: 1,
//         },
//       },
//     },
//   },
// });

// Predictions.addPluggable(new AmazonAIPredictionsProvider());

// //us-east-1:636c44b0-5688-4faa-8b6e-624c7eb68087
// export const mergeFileLists = (
//   fileListA: FileList,
//   fileListB: FileList
// ): FileList => {
//   const dataTransfer = new DataTransfer();

//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < fileListA.length; i++) {
//     dataTransfer.items.add(fileListA[i]);
//   }

//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < fileListB.length; i++) {
//     dataTransfer.items.add(fileListB[i]);
//   }

//   return dataTransfer.files;
// };

// export const deleteItemFileList = (files: FileList, position: number) => {
//   const dataTransfer = new DataTransfer();

//   const fileListArr = Array.from(files);
//   fileListArr.splice(position, 1);

//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < fileListArr.length; i++) {
//     dataTransfer.items.add(fileListArr[i]);
//   }

//   return dataTransfer.files;
// };

// const StyledApp = styled.div`
//   // Your style here
//   .App {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100vw;
//     background-color: #282c34;
//   }

//   .Container {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     min-height: 100vh;
//     margin: 0 10px;
//   }

//   img {
//     height: 400px;
//     width: 400px;
//     object-fit: cover;
//   }

//   button {
//     background-color: crimson;
//     color: #fff;
//     margin-top: 10px;
//     padding: 10px 40px;
//     border: none;
//     border-radius: 25px;
//     cursor: pointer;
//   }
// `;

// export function App() {
//   const [files, setFiles] = useState<FileList>();
//   const [isLoading, setIsLoading] = useState(false);
//   const [identification, setIdentification] = useState<string>('');

//   const handleFileChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files) {
//         setFiles((prev) =>
//           prev ? mergeFileLists(prev, e.target.files!) : e.target.files!
//         );
//       }
//     },
//     [setFiles]
//   );

//   async function onChange(e: any) {
//     const file = e.target.files[0];
//     try {
//       if (!identification) return alert('write cc');
//       setIsLoading(true);
//       await Storage.put(file.name, file, {
//         contentType: 'image/png',
//         customPrefix: {
//           public: `${identification}/`,
//         },
//       });
//     } catch (error) {
//       console.log('Error uploading file: ', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="flex">
//       <Sidebar>
//         <WorkerList />
//       </Sidebar>
//       <div className='block'>
//         <div className='flex justify-around'>
//           {/* <WorkerInfo /> */}
//         <Indicators />
//         <Indicators />
//         <Indicators />
//         </div>
// <WorkListTable />

//       </div>
//     </div>
//   );

//   return (
//     <StyledApp>
//       {isLoading && 'Loading...'}
//       <div style={{ display: 'block' }}>
//         <input type="file" onChange={onChange} /> Save image For User:
//         {identification}
//       </div>

//       <div>
//         <input
//           type="text"
//           placeholder="Identification"
//           value={identification}
//           onChange={(e) => setIdentification(e.target.value)}
//         />
//       </div>

//       <WebcamImage />
//       {/* <input
//         multiple
//         className="dn"
//         type="file"
//         name="file"
//         onChange={handleFileChange}
//       />
//       <button onClick={handleKeyPress}>Sent me</button> */}
//       {/* <NxWelcome title="check-in-face-frontend" /> */}
//     </StyledApp>
//   );
// }

// export default App;

import { createBrowserRouter } from 'react-router-dom';
import { Sidebar } from './ui/sidebar';
import { WorkerList } from './entities/worker/components/worker-list';
import { Indicators } from './ui/indicators/indicators';
import { WorkListTable } from './worker-table';
import { WorkerCreatedTable } from './entities/worker/components';
import { WorkerForm } from './entities/worker/components/worker-form/worker-form';
import { InputImages } from './entities/worker-images/components/input-images';
import { SearchWorkerWithImage } from './entities/worker/components/search-worker-with-image';
import { IdentificationProvider } from './shared/provider/identification-provider';
import { ImagesWorker } from './entities/worker-images/components/images-worker';

export const router = createBrowserRouter([
  {
    path: 'app',
    element: <Sidebar />,
    children: [
      {
        index: true,
        path: 'worker',
        element: (
          <>
            <WorkerList />
            <div>
              <div className="flex justify-around">
                <Indicators />
                <Indicators />
                <Indicators />
              </div>
              <WorkListTable />
            </div>
          </>
        ),
      },
      {
        path: 'worker/created',
        element: (
          <>
            {/* <SearchWorkerWithImage /> */}
            <WorkerCreatedTable />
            <WorkerForm />
          </>
        ),
      },
      {
        path: 'worker-image/',
        element: (
          <IdentificationProvider>
            <WorkerList />
            <div className="flex flex-col justify-center items-center m-auto gap-5">
              <ImagesWorker />
              <InputImages />
            </div>
          </IdentificationProvider>
        ),
      },
    ],
  },
]);
