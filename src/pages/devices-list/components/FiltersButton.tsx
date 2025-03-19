
import { useSelect, UseSelectState, UseSelectStateChangeOptions } from 'downshift';
import { DeviceLine } from '../../../data-hooks/useDevicesQuery';
import { LocalizationContext } from '../../../localization/LocalizationContext';
import { use, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DeviceSearchContext } from '../contexts/DeviceSearchContext';
import { VisualCheckbox } from './VisualCheckbox';
import { BUTTON_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR_ACTIVE, BUTTON_BACKGROUND_COLOR_HOVER, BUTTON_COLOR, BUTTON_COLOR_ACTIVE, BUTTON_COLOR_HOVER, BUTTON_OUTLINE_COLOR_FOCUS, LIST_ITEM_COLOR, LIST_ITEM_BACKGROUND_COLOR_HOVER, LIST_ITEM_OUTLINE_COLOR_FOCUS, POPOVER_BACKGROUND_COLOR, POPOVER_SHADOW_COLOR, LIST_HEADING_COLOR, BUTTON_DESTRUCTIVE_OUTLINE_COLOR_FOCUS, BUTTON_DESTRUCTIVE_COLOR, BUTTON_DESTRUCTIVE_BACKGROUND_COLOR, BUTTON_DESTRUCTIVE_COLOR_HOVER, BUTTON_DESTRUCTIVE_BACKGROUND_COLOR_HOVER, BUTTON_DESTRUCTIVE_COLOR_ACTIVE, BUTTON_DESTRUCTIVE_COLOR_DISABLED } from '../../../colors';

const Wrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ToggleButton = styled.div`
  display: inline-block;
  height: 32px;
  font-size: 14px;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;

  ${props => props['aria-expanded'] ? `
    color: ${BUTTON_COLOR_ACTIVE};
    background-color: ${BUTTON_BACKGROUND_COLOR_ACTIVE};
    border: 1px solid ${BUTTON_OUTLINE_COLOR_FOCUS};
  ` : `
    color: ${BUTTON_COLOR};
    background-color: ${BUTTON_BACKGROUND_COLOR};
    border: 1px solid ${BUTTON_BACKGROUND_COLOR};

    &:hover {
      color: ${BUTTON_COLOR_HOVER};
      background-color: ${BUTTON_BACKGROUND_COLOR_HOVER};
      border: 1px solid ${BUTTON_BACKGROUND_COLOR_HOVER};
    }

    &:focus {
      border: 1px solid ${BUTTON_OUTLINE_COLOR_FOCUS};
      outline: none;
    }
  `}

  &:focus {
    outline: none;
  }

  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

const Popover = styled.div<{ $isOpen?: boolean }>`
  position: absolute;
  right: 0;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  gap: 16px;
  z-index: 10;
  margin: 1px 0 0 0;
  padding: 16px;
  overflow-y: auto;
  border-radius: 8px;
  background-color: ${POPOVER_BACKGROUND_COLOR};
  box-shadow: 0 16px 32px 0 ${POPOVER_SHADOW_COLOR};
`;

const Label = styled.label`
  padding: 0 8px;
  font-size: 14px;
  color: ${LIST_HEADING_COLOR};
  font-family: 'UI Sans_v9 Bold', sans-serif;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const List = styled.div`
  margin: 0;
  padding: 0;
  max-height: 160px;
  overflow-y: auto;
`;

