export default function Field({
  name,
  label,
  required = false,
  autoComplete = 'false',
  placeholder,
  type = 'text',
  floating = false,
  center = false,
}) {
  return (
    <div>
      <label
        id={[name, 'label'].join('-')}
        htmlFor={[name, 'input'].join('-')}
        className={floating ? 'sr-only' : ''}
      >
        {label} {required ? <span title="Required">*</span> : undefined}
      </label>
      <br />
      <input
        className={`input ${floating ? '-floating' : ''} ${
          center ? '-center' : ''
        }`}
        autoComplete={autoComplete}
        id={[name, 'input'].join('-')}
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}
