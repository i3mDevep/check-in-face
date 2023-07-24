import { useCallback, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { v4 as uuidV4 } from 'uuid';
import { Predictions } from '@aws-amplify/predictions';

const base64ToBlob = (base64String: string): Uint8Array => {
  const base64Content = base64String.split(';base64,')?.pop();
  if(!base64Content) throw new Error('base64Content undefine')
  const decodedData = atob(base64Content);
  const byteArray = new Uint8Array(decodedData.length);

  Array.from(byteArray, (_, i) => decodedData.charCodeAt(i)).forEach(
    (byte, i) => (byteArray[i] = byte)
  );

  return byteArray;
};

const convertBase64ToFile = (
  base64String: string,
  fileName: string,
  contentType: string
): File => {
  const byteArray = base64ToBlob(base64String);
  const blob = new Blob([byteArray], { type: contentType });

  return new File([blob], fileName, { type: contentType });
};

export function SearchWorkerWithImage() {
  const [img, setImg] = useState<string | null | undefined>(null);
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: 'user',
  };

  const imageFile = useMemo(
    () => (img ? convertBase64ToFile(img, uuidV4(), 'image/jpeg') : null),
    [img]
  );

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button onClick={() => setImg(null)}>Retake</button>
          <button
            onClick={async () => {
              if (!imageFile) return;
              const response = await Predictions.identify({
                entities: {
                  collection: true,
                  source: {
                    file: imageFile,
                  },
                },
              });
              alert(JSON.stringify(response))
            }}
          >
            Validate
          </button>
        </>
      )}
    </div>
  );
}