const ListItem = styled.div<{ $isSelected?: boolean; $isHighlighted: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 8px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  border-width: 1px 0;
  border-style: solid;
  border-color: transparent;
  color: ${LIST_ITEM_COLOR};

  ${props => props.$isHighlighted ? `
    background-color: ${LIST_ITEM_BACKGROUND_COLOR_HOVER};
    border-color: ${LIST_ITEM_OUTLINE_COLOR_FOCUS};
  ` : ''
  }
`;

const ResetButton = styled.button`
  display: inline-block;
  width: fit-content;
  height: 32px;
  font-size: 14px;
  padding: 6px;
  border-radius: 4px;

  color: ${BUTTON_DESTRUCTIVE_COLOR};
  background-color: ${BUTTON_DESTRUCTIVE_BACKGROUND_COLOR};
  border: 1px solid ${BUTTON_DESTRUCTIVE_BACKGROUND_COLOR};
  outline: none;

  &:not(:disabled):hover {
    color: ${BUTTON_DESTRUCTIVE_COLOR_HOVER};
    background-color: ${BUTTON_DESTRUCTIVE_BACKGROUND_COLOR_HOVER};
    border: 1px solid ${BUTTON_DESTRUCTIVE_BACKGROUND_COLOR_HOVER};
  }

  &:focus {
    border-color: ${BUTTON_DESTRUCTIVE_OUTLINE_COLOR_FOCUS};
  }

  &:active {
    color: color: ${BUTTON_DESTRUCTIVE_COLOR_ACTIVE};
  }

  &:disabled {
    color: ${BUTTON_DESTRUCTIVE_COLOR_DISABLED};
  }

  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

export const FiltersButton = () => {
  const { t } = use(LocalizationContext)!;
  const { productLines, filters, setFilters } = use(DeviceSearchContext)!;

  const itemToString = (item: DeviceLine | null) => {
    return item?.name ?? '';
  };

  const stateReducer = (state: UseSelectState<DeviceLine>, actionAndChanges: UseSelectStateChangeOptions<DeviceLine>) => {
    const {changes, type} = actionAndChanges;
    switch (type) {
      case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
      case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
      case useSelect.stateChangeTypes.ItemClick:
        return {
          ...changes,
          isOpen: true, // Keep menu open after selection.
          highlightedIndex: state.highlightedIndex,
        };
      default:
        return changes;
    }
  };

  const filtersArray = filters.split(',').filter((f) => f !== '');
  const initialSelectedItems = productLines.filter(({ id }) => filtersArray.includes(id));
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  // keep filters in context up to date with selection
  useEffect(() => {
    setFilters(selectedItems.map(({ id }) => id).join(','));
  }, [selectedItems, setFilters]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: productLines,
    itemToString,
    stateReducer,
    // there's no actual selection happening in the hook, we're doing it custom via selectedItems.
    selectedItem: null,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return;
      }

      const index = selectedItems.indexOf(selectedItem);

      if (index > 0) {
        setSelectedItems([
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ]);
      } else if (index === 0) {
        setSelectedItems([...selectedItems.slice(1)]);
      } else {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    },
  });

  const handleReset = (e: React.MouseEvent) => {
    setSelectedItems([]);
    e.preventDefault();
  };

  return (
    <Wrapper>
      <InputWrapper>
        <ToggleButton
          {...getToggleButtonProps()}
        >
          <span>{t('devices.form.filterButtonText')}</span>
        </ToggleButton>
      </InputWrapper>
      <Popover $isOpen={isOpen} {...getMenuProps()}>
        <Label {...getLabelProps()}>{t('devices.form.filtersListTitle')}</Label>
        {isOpen && (
          <>
            <List tabIndex={-1}>
              {productLines.map((item, index) => {
                return (
                  <ListItem
                    key={item.id}
                    $isHighlighted={highlightedIndex === index}
                    $isSelected={selectedItems.includes(item)}
                    {...getItemProps({
                      item,
                      index,
                      'aria-selected': selectedItems.includes(item),
                    })}
                  >
                    <VisualCheckbox
                      checked={selectedItems.includes(item)}
                    />
                    {item.name}
                  </ListItem>
                );
              })
              }
            </List>
            <ResetButton
              type="button"
              onClick={handleReset}
              disabled={selectedItems.length === 0}
            >
              {t('devices.form.resetFiltersButtonText')}
            </ResetButton>
          </>
        )}
      </Popover>
    </Wrapper>
  );
};
