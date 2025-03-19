import styled from 'styled-components';
import { BUTTON_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR_ACTIVE, BUTTON_BACKGROUND_COLOR_DISABLED, BUTTON_BACKGROUND_COLOR_HOVER, BUTTON_COLOR, BUTTON_COLOR_ACTIVE, BUTTON_COLOR_DISABLED, BUTTON_COLOR_HOVER, BUTTON_OUTLINE_COLOR_FOCUS } from '../colors';

const StyledButton = styled.button<{ $isActive?: boolean }>`
  width: 32px;
  min-width: fit-content;
  height: 32px;
  border: none;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${BUTTON_BACKGROUND_COLOR};
  cursor: pointer;

  ${props => props.$isActive ? `
    color: ${BUTTON_COLOR_ACTIVE};
    background-color: ${BUTTON_BACKGROUND_COLOR_ACTIVE};
    border-color: ${BUTTON_BACKGROUND_COLOR_ACTIVE};
  ` : `
    color: ${BUTTON_COLOR};
    background-color: ${BUTTON_BACKGROUND_COLOR};
    border-color: ${BUTTON_BACKGROUND_COLOR};

    &:hover {
      color: ${BUTTON_COLOR_HOVER};
      background-color: ${BUTTON_BACKGROUND_COLOR_HOVER};
      border-color: ${BUTTON_BACKGROUND_COLOR_HOVER};
    }
  `}

  &:focus {
    border-color: ${BUTTON_OUTLINE_COLOR_FOCUS};
    outline: none;
  }

  &:disabled {
    color: ${BUTTON_COLOR_DISABLED};
    background-color: ${BUTTON_BACKGROUND_COLOR_DISABLED};
    border-color: ${BUTTON_BACKGROUND_COLOR_DISABLED};
  }

  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

const StyledInnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({ isActive, ...props }) => {
  return (
    <StyledButton {...props} type="button" $isActive={isActive}>
      <StyledInnerWrapper style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {props.children}
      </StyledInnerWrapper>
    </StyledButton>
  );
};