export const Tag = ({idx, topic, onClick, children}) => {
  const handleClick = () => onClick(topic)

  return (
    <button className="button tag" type="button" onClick={handleClick}>
      <span className="sr-only">{children || 'Remove {topic}'}</span>
      <span aria-hidden>{topic}&nbsp;&nbsp;&nbsp;✕</span>
    </button>
  )
}
