export default function Note({
  color = 'BLUE',
  style = 'FILL',
  font = 'SANS',
  children,
}) {
  return (
    <div
      className={`note -${color.toLowerCase()} -${style.toLowerCase()} -${font.toLowerCase()}`}
    >
      {children}
    </div>
  )
}
