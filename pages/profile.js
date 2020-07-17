import Link from 'next/link'
import {useRouter} from 'next/router'
import {
  Avatar,
  FadeIn,
  Head,
  NoteGrid,
  Spinner,
  Tag,
  TagsInput,
} from '../components'
import {useAddInterest, useDeleteInterest, useProfile} from '../hooks'
import {validateHeaderToken} from '../lib'

export default () => {
  const router = useRouter()
  const profile = useProfile()
  const [deleteInterest] = useDeleteInterest()
  const [addInterest] = useAddInterest()

  const handleInterestsChange = interests => addInterest({title: interests[0]})

  const handleInterestClick = title => deleteInterest({title})

  return (
    <main>
      <Head title="Profile" />
      <h1 className="sr-only">Profile</h1>

      <nav className="nav -floating wrapper">
        <button className="link" onClick={router.back}>
          Back
        </button>
      </nav>

      {profile.status === 'loading' ? (
        <Spinner full />
      ) : profile.status === 'error' ? (
        <p className="error">Something unexpected happened...</p>
      ) : (
        <FadeIn className="footer-pad">
          <section className="main">
            <div className="wrapper -small">
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
                    <Tag topic={title} onClick={handleInterestClick} selected />
                  </li>
                ))}
              </ul>

              {profile.data.user?.bookmarks?.length ? (
                <div className="pad -bottom">
                  <NoteGrid
                    title="Favourite Notes"
                    loading={profile.status === 'loading'}
                    error={profile.status === 'error'}
                    notes={profile.data.user?.bookmarks}
                  />
                </div>
              ) : null}
            </div>

            <footer className="wrapper -small">
              <Link href="/signout">
                <a title="Sign out" className="button -full">
                  Sign out
                </a>
              </Link>
            </footer>
          </section>
        </FadeIn>
      )}
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
