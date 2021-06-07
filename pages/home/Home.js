import React from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import Nav from '../../components/Nav';
import Title from '../../components/Title';
import ClipRecorder from '../../components/ClipRecorder';
import ClipPlayer from '../../components/ClipPlayer';

const HomeGrid = styled.div`
    display: grid;
    grid-template-areas: 
    'title title'
    'nav content';
    grid-template-columns: 250px 1fr;
    grid-template-rows: 40px 1fr;

    @media screen and (max-width: 600px){
      grid-template-rows: 40px 100% 1fr;
      grid-template-columns: 1fr;
      grid-template-areas: 
      'title'
      'content'
      'nav';
    }

    width: 100%;
    height: 100vh;
    color: ${COLORS.lightText1};
    background-color: ${COLORS.shade4};
`;

const HomePage = () => (
  <>
    <HomeGrid>
      <Title />
      <Nav />
      <ClipRecorder />

      <ClipPlayer />
    </HomeGrid>
  </>
);

export default HomePage;
