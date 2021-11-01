import type { Resolvers } from './generated/graphql';

const resolvers: Resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    people: (_, { count, delay }, { dataSources }) => {
      return dataSources.mockAPI.getPeople(count, delay);
    },
  },
};

export default resolvers;
