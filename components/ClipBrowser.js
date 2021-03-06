import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import COLORS from '../utils/colors';
import { listClips } from '../utils/api-client';

const ClipBrowserRoot = styled.div`
  padding: 0px 100px;
  margin: 50px auto;
  max-width: 1400px;
  @media screen and (max-width: 600px){
    max-width: 600px;
  }
  width: 100%;
`;

const ClipBrowserGrid = styled.div`
  max-width: 1400px;
  justify-self:center;
  width: 100%;
  display: grid;
  margin: auto;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 100px));
  align-items: start;
  justify-content: left;
  justify-items: start;
  align-content: start;
  align-items: center;
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
  width: 100px;
  height: 100px;
  display: flex;
  justify-content:center;
  align-items: center;
  background: rgba(255,255,255,.05);
  backdrop-filter: blur(20px);
  cursor:pointer;
  transition: transform .2s ease;
  position: relative;
  border-radius: 10px;
  overflow: hidden;

  ::after{
    content:'';
    width: 0%;
    background-color: ${COLORS.brand};
    position:absolute;
    bottom:0;
    height:5px;
    left: 0;
    right: 0;
    animation: ${(props) => (props.playing ? css`${playbackIndicator} ${props.duration}s linear` : css`none`)};
  }

  :hover{
    color: white;
    border: 1px solid rgba(255,255,255,.25);
    transform: translate(0px, -5px);
  }
`;

const ClipsStatusText = styled.div`
  color: ${COLORS.lightText3};
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: opacity .5s ease;
`;

const Clip = ({ clip, index }) => {
  const [playing, setPlaying] = useState(false);

  const tryPlayClip = async () => {
    const clipAudiobase64 = await fetch(clip.audioBlob);
    const clipBlob = await clipAudiobase64.blob();
    setPlaying(true);
    setTimeout(() => { setPlaying(false); }, clip.duration * 1000);
    const audioURL = URL.createObjectURL(clipBlob);
    const audio = new Audio(audioURL);
    audio.play();
  };

  return (
    <ClipRoot
      key={clip.localID || index}
      onClick={() => tryPlayClip(clip)}
      playing={playing}
      duration={clip.duration}
    >
      {clip.localID?.slice(0, 5)}
    </ClipRoot>
  );
};

const ClipBrowser = () => {
  const [clips, setClips] = useState(null);

  const fetchClips = async () => {
    const retrievedClips = await listClips();
    setClips(retrievedClips);
  };

  useEffect(() => {
    fetchClips();
  }, []);

  return (
    <>
      <ClipBrowserRoot>
        <h1>Latest Community Clips</h1>
        <ClipsStatusText show={clips?.length === 0}>
          No clips have been uploaded recently...
          Check back soon!
        </ClipsStatusText>
        <ClipBrowserGrid>
          {clips && clips.map((clip, index) => <Clip clip={clip} index={index} />)}
        </ClipBrowserGrid>
      </ClipBrowserRoot>
    </>
  );
};
export default ClipBrowser;
