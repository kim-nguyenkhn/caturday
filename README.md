# caturday

Mobile task-tracking app built with React Native & GraphQL.

## Getting Started

Requires `Node >= v8` & `npm >= v5`.

```shell
npm run setup

## Run caturday/backend in separate Terminal window - TODO: need to make one command that does it all
cd backend/ && npm start

## Now in caturday/ Terminal
npm start
```

## Testing out GraphQL requests

Go to http://localhost:4000/graphql to open the in-browser GraphQL IDE. See [the GraphiQL docs](https://github.com/graphql/graphiql) for more info.

There, you can view the Schema on the right, and try out queries/mutations yourself.

## Project Structure

- caturday
  - [assets/](assets/): Various assets, such as images, used in the app.
  - [backend/](backend/): Express-GraphQL backend. Should be run parallel with the frontend Expo app.
  - [components/](components/): Reusable-ish components.
  - [screens/](screens/): Each screen will have a home here. 
  - [App.js](App.js): Entry point for the app. Inlcudes the Apollo client setup & React Navigation routing.