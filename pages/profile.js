import Link from 'next/link'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'
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
import {useProfile, useViewer} from '../hooks'
import {protectRoute} from '../lib'

const deleteInterestRequest = async data => {
  const response = await fetch('/api/users/interests', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.user
}

const addInterestRequest = async data => {
  const response = await fetch('/api/users/interests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseJson = await response.json()

  return responseJson.user
}

export default () => {
  const router = useRouter()
  const viewer = useViewer()
  const profile = useProfile()
  const [deleteInterest] = useMutation(deleteInterestRequest)
  const [addInterest] = useMutation(addInterestRequest)

  const handleInterestsChange = interests =>
    addInterest({title: interests[0]}).then(router.reload)

  const handleInterestClick = title =>
    deleteInterest({title}).then(router.reload)

  if (!viewer.loading && !viewer.data && typeof window !== 'undefined') {
    router.push('/signin')
    return null
  }

  return (
    <main>
      <Head title="Profile" />
      <h1 className="sr-only">Profile</h1>

      {!profile.loading ? (
        <FadeIn className="footer-pad">
          <section className="main">
            <div className="wrapper">
              <Avatar variant={profile.data.user.avatar} />
              <p className="profile__title">{profile.data.user.email}</p>
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
      ) : (
        <Spinner full />
      )}

      <Footer />
    </main>
  )
}

export const getServerSideProps = ctx => {
  protectRoute(ctx)
  return {props: {}}
}
