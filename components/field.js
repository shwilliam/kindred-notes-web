import {forwardRef} from 'react'

export const Field = forwardRef(
  (
    {
      label,
      name,
      required = false,
      autoComplete = 'false',
      type = 'text',
      center = false,
      invert = false,
      floating = false,
      className,
      ...props
    },
    ref,
  ) => (
    <div className={className}>
      <label
        htmlFor={[name, 'input'].join('-')}
        id={[name, 'label'].join('-')}
        className="sr-only"
      >
        {label} {required ? <span title="Required">*</span> : undefined}
      </label>
      <input
        name={name}
        ref={ref}
        autoComplete={autoComplete}
        type={type}
        id={[name, 'input'].join('-')}
        className={`input ${floating ? '-floating' : ''} ${
          center ? '-center' : ''
        } ${invert ? '-invert' : ''}`}
        {...props}
      />
    </div>
  ),
)
