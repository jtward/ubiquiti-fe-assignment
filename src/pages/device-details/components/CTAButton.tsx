import styled from 'styled-components';
import { BUTTON_CTA_BACKGROUND_COLOR, BUTTON_CTA_COLOR, BUTTON_CTA_COLOR_HOVER, BUTTON_CTA_OUTLINE_COLOR_FOCUS } from '../../../colors';

const StyledButton = styled.button`
  width: 32px;
  min-width: fit-content;
  height: 32px;
  border: none;
  padding: 0;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${BUTTON_CTA_BACKGROUND_COLOR};

  color: ${BUTTON_CTA_COLOR};
  background-color: ${BUTTON_CTA_BACKGROUND_COLOR};
  border-color: ${BUTTON_CTA_BACKGROUND_COLOR};

  &:hover {
    color: ${BUTTON_CTA_COLOR_HOVER};
  }

  &:focus {
    border-color: ${BUTTON_CTA_OUTLINE_COLOR_FOCUS};
    outline: none;
  }
`;

export const CTAButton = ({ ...props }) => {
  return (
    <StyledButton {...props} type="button">
      {props.children}
    </StyledButton>
  );
};