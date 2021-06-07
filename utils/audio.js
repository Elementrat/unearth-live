import { v4 as uuid } from 'uuid';

let mediaRecorder;
let audioChunks = [];
let startTime;

const startRecording = async () => {
  startTime = new Date();
  audioChunks = [];
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.addEventListener('dataavailable', (event) => {
    audioChunks.push(event.data);
  });

  mediaRecorder.start();
};

const stopRecording = async () => new Promise((resolve) => {
  mediaRecorder.onstop = () => {
    const localID = uuid();

    const endTime = new Date();
    const secondsBetween = endTime - startTime;
    const duration = Math.round(secondsBetween / 1000);

    const audioBlob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
    const audioURL = URL.createObjectURL(audioBlob);

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);

    reader.onloadend = () => {
      const b64Data = reader.result;
      resolve({
        audioURL, duration, localID, audioBlob: b64Data,
      });
    };
  };
  mediaRecorder.stop();
});

export { startRecording, stopRecording };
