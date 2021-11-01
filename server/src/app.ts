import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import MockAPI from './datasources/mockAPI';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    mockAPI: new MockAPI(),
  }),
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
