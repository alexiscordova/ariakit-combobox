import { Core } from "@faire/design-tokens";
import { Column, Row } from "@faire/web/slate/Layout";
import { getSpacing } from "@faire/web/slate/spacing";
import { TypographyStyles } from "@faire/web/slate/Typography";
import styled from "styled-components";

export const SelectTrigger = styled.div<{
  hasError?: boolean;
  borderless?: boolean;
}>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex: 1 0 auto;
  align-items: center;
  height: 42px;
  padding: ${getSpacing(0, "2x")};
  color: ${Core.text.default};
  background-color: ${(props) =>
    props.hasError ? Core.surface.critical : undefined};
  border: 1px solid
    ${(props) => (props.hasError ? Core.border.critical : Core.border.muted)};
  border-color: ${({ borderless }) => (borderless ? "transparent" : undefined)};

  &[aria-disabled="true"] {
    color: ${Core.text.disabled};
    background-color: ${Core.surface.disabled};
  }
`;

export const SelectWrapper = styled(Column)`
  position: relative;
  width: 100%;
  ${TypographyStyles};

  &:focus-within ${SelectTrigger} {
    outline: none;
    border: 1px solid ${Core.border.enabled};
  }
`;

export const SelectChevronWrapper = styled.span`
  margin-inline-start: auto;
`;

export const SelectItemContainer = styled.div`
  z-index: 2;
  margin: ${getSpacing(0, "1x", 0, "-1x")};
  max-height: 240px;
  background-color: ${Core.surface.inverse};
  border: 1px solid ${Core.border.muted};
  overflow-y: auto;

  &:focus {
    outline: none;
  }
`;

const SelectItemSelectedBorderWidth = "4px";
const SelectItemSelectedPadding = `calc(${getSpacing(
  "2x"
)} - ${SelectItemSelectedBorderWidth})`;

export const SelectItem = styled(Row).attrs({ align: "center" })`
  padding: ${getSpacing(0, "2x")};
  min-height: 44px;

  &[data-active-item] {
    background-color: ${Core.surface.muted};
  }

  &[aria-selected="true"] {
    ${TypographyStyles({ variant: "paragraphSansMedium" })}
    padding: ${SelectItemSelectedPadding};
    min-height: 44px;
    background-color: ${Core.surface.subdued};
    border-inline-start: ${SelectItemSelectedBorderWidth} solid
      ${Core.border.default};
  }

  &[aria-disabled="true"] {
    color: ${Core.text.disabled};
    background-color: ${Core.surface.disabled};
  }
`;

export const SelectItemGroup = styled(Column)`
  padding: ${getSpacing("1x", "2x")};
  min-height: 22px;
`;

export const SelectSeparator = styled.div`
  margin: ${getSpacing("1x")} auto;
  width: 90%;
  height: 1px;
  background-color: ${Core.border.muted};
`;

export const SelectFooter = styled(Row).attrs({ align: "flexStart" })``;
