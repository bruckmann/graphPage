import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql.schema";

const routes = Router();

routes.all(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

export { routes };
