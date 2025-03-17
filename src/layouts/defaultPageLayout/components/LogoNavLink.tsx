import styled from 'styled-components';
import { Logo } from '../../../icons/Logo';
import { LOGO_BACKGROUND_COLOR_FOCUS, LOGO_BACKGROUND_COLOR_HOVER, LOGO_COLOR, LOGO_COLOR_FOCUS, LOGO_COLOR_HOVER, LOGO_OUTLINE_COLOR_FOCUS } from '../../../colors';
import { NavLink, NavLinkProps } from 'react-router';

const StyledNavLink = styled(NavLink)`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${LOGO_COLOR};
  border: 1px solid transparent;

  &:hover {
    color: ${LOGO_COLOR_HOVER};
    background-color: ${LOGO_BACKGROUND_COLOR_HOVER};
  }

  &:focus {
    color: ${LOGO_COLOR_FOCUS};
    background-color: ${LOGO_BACKGROUND_COLOR_FOCUS};
    border: 1px solid ${LOGO_OUTLINE_COLOR_FOCUS};
  }
`;

export const LogoNavLink: React.FC<NavLinkProps> = ({...props}) => {
  return (
    <StyledNavLink {...props}>
      <Logo />
    </StyledNavLink>
  );
};
