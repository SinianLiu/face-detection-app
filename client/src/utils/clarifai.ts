const returnClarifai = (imageUrl: string) => {
  const PAT = '2ac7ce01b0a44b3e83f45cc6b3e0bea3';
  const USER_ID = 'stellaliu';
  const APP_ID = 'test';
  // const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

const calculateFaceLocation = (boundingBox: any) => {
  const image = document.getElementById('input-image') as HTMLImageElement;
  const width = Number(image?.width);
  const height = Number(image?.height);

  const topRow = boundingBox.top_row * height;
  const leftCol = boundingBox.left_col * width;
  const bottomRow = height - boundingBox.bottom_row * height;
  const rightCol = width - boundingBox.right_col * width;

  return { topRow, leftCol, bottomRow, rightCol };
};

export { returnClarifai, calculateFaceLocation };

