import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import COLORS from '../utils/colors';
import { startRecording, stopRecording } from '../utils/audio';
import { setRecording } from '../reducers/recorder';
import { saveClip } from '../reducers/user';
import { selectClip } from '../reducers/player';

const ContentRoot = styled.div`
    grid-area: content;
    background-color: ${COLORS.shade1};
    border-top-left-radius: 10px;
    padding: 15px;
    display: flex;
    justify-content:center;
    align-items: center;
`;

const RecorderRoot = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr 50px;
    grid-template-columns: auto;
    width: 100%;
    grid-gap: 30px;
`;

const RecordBtnRoot = styled.div`
    position: relative;
    width: 125px;
    height: 125px;
    border-radius: 75px;
    display:flex;
    justify-content:center;
    align-items:center;
    user-select: none;
    transition: background-color .2s ease, transform .2s ease, border .2s ease;
    cursor: pointer;
    border: 3px solid ${(props) => (props.recording ? 'red' : COLORS.brand)};
    background-color: ${(props) => (props.recording ? 'red' : COLORS.brand)};
    :hover{
        background-color: ${(props) => (props.recording ? 'red' : COLORS.brand)};
        border: 3px solid ${(props) => (props.recording ? 'red' : 'white')};
    }
`;

const RecordRoot = styled.div`
    display: flex;
    justify-content:center;
`;

const RecorderInfo = styled.span`
    background-color: rgba(0,0,0,.5);
    display; flex;
    padding: 10px 15px;
    border-radius: 5px;
`;
const InfoRoot = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
`;

const slideOut = keyframes`
  0% {
    opacity: 0;
  }

  50%{
      opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(1.3);
  }
`;

const Glow = styled.div`
  width: 125px;
  height: 125px;
  border: 3px solid rgba(255,255,255,.5);
  border-radius: 100px;
  position: absolute;
  animation: ${(props) => (props.show ? css`${slideOut} 3s ease infinite` : css`none`)}; 
  animation-delay: ${(props) => props.delay};
  ${(props) => (props.show ? 'opacity: 1' : 'opacity: 0')};
  transition: opacity .1s ease;
`;

const clipBlobs = {};

const RecordButton = () => {
  const recording = useSelector((state) => state.recorder.recording);
  const clips = useSelector((state) => state.user.clips);

  const dispatch = useDispatch();

  const attemptStartRecording = async () => {
    try {
      await startRecording();
      dispatch(setRecording(true));
    } catch (e) {
      console.error('unable to record', e);
    }
  };

  const attemptStopRecording = async () => {
    try {
      const {
        audioURL, duration, localID, audioBlob,
      } = await stopRecording();
      dispatch(setRecording(false));
      dispatch(saveClip({
        audioURL,
        duration,
        localID,
        name: `${localID.slice(0, 5)}`,
      }));
      dispatch(selectClip(clips?.length));
      clipBlobs[localID] = audioBlob;
    } catch (e) {
      console.error('Unable to stop recording', e);
    }
  };

  const toggleRecording = () => {
    if (recording) attemptStopRecording();
    else attemptStartRecording();
  };

  return (
    <RecordBtnRoot onClick={toggleRecording} recording={recording}>
      <Glow delay="0s" show={recording} />
      <Glow delay="1s" show={recording} />
      <Glow delay="2s" show={recording} />
      <div style={{ filter: 'brightness(100) invert(1)' }}>
        <Image src="/assets/mic-icon.png" width="50px" height="50px" />
      </div>
    </RecordBtnRoot>
  );
};

const Recorder = () => {
  const recording = useSelector((state) => state.recorder.recording);
  const clips = useSelector((state) => state.user.clips);

  return (
    <ContentRoot>
      <RecorderRoot>
        <InfoRoot>
          <RecorderInfo>
            {recording ? 'Recording' : clips?.length <= 0 ? 'Record your first clip' : 'Record a new clip'}
          </RecorderInfo>
        </InfoRoot>
        <RecordRoot>
          <RecordButton />
        </RecordRoot>
      </RecorderRoot>
    </ContentRoot>
  );
};

export default Recorder;
export { clipBlobs };
