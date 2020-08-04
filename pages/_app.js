import {AnimatePresence} from 'framer-motion'
import {ReactQueryConfigProvider} from '../components'

import '../css/reset.css'
import '@reach/tabs/styles.css'
import '../css/mapbox.min.css'
import '../css/global.css'

export default ({Component, pageProps}) => (
  <ReactQueryConfigProvider>
    <div className="layout">
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </div>
  </ReactQueryConfigProvider>
)
