export const Tag = ({topic, onClick, selected = false}) => {
  const handleClick = () => onClick(topic)

  return (
    <button
      className={`button tag ${selected ? '-selected' : ''}`}
      type="button"
      onClick={handleClick}
    >
      {selected && <span className="sr-only">Remove</span>}
      {topic}
      {selected && <span aria-hidden>{topic}&nbsp;&nbsp;&nbsp;✕</span>}
    </button>
  )
}
