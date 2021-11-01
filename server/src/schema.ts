import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    "Fetch a list of random people, delay this request the specified amount and return the number of people requested"
    people(count: Int!, delay: Int): [Person!]!
  }

  "Author of a complete Track or a Module"
  type Person {
    id: ID!
    "Person's first name"
    first_name: String!
    "Person's last name"
    last_name: String!
    "Person's age"
    age: Int
  }
`;

export default typeDefs;
