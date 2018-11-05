const { GraphQLServer } = require("graphql-yoga");
const { buildSchema } = require("graphql");

// GraphQL schema - could later be moved out to its own .graphql file
const schema = buildSchema(`
  type Query {
    list(id: Int!): List
    lists: [List]
  }
  type Mutation {
    createList(title: String!): List!
    updateList(id: Int!, title: String!): List!
    cleanDB: Boolean
  }

  type List {
    id: Int
    title: String
  }
  type ListItem {
    id: Int
    title: String
    isChecked: Boolean
  }
`);

// TEMP: Simulating a DB
let LISTS_COLLECTION = [
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
const resolvers = {
  list: args => {
    const id = args.id;
    return LISTS_COLLECTION.filter(list => {
      return list.id === id;
    })[0];
  },
  lists: () => LISTS_COLLECTION,
  createList: ({ title }) => {
    const newList = {
      id: LISTS_COLLECTION.length + 1,
      title
    };
    LISTS_COLLECTION.push(newList);
    return newList;
  },
  updateList: ({ id, message }) => {},
  cleanDB: () => {
    LISTS_COLLECTION = [];
    return true;
  }
};

const server = new GraphQLServer({
  schema,
  resolvers
  // resolverValidationOptions: {
  //   requireResolversForResolveType: false
  // }
});
const graphQLYogaOptions = {
  port: 4000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
  cors: {
    credentials: true,
    origin: "http://localhost:4000"
  }
};
server.start(graphQLYogaOptions, () => {
  console.log(
    `Server is now running on port http://localhost:${graphQLYogaOptions.port}`
  );
});
