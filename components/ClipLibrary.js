import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import COLORS from '../utils/colors';
import { selectClip } from '../reducers/player';
import { beginClipUpload, finishClipUpload } from '../reducers/user';
import { uploadClip } from '../utils/api-client';
import { clipBlobs } from './ClipRecorder';

const slideIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ClipLibraryRoot = styled.div`
    color: ${COLORS.lightText2}; 
`;

const ClipLibraryTitle = styled.span`
    font-weight: bold;
`;

const ClipsRoot = styled.div`
    display: flex;
    flex-direction:column;
    margin-top: 10px;
`;

const playbackIndicator = keyframes`
  from{
      width: 0%;
  }

  to{
      width: 100%;
  }
`;

const ClipRoot = styled.div`
    display: flex;
    padding-top: 10px;
    padding: 8px 8px;
    justify-content: space-between;
    cursor: pointer;
    animation: ${slideIn} .2s ease;
    background-color: ${(props) => (props.selected ? 'rgba(255,255,255,.02)' : 'rgba(255,255,255,.0)')};
    border-radius: 5px;
    padding-right: 15px;
    border: 1px solid transparent;
    margin-bottom: 4px;
    transition: transform .1s ease;
    position: relative;

    :hover{
        border: 1px solid rgba(255,255,255, .1);
        transform: translate(2px);
        color: white;
    }
    ::after{
        content:'';
        width: 0%;
        background-color: ${COLORS.brand};
        position:absolute;
        bottom:0;
        height:2px;
        left: 0;
        right: 0;
        animation: ${(props) => (props.selected ? css`${playbackIndicator} ${props.duration}s linear forwards` : css`none`)};
    }
`;

const ClipUploadButton = styled.div`
    position: relative;
    width: 50px;
    display:flex;
    justify-content:center;
    align-items:center;
    transition: filter 1s ease;
    filter: ${(props) => {
    if (props.syncStatus === 'uploading') {
      return 'brightness(.5) invert(1)';
    }
    if (props.syncStatus === 'uploaded') {
      return 'brightness(0) invert(1)';
    }
    return 'none';
  }};
    :hover{
        opacity: ${(props) => (props.syncStatus === 'uploaded' ? '1' : '.5')}
    }
`;

const ClipName = styled.div`
    width: auto;
    margin: 0px 15px;
    width: 100%;
    display:flex;
    align-items:center;
`;

const ClipDuration = styled.div`
    color: ${COLORS.lightText2};
    width: 1fr;
`;

const Clip = ({ clip, index, selected }) => {
  const dispatch = useDispatch();
  const tryUpload = async () => {
    try {
      dispatch(beginClipUpload(index));
      const audioBlob = clipBlobs[clip.localID];
      const { duration, localID, name } = clip;
      const { metadataResult, audioDataResult } = await uploadClip({ duration, localID, name },
        audioBlob);

      if (metadataResult.status === 200 && audioDataResult.status === 200) {
        dispatch(finishClipUpload(index));
      }
    } catch (e) {
      console.error('Unable to upload', e);
    }
  };

  return (
    <ClipRoot
      key={clip.localID}
      selected={selected}
      duration={clip.duration}
      onClick={() => {
        dispatch(selectClip(index));
      }}
    >

      <ClipUploadButton
        syncStatus={clip.syncStatus}
        onClick={tryUpload}
      >
        <Image src="/assets/upload.png" width="25px" height="25px" />
      </ClipUploadButton>
      <ClipName>
        {clip.name}
      </ClipName>
      <ClipDuration>
        {clip.duration}
        s
      </ClipDuration>
    </ClipRoot>
  );
};

const ClipLibrary = () => {
  const clips = useSelector((state) => state.user.clips);
  const selectedClipIndex = useSelector((state) => state.player.selectedClipIndex);

  return (
    <ClipLibraryRoot>
      <ClipLibraryTitle>
        Your Clips
      </ClipLibraryTitle>
      <ClipsRoot>
        {clips.map((clip, index) => (
          <Clip
            key={clip.localID}
            clip={clip}
            index={index}
            selected={selectedClipIndex === index}
          />
        ))}
      </ClipsRoot>
    </ClipLibraryRoot>
  );
};

export default ClipLibrary;
