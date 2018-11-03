const express = require("express");
const expressGraphQL = require("express-graphql");
const { buildSchema } = require("graphql");

const PORT = 4000;

// GraphQL schema
const schema = buildSchema(`
  type Query {
    list(id: Int!): List
    lists: [List]
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
  list: args => {
    const id = args.id;
    return LISTS_COLLECTION.filter(list => {
      return list.id === id;
    })[0];
  },
  lists: () => LISTS_COLLECTION,
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

app.listen(PORT, () =>
  console.log(`Express GraphQL server now running on localhost:${PORT}/graphql`)
);
