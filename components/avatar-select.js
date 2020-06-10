import {Avatar} from './index'

const AVATAR_AMOUNT = 105
export const AvatarSelect = ({value = 1, onChange}) => {
  const next = () => {
    if (value + 1 <= AVATAR_AMOUNT) {
      onChange(value + 1)
    } else {
      onChange(1)
    }
  }

  const previous = () => {
    if (value - 1 >= 1) {
      onChange(value - 1)
    } else {
      onChange(AVATAR_AMOUNT)
    }
  }

  return (
    <section>
      <Avatar variant={value} />

      <div className="avatar-select__actions">
        <button
          className="avatar-select__action"
          type="button"
          onClick={previous}
        >
          <span className="flip" role="img" aria-label="Previous">
            ☞
          </span>
        </button>

        <button className="avatar-select__action" type="button" onClick={next}>
          <span role="img" aria-label="Next">
            ☞
          </span>
        </button>
      </div>
    </section>
  )
}
