import { ApolloServer } from 'apollo-server-lambda';
import lambdaPlayground from 'graphql-playground-middleware-lambda';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  introspection: true,
  // mocks: true,
  playground: {
    settings: {
      'editor.theme': 'light'
    }
  }
})

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  }
});

exports.playgroundHandler = lambdaPlayground({
	endpoint: '/dev/graphql'
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});

exports.server = server
