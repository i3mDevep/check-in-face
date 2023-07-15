import styled from 'styled-components';
import axios from 'axios';

import NxWelcome from './nx-welcome';
import { ChangeEvent, useCallback, useState } from 'react';

export const mergeFileLists = (
  fileListA: FileList,
  fileListB: FileList
): FileList => {
  const dataTransfer = new DataTransfer();

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < fileListA.length; i++) {
    dataTransfer.items.add(fileListA[i]);
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < fileListB.length; i++) {
    dataTransfer.items.add(fileListB[i]);
  }

  return dataTransfer.files;
};

export const deleteItemFileList = (files: FileList, position: number) => {
  const dataTransfer = new DataTransfer();

  const fileListArr = Array.from(files);
  fileListArr.splice(position, 1);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < fileListArr.length; i++) {
    dataTransfer.items.add(fileListArr[i]);
  }

  return dataTransfer.files;
};

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const [files, setFiles] = useState<FileList>();
  const [isLoading, setIsLoading] = useState(false);

  const upload = useCallback(async (presignedUrl: string, file: File) => {
    await axios
      .put(presignedUrl, file)
      .catch((error) =>
        console.error(error.response.data, { request: error.request })
      );
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFiles((prev) =>
          prev ? mergeFileLists(prev, e.target.files!) : e.target.files!
        );
      }
    },
    [setFiles]
  );

  const handleKeyPress = useCallback(
    async (event: any) => {
      setIsLoading(true);
      const response = await Promise.all(
        Array.from(files ?? []).map((file) => upload('https://image-workers-dev.s3.us-east-1.amazonaws.com/1017250202/1c2c9ec9-9a17-4b73-a9db-55171e7072bc.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIARPPUQXDI5QZ6LPES%2F20230712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230712T072844Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLWVhc3QtMSJIMEYCIQD019pQP6Gbubqfu1rxqxPUuVWcnT4khbU23BULsrLxbgIhAMNxb%2F9lmoOQ90H22iZk7KdCX%2BKaFor2G5UwqOjwuTixKpoDCNH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMMTAxOTgxNDAzMzQ1IgxftLVAiecvLUlskQgq7gJ7e%2BNi%2BBSGvkvCQca5e0STrzXOpIiYG1eY0DTpqmGSonv77zfnLfWDX8qzqZ%2BLMu20RWlr%2FP72MEJn9yXr0HY8Mf5shT%2FPH2ewqcpmxOjyOaSd8ML8mfa53lL6TWWQoXANIzdjQsjiw1qyFuA5fjBEp%2ButdN5BkB2uC2Cn1SbSngKUvWLEEkYV41tOPPzIAChgcL84%2FDTHmWP%2F6ca%2BdN%2BXDiR%2F90tQj4UiAaQYPyXZoEV7HEqdPXFrRRHUWX7vxiYRc9L4PoXFrL72adZexFioxHEIXgW1Tn4Bq8QnuEO2yANP5O5LWWpOlid4sl4f6VHDsui71nMg8wlQUunjwibNhnl0g6Pi7PUkghyoJ9oCF7ZyVB4CMpNbotL26Q2PW5gYHjMFbmxbULeWtc4e03TS8No600WOX5cOOEMDtO%2B5aFRWr5eTtHHYyVzWkUakBUpejlgQswiPlEZnQTYI1gMWaodyhRbj7x%2B0o6B9bU0wrqq5pQY6nAGEnQ%2FXBqJTBELnp5t52dnVGrCzvRGedvdN4eWpwThjjiSlJ6ievvMJSX3qpmxmbh0GIn3oof77vlHYVS5pmSQa5NmXepJbLZfrKeFjAsxpzpjQlIudOvLCcV5BfYpicCBE58tvHbeVbiMCf46qpqTM7c986mfJZOp8vJZA%2BJ6Jw0Nv09eTOtve4xWF9tn1z5CvE8esj2AkGRdUaaU%3D&X-Amz-Signature=cec846eb020abde06e0856c93d120e242844f01c7d550d04d6787d76d5d55290&X-Amz-SignedHeaders=host&x-id=PutObject', file))
      ).finally(() => setIsLoading(false));
    },
    [files, upload]
  );

  return (
    <StyledApp>
      <input
        multiple
        className="dn"
        type="file"
        name="file"
        onChange={handleFileChange}
      />
      <button onClick={handleKeyPress}>Sent me</button>
      <NxWelcome title="check-in-face-frontend" />
    </StyledApp>
  );
}

export default App;
