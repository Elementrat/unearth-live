import clipDB from './db';

export default (req, res) => {
  // res.status(200).json({ clips });
  res.status(200).send(clipDB);
};
