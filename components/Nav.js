import styled from 'styled-components';
import COLORS from '../utils/colors';
import ClipLibrary from './ClipLibrary';

const NavRoot = styled.div`
    grid-area: nav;
    height: 100%;
    background-color: ${COLORS.shade4};
    padding: 15px;
    color: ${COLORS.lightText1};
`;

const Nav = () => (
  <NavRoot>
    <ClipLibrary />
  </NavRoot>
);

export default Nav;
