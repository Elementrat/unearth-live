import React from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import TitleBar from '../../components/TitleBar';
import ClipBrowser from '../../components/ClipBrowser';

const BrowseGrid = styled.div`
    display: grid;
    grid-template-areas: 
    'title'
    'content';
    grid-template-rows: 40px 1fr;
    width: 100%;
    height: 100vh;
    color: ${COLORS.lightText1};
    background-color: ${COLORS.shade4};
`;

const BrowsePage = () => (
  <BrowseGrid>
    <TitleBar />
    <ClipBrowser />
  </BrowseGrid>
);

export default BrowsePage;
