import {makeExecutableSchema} from 'graphql-tools'
import {resolvers, typeDefs} from './index'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
