import { useCombobox } from 'downshift';
import { Device } from '../../../data-hooks/useDevicesQuery';
import { LocalizationContext } from '../../../localization/LocalizationContext';
import { use, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '../../../icons/SearchIcon';
import { DeviceSearchContext } from '../contexts/DeviceSearchContext';
import { POPOVER_BACKGROUND_COLOR, POPOVER_ITEM_ASIDE_COLOR, POPOVER_ITEM_BACKGROUND_COLOR_HIGHLIGHTED, POPOVER_ITEM_COLOR, POPOVER_ITEM_OUTLINE_COLOR_HIGHLIGHTED, POPOVER_SHADOW_COLOR, TEXT_INPUT_BACKGROUND_COLOR, TEXT_INPUT_BACKGROUND_COLOR_FOCUS, TEXT_INPUT_BACKGROUND_COLOR_HOVER, TEXT_INPUT_COLOR, TEXT_INPUT_COLOR_FOCUS, TEXT_INPUT_COLOR_HOVER, TEXT_INPUT_OUTLINE_COLOR_FOCUS, TEXT_INPUT_PLACEHOLDER_COLOR } from '../../../colors';
import { HighlightedText } from './HighlightedText';
import { NavLink } from 'react-router';

const Wrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  width: 344px;
  height: 32px;
  padding-left: 32px;
  padding-right: 4px;

  color: ${TEXT_INPUT_COLOR};
  background-color: ${TEXT_INPUT_BACKGROUND_COLOR};

  &:hover {
    color: ${TEXT_INPUT_COLOR_HOVER};
    background-color: ${TEXT_INPUT_BACKGROUND_COLOR_HOVER};
  }

  &:focus {
    color: ${TEXT_INPUT_COLOR_FOCUS};
    background-color: ${TEXT_INPUT_BACKGROUND_COLOR_FOCUS};
    outline: 1px solid ${TEXT_INPUT_OUTLINE_COLOR_FOCUS};
  }

  &::placeholder {
    color: ${TEXT_INPUT_PLACEHOLDER_COLOR};
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 8px;
  height: 100%;

  color: ${TEXT_INPUT_PLACEHOLDER_COLOR};
`;

const ListWrapper = styled.div<{ $isVisible?: boolean }>`
  position: absolute;
  width: 100%;
  height: fit-content;
  z-index: 10;
  clip-path: rect(0px 0px 0px 0px);
  will-change: clip-path;

  ${props => props.$isVisible && `
    clip-path: rect(0px 1000px 1000px -1000px);
  `}
`;

const List = styled.ul<{ $isOpen?: boolean }>`
  display: block;
  margin: 1px 0 0 0;
  padding: 8px 0;
  list-style: none;
  width: 100%;
  max-height: 264px;
  overflow-y: auto;
  background-color: ${POPOVER_BACKGROUND_COLOR};
  border-radius: 8px;

  box-shadow: 0 16px 32px 0 ${POPOVER_SHADOW_COLOR};
  
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  will-change: opacity, transform;

  ${props => props.$isOpen ? `
    opacity: 1;
    transform: translateY(0);
  ` : `
    opacity: 0;
    transform: translateY(-100%);
  `}
`;

const ListItem = styled.li``;

const NoResultsListItem = styled.li`
  padding: 8px;
  font-size: 14px;
  height: 32px;
  color: ${POPOVER_ITEM_COLOR};
`;

const ListItemNavLink = styled(NavLink)<{ $isHighlighted?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 32px;
  padding: 0 7px;
  font-size: 14px;

  text-decoration: none;
  color: ${POPOVER_ITEM_COLOR};

  &:hover {
    background-color: ${props => props.$isHighlighted ? POPOVER_ITEM_BACKGROUND_COLOR_HIGHLIGHTED : 'transparent'};
  }
  border: 1px solid ${props => props.$isHighlighted ? POPOVER_ITEM_OUTLINE_COLOR_HIGHLIGHTED : 'transparent'};
`;

const ListItemProductName = styled.span`
  color: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ListItemProductAbbrev = styled.span`
  color: ${POPOVER_ITEM_ASIDE_COLOR};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const HighlightedTextMatch = styled.span`
  font-family: "UI Sans_v9 Bold";
  font-weight: 500;
  text-decoration: underline;
`;

export const SearchInput = () => {
  const { t } = use(LocalizationContext)!;
  const { autocompleteDevices, search, setSearch, resetSearch, onSearchSubmit } = use(DeviceSearchContext)!;

  // when this component is destroyed, reset the search
  // so that when we return to the page the search input
  // aligns with the displayed items
  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, [resetSearch]);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setSearch(inputValue);
    },
    onStateChange({ isOpen, type }) {
      // isOpen is undefined if it did not change
      // we care about when it was explicitly changed to false
      // using the enter key (not e.g. by clicking outside)
      if (isOpen === false && type === useCombobox.stateChangeTypes.InputKeyDownEnter) {
        onSearchSubmit();
      }
    },
    items: autocompleteDevices,
    itemToString(item: Device | null) {
      return item?.product?.name ?? '';
    },
    initialInputValue: search,
  });

  const menuProps = getMenuProps();

  // isMenuVisible tracks whether the menu is visible at all, including when
  // animating. Its value is set to true when isOpen becomes true, and false
  // when the transition ends.
  // This allows us to block content beneath only when isMenuVisible is true
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsMenuVisible(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      setIsMenuVisible(true);
    }
  }, [isOpen]);

  return (
    <Wrapper>
      <InputWrapper>
        <StyledInput
          placeholder={t('devices.form.searchplaceholder')}
          {...getInputProps()}
        />
        <StyledSearchIcon />
      </InputWrapper>
      <ListWrapper $isVisible={isOpen || isMenuVisible}>
        <List {...menuProps} $isOpen={isOpen} onTransitionEnd={handleTransitionEnd}>
          {autocompleteDevices.length === 0 && (
            <NoResultsListItem>{t('devices.form.noSearchResults')}</NoResultsListItem>
          )}
          {autocompleteDevices.map((device, index) => (
            <ListItem
              key={device.id}
              {...getItemProps({item: device, index})}
            >
              <ListItemNavLink
                to={`/devices/${device.id}`}
                $isHighlighted={highlightedIndex === index}
              >
                <ListItemProductName>
                  <HighlightedText
                    text={device.product?.name ?? ''}
                    query={search}
                    MatchComponent={HighlightedTextMatch}
                  />
                </ListItemProductName>
                <ListItemProductAbbrev>
                  <HighlightedText
                    text={device.product?.abbrev ?? ''}
                    query={search}
                    MatchComponent={HighlightedTextMatch}
                  />
                </ListItemProductAbbrev>
              </ListItemNavLink>
            </ListItem>
          ))}
        </List>
      </ListWrapper>
    </Wrapper>
  );
};
