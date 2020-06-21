import {useCombobox} from 'downshift'

export const DropdownCombobox = ({
  label = 'Select',
  name = 'select',
  items,
  onChange,
  onSelect,
  disabled = false,
}) => {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    itemToString: item => item.label,
    onSelectedItemChange: ({selectedItem}) => onSelect(selectedItem?.value),
    onInputValueChange: ({inputValue}) => onChange(inputValue),
  })

  return (
    <>
      <label {...getLabelProps()} className="title -small -center">
        {label}
      </label>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps()}
          className="input -center"
          disabled={disabled}
          name={name}
        />
        <button
          {...getToggleButtonProps()}
          aria-label="Toggle select"
          className="sr-only"
        />
      </div>

      <div className="dropdown-combobox__dropdown-container">
        <ul {...getMenuProps()} className="dropdown-combobox__dropdown">
          {isOpen &&
            items.map((item, index) => (
              <li
                // TODO: use css
                style={
                  highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
                }
                key={`${item.value}${index}`}
                {...getItemProps({item, index})}
              >
                {item.label}
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}
