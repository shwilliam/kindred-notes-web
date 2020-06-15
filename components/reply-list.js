import {Avatar} from './index'

export const ReplyList = ({replies}) =>
  replies?.length > 0 && (
    <section className="wrapper">
      <h2 className="title">Who appreciated your note</h2>
      <ul className="reply__list">
        {replies.map(({id, content, avatar}) => (
          <li className="reply" key={id}>
            <Avatar variant={avatar} small />
            <p className="reply__text">{content}</p>
          </li>
        ))}
      </ul>
    </section>
  )
