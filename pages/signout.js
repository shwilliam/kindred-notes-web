import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {Head} from '../components'
import {signOutRequest} from '../lib'

export default () => {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      await signOutRequest()
      router.push('/')
    })()
  }, [router])

  return (
    <div className="layout">
      <Head title="Signing out..." />
      <h1 className="sr-only">Signing out...</h1>
    </div>
  )
}
