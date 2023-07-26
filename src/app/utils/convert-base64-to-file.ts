export const base64ToBlob = (base64String: string): Uint8Array => {
  const base64Content = base64String.split(';base64,')?.pop();
  if (!base64Content) throw new Error('base64Content undefine');
  const decodedData = atob(base64Content);
  const byteArray = new Uint8Array(decodedData.length);

  Array.from(byteArray, (_, i) => decodedData.charCodeAt(i)).forEach(
    (byte, i) => (byteArray[i] = byte)
  );

  return byteArray;
};

export const convertBase64ToFile = (
  base64String: string,
  fileName: string,
  contentType: string
): File => {
  const byteArray = base64ToBlob(base64String);
  const blob = new Blob([byteArray], { type: contentType });

  return new File([blob], fileName, { type: contentType });
};
