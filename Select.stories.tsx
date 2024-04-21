import { FaireStories } from "@faire/web/ui/testing/FaireStories/FaireStories";
import { Meta } from "@storybook/react";
import * as React from "react";

import { Select } from "./Select";

const DEFAULT_OPTIONS = [
  {
    name: "Apple",
    value: "Apple",
  },
  {
    name: "Banana",
    value: "Banana",
  },
  {
    name: "Orange",
    value: "Orange",
  },
];

const OPTIONS_WITH_DISABLED_ITEMS = [
  {
    name: "Apple",
    value: "Apple",
  },
  {
    name: "Banana",
    value: "Banana",
    disabled: true,
  },
  {
    name: "Orange",
    value: "Orange",
  },
];

const GROUPED_OPTIONS = [
  {
    name: "Apple",
    value: "Apple",
    type: "Fruit",
  },
  {
    name: "Banana",
    value: "Banana",
    type: "Fruit",
  },
  {
    name: "Orange",
    value: "Orange",
    type: "Fruit",
  },
  {
    name: "Beef",
    value: "Beef",
    type: "Meat",
  },
  {
    name: "Chicken",
    value: "Chicken",
    type: "Meat",
  },
  {
    name: "Tofu",
    value: "Tofu",
  },
  {
    name: "Seitan",
    value: "Seitan",
  },
];

const stories = new FaireStories(Select, (props) => (
  <div style={{ height: "100vh", width: "348px" }}>
    <Select {...props} />
  </div>
));

const meta: Meta<typeof Select> = {
  ...stories.commonContext,
  title: "Slate Labs/Select/Select",
};

export default meta;

export const Default = stories.newStory().setProps({
  label: "Fruits",
  options: DEFAULT_OPTIONS,
});

export const DefaultWithHelperMessage = stories.newStory().setProps({
  label: "Fruits",
  options: DEFAULT_OPTIONS,
  footer: {
    helperMessage: "This is a helper message",
  },
});

export const DefaultWithErrorMessage = stories.newStory().setProps({
  label: "Fruits",
  options: DEFAULT_OPTIONS,
  footer: {
    errorMessage: "This is an error message",
  },
});

export const DefaultWithHelperAndErrorMessages = stories.newStory().setProps({
  label: "Fruits",
  options: DEFAULT_OPTIONS,
  footer: {
    helperMessage: "This helper message should NOT appear",
    errorMessage: "This error message should appear",
  },
});

export const DefaultWithoutVisibleLabel = stories.newStory().setProps({
  label: "Fruits",
  options: DEFAULT_OPTIONS,
  isLabelVisible: false,
});

export const DefaultWithOnClickHandler = stories.newStory().setProps({
  label: "Fruits",
  options: DEFAULT_OPTIONS,
  onOptionSelection: (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedItem = (e.target as Element).textContent;
    alert(`Option "${selectedItem}" Selected!`);
  },
});

export const GroupedOptions = stories.newStory().setProps({
  label: "Food",
  options: GROUPED_OPTIONS,
});

export const Borderless = stories.newStory().setProps({
  label: "Fruits",
  isLabelVisible: false,
  options: DEFAULT_OPTIONS,
  borderless: true,
});

export const DisabledItems = stories.newStory().setProps({
  label: "Fruits",
  options: OPTIONS_WITH_DISABLED_ITEMS,
});

export const InitialValue = stories.newStory().setProps({
  label: "Fruits",
  initialValue: "Apple",
  options: DEFAULT_OPTIONS,
});

export const InitialValueNotMatchingOptions = stories.newStory().setProps({
  label: "Fruits",
  initialValue: "Applez",
  options: DEFAULT_OPTIONS,
  footer: {
    errorMessage:
      "The initial value will not appear because it does not match any of the defined options.",
  },
});

export const Disabled = stories.newStory().setProps({
  label: "Fruits",
  options: DEFAULT_OPTIONS,
  disabled: true,
});

export const DisabledWithInitialValue = stories.newStory().setProps({
  label: "Fruits",
  initialValue: "Apple",
  options: DEFAULT_OPTIONS,
  disabled: true,
});

export const Required = stories.newStory().setProps({
  label: "Fruits",
  options: DEFAULT_OPTIONS,
  required: true,
});
