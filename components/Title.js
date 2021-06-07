import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import STRINGS from '../utils/constants';
import COLORS from '../utils/colors';

const TitleRoot = styled.div`
  grid-area: title;
  background-color: #111111;
  display: flex;
  align-items:center;
  padding: 15px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  color: ${COLORS.lightText2};
`;

const TitleText = styled.div`
  width: 240px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 20px;
`;

const NavLinkMenu = styled.div`
  display: flex;
  min-width: 300px;
  overflow:hidden;
`;

const NavLinkRoot = styled.div`
  display: flex;
  padding: 10px 20px;
  font-weight: bold;
  position:relative;

  ::after{
    height: 3px;
    background-color:${COLORS.brand};
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 3px;
    width:90%;
    border-radius: 20px;
    opacity: ${(props) => (props.isSelected ? '1' : '0')};
  }

  :hover{
    color: white;
  }
`;

const NavLink = ({ href, text }) => {
  const router = useRouter();
  const isCurrentPage = router.route.endsWith(href);

  return (
    <NavLinkRoot isSelected={isCurrentPage}>
      <Link href={href}>{text}</Link>
    </NavLinkRoot>
  );
};

const Title = () => (
  <TitleRoot>
    <TitleText>{STRINGS.APP_NAME}</TitleText>
    <NavLinkMenu>
      <NavLink href="/" text="Recorder" />
      <NavLink href="/browse" text="Community Clips" />
    </NavLinkMenu>
  </TitleRoot>
);
export default Title;
