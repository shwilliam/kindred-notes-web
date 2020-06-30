import Link from 'next/link'
import {
  Avatar,
  FadeIn,
  Footer,
  Head,
  Note,
  Spinner,
  Tag,
  TagsInput,
} from '../components'
import {useAddInterest, useDeleteInterest, useProfile} from '../hooks'
import {validateHeaderToken} from '../lib'

export default () => {
  const profile = useProfile()
  const [deleteInterest] = useDeleteInterest()
  const [addInterest] = useAddInterest()

  const handleInterestsChange = interests => addInterest({title: interests[0]})

  const handleInterestClick = title => deleteInterest({title})

  return (
    <main>
      <Head title="Profile" />
      <h1 className="sr-only">Profile</h1>

      {profile.status === 'loading' ? (
        <Spinner full />
      ) : profile.status === 'error' ? (
        <p className="error">Something unexpected happened...</p>
      ) : (
        <FadeIn className="footer-pad">
          <section className="main">
            <div className="wrapper">
              <Avatar variant={profile.data.user?.avatar} />
              <p className="profile__title">{profile.data.user?.email}</p>
              <label>
                <p className="title -small -center">Topics of Interest</p>
                <TagsInput
                  className="input"
                  value={profile.data.user?.interests}
                  onChange={handleInterestsChange}
                />
              </label>
              <ul className="tags">
                {profile.data.user?.interests.map(({title}, idx) => (
                  <li key={idx}>
                    <Tag
                      idx={idx}
                      topic={title}
                      onClick={handleInterestClick}
                    />
                  </li>
                ))}
              </ul>

              {profile.data.user?.bookmarks?.length ? (
                <div className="wrapper -no-pad">
                  <h2 className="title -small -center">Favourite Notes</h2>
                  <ul className="note-grid">
                    {profile.data.user?.bookmarks?.map(
                      ({id, content, color, style, font}) => (
                        <li className="note-grid__cell" key={id}>
                          <Link href={`/note/${id}`}>
                            <a className="link -no-ul">
                              <Note color={color} style={style} font={font}>
                                {content}
                              </Note>
                            </a>
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ) : null}
            </div>
            <footer className="wrapper">
              <Link href="/signout">
                <a title="Sign out" className="button -full">
                  Sign out
                </a>
              </Link>
            </footer>
          </section>
        </FadeIn>
      )}

      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  const token = validateHeaderToken(ctx.req.headers)
  if (!token)
    ctx.res
      .writeHead(301, {
        Location: '/signin',
      })
      .end()

  return {props: {}}
}
