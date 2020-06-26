import '../css/reset.css'
import '@reach/tabs/styles.css'
import '../css/mapbox.min.css'
import '../css/global.css'
import {AnimatePresence} from 'framer-motion'
import {Layout} from '../components'

export default ({Component, pageProps}) => (
  <Layout>
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} />
    </AnimatePresence>
  </Layout>
)
