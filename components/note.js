export const Note = ({
  color = 'BLUE',
  style = 'FILL',
  font = 'SANS',
  full = false,
  inline = false,
  children,
}) => (
  <div
    className={`note -${color.toLowerCase()} -${style.toLowerCase()} -${font.toLowerCase()} ${
      full ? '-full' : ''
    } ${inline ? '-inline' : ''}`}
  >
    {children}
  </div>
)
