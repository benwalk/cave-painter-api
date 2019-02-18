const { ApolloServer } = require("apollo-server-lambda");
const lambdaPlayground = require("graphql-playground-middleware-lambda");
const { schema } = require("./schema");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
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
      "editor.theme": "light"
    }
  },
  tracing: true
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});

// exports.playgroundHandler = lambdaPlayground({
// 	endpoint: '/dev/playground'
// })

// exports.server = server
