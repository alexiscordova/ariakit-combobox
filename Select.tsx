/* eslint-disable no-console */
import {
  SelectProvider as AriaSelectProvider,
  SelectLabel as AriaSelectLabel,
  Select as AriaSelect,
  SelectPopover as AriaSelectPopover,
  SelectGroup as AriaSelectGroup,
  SelectItem as AriaSelectItem,
  SelectItemCheck as AriaSelectItemCheck,
  SelectSeparator as AriaSelectSeparator,
} from "@ariakit/react";
import { Core } from "@faire/design-tokens";
import { Chevron } from "@faire/web/slate/icons/foundation/Chevron";
import { Exclamation } from "@faire/web/slate/icons/foundation/Exclamation";
import { getSpacing, Spacer } from "@faire/web/slate/spacing";
import { Typography } from "@faire/web/slate/Typography";
import { useUniqueId } from "@faire/web/ui/hooks/useUniqueId";
import groupBy from "lodash/groupBy";
import React from "react";

import {
  SelectTrigger,
  SelectWrapper,
  SelectChevronWrapper,
  SelectItemContainer,
  SelectItem,
  SelectItemGroup,
  SelectSeparator,
  SelectFooter,
} from "./styles";
import {
  SelectProps,
  SelectItemProps,
  SelectItemActionProps,
  SelectFooterProps,
  SelectLabelProps,
} from "./types";

const SelectLabel = ({
  label,
  hasError,
  id,
  required,
  onClick,
}: SelectLabelProps) => {
  const textColor = hasError ? Core.text.critical : undefined;

  return (
    <Typography color={textColor} id={id} onClick={onClick}>
      {label} {required ? "(required)" : null}
    </Typography>
  );
};

const renderFooter = (footer: SelectFooterProps, id: string) => {
  const { helperMessage, errorMessage } = footer;
  const footerMessage = errorMessage ? errorMessage : helperMessage;
  const textColor = errorMessage ? Core.text.critical : undefined;

  return (
    <>
      <Spacer size={4} />
      <SelectFooter role="contentinfo">
        {errorMessage ? (
          <>
            <Exclamation color={Core.icon.critical} />
            <Spacer width={4} />
          </>
        ) : null}
        <Typography variant="labelSansRegular" color={textColor} id={id}>
          {footerMessage}
        </Typography>
      </SelectFooter>
    </>
  );
};

const renderUngroupedOptions = (
  options: SelectItemProps[],
  onClick?: SelectItemActionProps
) => {
  return options.map((option, index) => (
    <AriaSelectItem
      key={`${option.value + index}`}
      render={<SelectItem />}
      value={option.name}
      disabled={option.disabled}
      onClick={onClick}
    >
      <AriaSelectItemCheck />
      {option.name}
    </AriaSelectItem>
  ));
};

const renderGroupedOptions = (
  options: SelectItemProps[],
  onClick: SelectItemActionProps
) => {
  const groupedOptions = Object.entries(groupBy(options, "type"));

  return groupedOptions.map(([type, options], index) => {
    const groupName = type === "undefined" ? "Other" : type;

    return (
      <React.Fragment key={groupName}>
        <AriaSelectGroup>
          <SelectItemGroup>
            <Typography variant="paragraphSansMedium">{groupName}</Typography>
          </SelectItemGroup>

          {options.map((option) => (
            <AriaSelectItem
              key={`${option.value}`}
              render={<SelectItem />}
              value={option.name}
              disabled={option.disabled}
              onClick={onClick}
            >
              {option.name}
            </AriaSelectItem>
          ))}
        </AriaSelectGroup>
        {index <= options.length - 1 ? (
          <AriaSelectSeparator render={<SelectSeparator />} />
        ) : null}
      </React.Fragment>
    );
  });
};

/**
 * @trackcomponent
 * @link [Docs](https://slate.faire.team/slate/component/select)
 */
const Select = ({
  label,
  isLabelVisible = true,
  initialValue,
  options,
  disabled,
  required,
  borderless,
  footer,
  onOptionSelection,
}: SelectProps) => {
  const [value, setValue] = React.useState("");
  const effectRan = React.useRef(false);
  const selectRef = React.useRef<HTMLDivElement>(null);
  const selectId = useUniqueId("select-");
  const footerId = useUniqueId("select-footer-");
  const selectHasError = footer?.errorMessage ? true : false;
  const areOptionsGrouped = options.some((option) => option.type);

  React.useEffect(() => {
    if (!effectRan.current && initialValue) {
      const optionValues = options.map((option) => option.value);
      if (!optionValues.includes(initialValue)) {
        console.warn(
          `The initialValue prop provided to the Select component must match one of the options provided. The current value of "${initialValue}" does not match any of the options.`
        );
      } else {
        effectRan.current = true;
        setValue(initialValue);
      }
    }
  }, [initialValue, options]);

  return (
    <SelectWrapper aria-invalid={selectHasError}>
      <AriaSelectProvider value={value} setValue={setValue}>
        {isLabelVisible ? (
          <AriaSelectLabel
            render={
              <SelectLabel
                label={label}
                hasError={selectHasError}
                required={required}
                id={selectId}
                onClick={() => {
                  selectRef.current?.focus();
                }}
              />
            }
          />
        ) : null}
        <AriaSelect
          render={
            <SelectTrigger
              ref={selectRef}
              borderless={borderless}
              hasError={selectHasError}
              aria-label={!isLabelVisible ? label : undefined}
              aria-labelledby={!isLabelVisible ? undefined : selectId}
              aria-describedby={footer ? footerId : undefined}
              aria-required={required}
            />
          }
          disabled={disabled}
          value={value}
          className="select-button"
        >
          {value}
          <SelectChevronWrapper aria-hidden="true">
            <Chevron
              direction="down"
              width="8"
              height="8"
              color={Core.icon.default}
              strokeWidth={2}
              margin={getSpacing(0, 0, 0, "1x")}
            />
          </SelectChevronWrapper>
        </AriaSelect>
        <AriaSelectPopover sameWidth render={<SelectItemContainer />}>
          {areOptionsGrouped
            ? renderGroupedOptions(options, onOptionSelection)
            : renderUngroupedOptions(options, onOptionSelection)}
        </AriaSelectPopover>
      </AriaSelectProvider>

      {footer ? renderFooter(footer, footerId) : null}
    </SelectWrapper>
  );
};

export { Select };
