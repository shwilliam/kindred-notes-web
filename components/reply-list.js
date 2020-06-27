import {Avatar} from './index'

export const ReplyList = ({replies}) =>
  replies?.length > 0 && (
    <section className="wrapper">
      <h2 className="title">Who appreciated your note</h2>
      <ul className="reply__list">
        {replies.map(({id, content, author}) => (
          <li className="reply" key={id}>
            <Avatar variant={author.avatar} small />
            <div>
              <p className="reply__name">{author.nickname ?? 'Anonymous'}</p>
              <p className="reply__text">{content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
