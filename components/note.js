export default function Note({
  color = 'BLUE',
  style = 'FILL',
  font = 'SANS',
  full = false,
  children,
}) {
  return (
    <div
      className={`note wrapper -${color.toLowerCase()} -${style.toLowerCase()} -${font.toLowerCase()} ${
        full ? '-full' : ''
      }`}
    >
      {children}
    </div>
  )
}
