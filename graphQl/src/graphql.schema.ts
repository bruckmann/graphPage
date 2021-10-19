import { resolvers } from './graphql.resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = `
  type User {
    id: ID
    email: String
    name: String
    password: String 
  }
  type Query {
    user(id: ID): User
    allUsers: [User!]!
  }
  input UserInput {
    email: String!
    name: String!
    password: String!
  }
  type Mutation {
    createUser(input: UserInput): User
  }
`;
const schema = makeExecutableSchema({typeDefs, resolvers});

export { schema };