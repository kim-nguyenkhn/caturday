# caturday

Mobile task-tracking app built with React Native & GraphQL.

## Getting Started

Requires `Node >= v8` & `npm >= v5`.

```
npm run setup
npm start
```

## Project Structure

- caturday
  - [assets/](assets/): Various assets, such as images, used in the app.
  - [backend/](backend/): Express-GraphQL backend. Should be run parallel with the frontend Expo app.
  - [components/](components/): Reusable-ish components.
  - [screens/](screens/): Each screen will have a home here. 
  - [App.js](App.js): Entry point for the app. Inlcudes the Apollo client setup & React Navigation routing.