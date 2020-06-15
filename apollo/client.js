import {ApolloProvider} from '@apollo/react-hooks'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import Head from 'next/head'

let globalApolloClient = null

// create and provide the apollo context to next.js page tree
// exposed by wrapping page component in HOC
export const withApollo = (PageComponent, {ssr = true} = {}) => {
  const WithApollo = ({apolloClient, apolloState, ...pageProps}) => {
    const client = apolloClient || initApolloClient(undefined, apolloState)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  // set the correct `displayName` in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const {AppTree} = ctx

      // init apollo client, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`
      const apolloClient = (ctx.apolloClient = initApolloClient({
        res: ctx.res,
        req: ctx.req,
      }))

      // run wrapped `getInitialProps` methods
      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      // server
      if (typeof window === 'undefined') {
        // redirecting
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }

        if (ssr) {
          try {
            // run all gql queries
            const {getDataFromTree} = await import('@apollo/react-ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />,
            )
          } catch (error) {
            // prevent gql errors from crashing ssr
            // handle them in components via the data.error prop
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }

      // extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,
        apolloState,
      }
    }
  }

  return WithApollo
}

// always creates a new apollo client on server
// creates or reuses apollo client in browser
const initApolloClient = (ctx, initialState) => {
  // ensure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (typeof window === 'undefined') {
    return createApolloClient(ctx, initialState)
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(ctx, initialState)
  }

  return globalApolloClient
}

const createApolloClient = (ctx = {}, initialState = {}) => {
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache().restore(initialState)

  return new ApolloClient({
    ssrMode,
    link: createIsomorphLink(ctx),
    cache,
  })
}

const createIsomorphLink = ctx => {
  if (typeof window === 'undefined') {
    const {SchemaLink} = require('apollo-link-schema')
    const {schema} = require('./schema')
    return new SchemaLink({schema, context: ctx})
  } else {
    const {HttpLink} = require('apollo-link-http')

    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    })
  }
}
