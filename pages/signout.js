import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {Footer, Head, Layout} from '../components'

const signOutRequest = async () => {
  const response = await fetch('/api/users/signout')
  const responseJson = await response.json()

  return responseJson
}

export default () => {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      await signOutRequest()
      router.push('/')
    })()
  }, [router])

  return (
    <Layout>
      <Head title="Signing out..." />
      <h1 className="sr-only">Signing out...</h1>
      <Footer />
    </Layout>
  )
}
