const { GraphQLServer } = require("graphql-yoga");
const { generateMagenta } = require("../lib/utils");

// TEMP: Simulating a DB
let LISTS_COLLECTION = [
  {
    id: 1,
    title: "Kitties",
    tasks: [],
    tabColor: generateMagenta()
  },
  {
    id: 2,
    title: "Groceries",
    tasks: [],
    tabColor: generateMagenta()
  }
];

console.log(LISTS_COLLECTION);

// GraphQL schema definition - could later be moved out to its own schema.graphql file
const typeDefs = `
  type Query {
    list(id: Int!): List!
    lists: [List]!
  }
  type Mutation {
    createList(title: String!): List!
    updateList(id: Int!, title: String!): List!
    cleanDB: Boolean
  }

  type List {
    id: Int!
    title: String!
    tasks: [Task]
    tabColor: String!
  }
  type Task {
    id: Int
    title: String
    isChecked: Boolean
  }
`;

// Root resolver - functions have the following arguments: (parent, args, ctx, info)
const resolvers = {
  Query: {
    list: args => {
      const id = args.id;
      return LISTS_COLLECTION.filter(list => {
        return list.id === id;
      })[0];
    },
    lists: () => {
      return LISTS_COLLECTION;
    }
  },
  Mutation: {
    createList: (parent, { title }) => {
      const newList = {
        id: LISTS_COLLECTION.length + 1,
        title,
        tabColor: generateMagenta()
      };
      LISTS_COLLECTION.push(newList);
      return newList;
    },
    updateList: ({ id, message }) => {},
    cleanDB: () => {
      LISTS_COLLECTION = [];
      return true;
    }
  }
};

// GraphQL Yoga API: https://www.prisma.io/docs/1.8/graphql-ecosystem/graphql-yoga/overview-chaha122ho#api
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

// Define some options for the server
const graphQLYogaOptions = {
  port: process.env.PORT || 4000, // process.env.PORT lets the port be set by Heroku
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
  cors: {
    credentials: true,
    origin: "http://localhost:4000"
  }
};

// Run the server
server.start(graphQLYogaOptions, () => {
  console.log(
    `Server is now running on port http://localhost:${graphQLYogaOptions.port}`
  );
});
