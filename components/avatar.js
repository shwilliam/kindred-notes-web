export const Avatar = ({variant = 1, small = false, ...props}) => (
  <img
    className={`avatar ${small ? '-small' : ''}`}
    src={`/images/avatars/peep-${variant}.png`}
    aria-label={`Avatar variant ${variant}`}
    {...props}
  />
)
