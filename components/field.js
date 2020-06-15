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
  ...props
}) => (
  <div {...props}>
    <label
      id={[name, 'label'].join('-')}
      htmlFor={[name, 'input'].join('-')}
      className="sr-only"
    >
      {label} {required ? <span title="Required">*</span> : undefined}
    </label>
    <input
      className={`input ${floating ? '-floating' : ''} ${center ? '-center' : ''} ${invert ? '-invert' : ''}`}
      autoComplete={autoComplete}
      id={[name, 'input'].join('-')}
      name={name}
      required={required}
      type={type}
      placeholder={placeholder}
    />
  </div>
)
