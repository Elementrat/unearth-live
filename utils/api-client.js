const API_BASE_URL = '/api';

const uploadClip = async (clipMetadata, audioBlob) => {
  const clipURL = `${API_BASE_URL}/clip/${clipMetadata.localID}`;

  const metadataResult = await fetch(clipURL, {
    method: 'POST',
    body: JSON.stringify({
      ...clipMetadata,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const audioDataResult = await fetch(clipURL, {
    method: 'POST',
    body: audioBlob,
    headers: {
      'Content-type': 'audio/ogg',
    },
  });

  return { metadataResult, audioDataResult };
};

const listClips = async () => {
  const clipURL = `${API_BASE_URL}/clips/`;

  const clips = await fetch(clipURL, {
    method: 'GET',
  });

  return clips.json();
};

export { uploadClip, listClips };
