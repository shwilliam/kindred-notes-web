import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {withApollo} from '../apollo/client'
import {Layout, Note} from '../components'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
    bookmarks {
      id
      content
      color
      font
      style
    }
  }
`

const Profile = () => {
  const router = useRouter()
  const {data, loading} = useQuery(ViewerQuery)

  if (
    loading === false &&
    data.viewer === null &&
    typeof window !== 'undefined'
  ) {
    router.push('/signin')
  }

  if (data && data.viewer) {
    return (
      <Layout>
        <header>
          <h1 className="sr-only">Profile</h1>
        </header>
        <main className="main">
          <p className="profile__title">{data.viewer.email}</p>
          <h2 className="title -center">Favourite Notes</h2>
          <ul className="note-grid">
            {data.bookmarks?.map(({id, content, color, style, font}) => (
              <li className="note-grid__cell" key={id}>
                <Link href={`/note/${id}`}>
                  <a className="link -no-ul">
                    <Note color={color} style={style} font={font}>
                      {content}
                    </Note>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <footer className="wrapper">
            <Link href="/signout">
              <a className="button -full">Sign out</a>
            </Link>
          </footer>
        </main>
      </Layout>
    )
  }

  return <p>Loading...</p>
}

export default withApollo(Profile)
