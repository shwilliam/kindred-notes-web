import {AnimatePresence} from 'framer-motion'
import {ReactQueryConfigProvider} from 'react-query'
import {Layout} from '../components'
import {reactQueryConfig} from '../config'

import '../css/reset.css'
import '@reach/tabs/styles.css'
import '../css/mapbox.min.css'
import '../css/global.css'

export default ({Component, pageProps}) => (
  <ReactQueryConfigProvider config={reactQueryConfig}>
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </Layout>
  </ReactQueryConfigProvider>
)
