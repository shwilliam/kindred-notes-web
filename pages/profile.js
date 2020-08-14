import Link from 'next/link'
import {useRouter} from 'next/router'
import {
  Avatar,
  FadeIn,
  Footer,
  Head,
  NoteGrid,
  PopularTagsSelect,
  Spinner,
} from '../components'
import {useAddInterest, useDeleteInterest, useProfile} from '../hooks'
import {validateHeaderToken} from '../lib'

const ProfilePage = () => {
  const router = useRouter()
  const profile = useProfile()
  const [deleteInterest] = useDeleteInterest()
  const [addInterest] = useAddInterest()

  return (
    <main className="footer-pad">
      <Head title="Profile" />
      <h1 className="sr-only">Profile</h1>

      <nav className="nav -floating wrapper">
        <button className="link" onClick={router.back}>
          Back
        </button>
      </nav>

      {profile.status === 'loading' ? (
        <Spinner />
      ) : profile.status === 'error' ? (
        <p className="error">Something unexpected happened...</p>
      ) : (
        <FadeIn>
          <section className="main">
            <div className="wrapper -small">
              <Avatar variant={profile.data.user?.avatar} />
              <p className="profile__title">{profile.data.user?.email}</p>
              <PopularTagsSelect
                title="Topics of Interest"
                onSelect={addInterest}
                onRemove={deleteInterest}
                tags={profile.data.user?.interests.map(({title}) => title)}
              />

              {profile.data.user?.bookmarks?.length ? (
                <div className="pad--bottom">
                  <NoteGrid
                    title="Favourite Notes"
                    loading={profile.status === 'loading'}
                    error={profile.status === 'error'}
                    notes={profile.data.user?.bookmarks}
                    small
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

export default ProfilePage
