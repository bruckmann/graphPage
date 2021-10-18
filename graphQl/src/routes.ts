import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const routes = Router();

const typeDefs: any = [
  `
  type Query {
    hello: String
  }
     
  type Mutation {
    hello(message: String) : String
  }
`,
];

let helloMessage: String = "World!";

const resolvers = {
  Query: {
    hello: () => helloMessage,
  },
  Mutation: {
    hello: (_: any, helloData: any) => {
      helloMessage = helloData.message;
      return helloMessage;
    },
  },
};

routes.get(
  "/graphql",
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true,
  })
);

routes.post(
  "/graphql",
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true,
  })
);

export { routes };
