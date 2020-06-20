export const Field = ({
  name,
  label,
  required = false,
  autoComplete = 'false',
  placeholder,
  type = 'text',
  center = false,
  invert = false,
  floating = false,
  className,
  value,
  onChange
}) => (
  <div className={className}>
    <label
      id={[name, 'label'].join('-')}
      htmlFor={[name, 'input'].join('-')}
      className="sr-only"
    >
      {label} {required ? <span title="Required">*</span> : undefined}
    </label>
    <input
      className={`input ${floating ? '-floating' : ''} ${
        center ? '-center' : ''
      } ${invert ? '-invert' : ''}`}
      autoComplete={autoComplete}
      id={[name, 'input'].join('-')}
      name={name}
      required={required}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
)
