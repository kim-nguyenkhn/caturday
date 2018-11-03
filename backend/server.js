const express = require("express");
const expressGraphQL = require("express-graphql");
const { buildSchema } = require("graphql");

// GraphQL schema
const schema = buildSchema(`
  type Query {
    list(id: Int!): List
    lists(title: String): [List]
  }
  type Mutation {
    updateList(id: Int!, title: String!): List
  }
  type List {
    id: Int
    title: String
  }
`);

// TEMP: Simulating a DB
const LISTS_COLLECTION = [
  {
    id: 1,
    title: "Kitties"
  },
  {
    id: 2,
    title: "Groceries"
  }
];

// Root resolver
const root = {
  getLists: args => LISTS_COLLECTION,
  updateList: ({ id, message }) => {}
};

// Create an express server & GraphQL endpoint
var app = express();
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () =>
  console.log("Express GraphQL server now running on localhost:3000/graphql")
);
