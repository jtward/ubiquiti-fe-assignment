import styled from 'styled-components';
import { CHECKBOX_BACKGROUND_COLOR, CHECKBOX_BACKGROUND_COLOR_CHECKED, CHECKBOX_BORDER_COLOR, CHECKBOX_CHECKMARK_COLOR } from '../../../colors';
import { CheckmarkIcon } from '../../../icons/CheckmarkIcon';

const Checkbox = styled.div<{ $isChecked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;

  color: ${CHECKBOX_CHECKMARK_COLOR};
  border: 1px solid ${props => props.$isChecked ? CHECKBOX_BACKGROUND_COLOR_CHECKED : CHECKBOX_BORDER_COLOR};
  background-color: ${props => props.$isChecked ? CHECKBOX_BACKGROUND_COLOR_CHECKED : CHECKBOX_BACKGROUND_COLOR};
`;

interface CheckboxProps {
  checked: boolean;
}

export const VisualCheckbox: React.FC<CheckboxProps> = ({ checked }) => {
  return (
    <Checkbox $isChecked={checked}>
      {checked && <CheckmarkIcon />}
    </Checkbox>
  );
};