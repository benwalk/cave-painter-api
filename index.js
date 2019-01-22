const { server }  = require('./graphql/handler');

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
