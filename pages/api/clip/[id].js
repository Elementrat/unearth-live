import clipDB from '../db';

export default function handler(req, res) {
  const { id } = req.query;

  const { body } = req;

  const {
    duration, localID, name,
  } = body;

  // Metadata Upload
  if (localID) {
    clipDB.push({
      duration, localID, name,
    });
  } else {
    const audioBlob = body;
    const clip = clipDB.find((c) => c.localID === id);
    if (clip) {
      clip.audioBlob = audioBlob;
    }
  }

  res.end(`Clip Saved: ${id}`);
}
