import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Head from 'next/head';
import COLORS from '../utils/colors';

const PlayerRoot = styled.div`
    display: flex;
    cursor: pointer;
    color: ${COLORS.lightText2};
    background-color: ${COLORS.shade4};
`;

const PlayerStatusText = styled.div``;

const ClipPlayer = () => {
  const [clip, setClip] = useState();

  const clips = useSelector((state) => state.user.clips);
  const selectedClipIndex = useSelector((state) => state.player.selectedClipIndex);
  const playing = useSelector((state) => state.player.playing);

  const playClip = (currentClip) => {
    setClip(currentClip);
    const audio = new Audio(currentClip.audioURL);
    audio.play();
  };

  useEffect(() => {
    const currentClip = clips[selectedClipIndex];
    if (currentClip && playing) {
      playClip(currentClip);
    }
  }, [selectedClipIndex, playing]);

  return (
    <PlayerRoot>
      <PlayerStatusText>
        {clip
            && (
            <Head>
              <title>
                Unearth -
                {` ${clip.name}`}
              </title>
            </Head>
            )}
      </PlayerStatusText>

    </PlayerRoot>
  );
};

export default ClipPlayer;
