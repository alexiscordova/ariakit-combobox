export interface SelectProps {
  /**
   * Sets a label for the `Select` component. By default, is it visually rendered.
   *
   * @example
   * ```jsx
   * <Select label="Favorite fruit" {...props} />
   * ```
   */
  label: string;
  /**
   * Determines if the label is visually rendered relative to the `Select` component. If `false`, the required `label` prop is not visually rendered, and is automatically set as the value for the `aria-label` attribute on the `Select` component.
   *
   * @defaultValue true
   * @example
   * ```jsx
   * <Select label="Favorite fruit" isLabelVisible={false} {...props} />
   * ```
   */
  isLabelVisible?: boolean;
  /**
   * Sets the initial selected value for the `Select` component. The value provided must be identical to the `name` property of one of the `options` passed to the `Select` component. If the value passed doesn't match any of the provided options, the `Select` component's value will stay undefined, and a warning will be displayed in the console.
   *
   * @example
   * ```jsx
   * <Select
   *  initialValue="Apple"
   *  options={
   *    {
   *     "name": "Apple",
   *     "value": "apple",
   *    }
   * }
   * ```
   */
  initialValue?: string;
  /**
   * Renders a select item inside a `Select` component.
   *
   * @example
   * ```jsx
   * <Select options={OPTIONS_OBJECT} {...props} />
   * ```
   */
  options: SelectItemProps[];
  /**
   * Sets the `Select` component to a disabled state. This will make the component unselectable and the options popover will not appear.
   *
   * @example
   * ```jsx
   * <Select disabled={true} {...props} />
   * ```
   */
  disabled?: boolean;
  /**
   * Sets the `Select` component to a required state. This will add localized text ("(required)") to the label, and will set `aria-required` to `true` on the `Select` component.
   *
   * @example
   * ```jsx
   * <Select required={true} {...props} />
   * ```
   */
  required?: boolean;
  /**
   * Removes the pre-defined border from the `Select` component. This is useful when the `Select` component is rendered inside another component that already has a border, such as a `Table` cell.
   *
   * This variant should **not** be used on its own.
   *
   * @example
   * ```jsx
   * <Select borderless={true} {...props} />
   * ```
   */
  borderless?: boolean;
  /**
   * Renders a footer below the `Select` component. This is useful for displaying helper text or error messages.
   *
   * @example
   * ```jsx
   * <Select
   *  footer={{
   *    helperMessage: "Select your favorite fruit",
   *  }}
   *  {...props}
   * />
   * ```
   */
  footer?: SelectFooterProps;
  /**
   * Passes a custom function to a select item that will be called when the select item is selected (via click or keyboard interaction).
   *
   * @example
   * The console will log "Select item selected" when the select item is selected.
   * ```jsx
   * <Select
   *  onOptionSelection={() => {
   *    console.log("Select item selected");
   *  }}
   *  {...props}
   * />
   * ```
   */
  onOptionSelection?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface SelectItemProps {
  /** Sets an individual select item to a disabled state. This will make the select item unselectable. */
  disabled?: boolean;
  /** Sets the displayed value for a select item. */
  value: string;
  /** Sets the name used internally to identify individual select items. */
  name?: string;
  /**
   * Organizes a collection of select items under a single group name. If a select item does not have a type, it will be rendered at the end of the options list.
   *
   * @example
   * ```js
   * {
   *  "name": "Apple",
   *  "value": "apple",
   *  "type": "Fruit"
   * },
   * {
   *  "name": "Banana",
   *  "value": "banana",
   *  "type": "Fruit"
   * },
   * {
   *  "name": "Beef",
   *  "value": "beef",
   *  "type": "Meat"
   * }
   * ```
   */
  type?: string;
}

export type SelectItemActionProps = SelectProps["onOptionSelection"];

export interface SelectFooterProps {
  /**
   * Sets a helper message for the `Select` component. This is useful for displaying additional instructions for successfully completing a selection.
   *
   * @example
   * ```jsx
   * <Select
   *  footer={{
   *    helperMessage: "Select your favorite fruit",
   *  }}
   *  {...props}
   * />
   * ```
   */
  helperMessage?: string;
  /**
   * Sets an error message for the `Select` component, and sets the `Select` component to an error state. When provided, an exclamation icon will automatically be added before the error message. This is useful for displaying an error message when a selection is required.
   *
   * **Note:** If both `errorMessage` and `helperMessage` props are provided, only the `errorMessage` prop will be rendered.
   *
   * @example
   * ```jsx
   * <Select
   *  footer={{
   *    errorMessage: "Please make a selection",
   *  }}
   *  {...props}
   * />
   * ```
   */
  errorMessage?: string;
}

export type SelectLabelProps = Pick<SelectProps, "label" | "required"> & {
  /** Connects the label to the `Select` component. Used internally. */
  id: string;
  /** Sets the label when the `Select` component is in an error state. Used internally. */
  hasError?: boolean;
  /** Sets the `click` event to replicate the native label behavior of focusing the `Select` component when clicked. Used internally. */
  onClick?: () => void;
};
