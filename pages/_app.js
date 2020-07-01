import {AnimatePresence} from 'framer-motion'
import {Layout, ReactQueryConfigProvider} from '../components'

import '../css/reset.css'
import '@reach/tabs/styles.css'
import '../css/mapbox.min.css'
import '../css/global.css'

export default ({Component, pageProps}) => (
  <ReactQueryConfigProvider>
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </Layout>
  </ReactQueryConfigProvider>
)
