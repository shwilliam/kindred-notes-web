import {ReactQueryConfigProvider as ReactQueryConfigProviderComponent} from 'react-query'

const reactQueryConfig = {
  queries: {
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  },
  mutations: {
    throwOnError: false,
  },
}

export const ReactQueryConfigProvider = ({children}) => (
  <ReactQueryConfigProviderComponent config={reactQueryConfig}>
    {children}
  </ReactQueryConfigProviderComponent>
)
