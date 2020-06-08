export const Note = ({
  color = 'BLUE',
  style = 'FILL',
  font = 'SANS',
  full = false,
  children,
}) => (
  <div
    className={`note wrapper -${color.toLowerCase()} -${style.toLowerCase()} -${font.toLowerCase()} ${
      full ? '-full' : ''
    }`}
  >
    {children}
  </div>
)
