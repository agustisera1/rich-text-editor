# `Nolte-docs`

This repository contains the the solution for a challenge proposal @nolte.io

### Architecture overview

The project is structured into two main folders: `server` and `client`.

Currently, is a monolithic application but the goal is to split it into separate applications for a better maintainance and separation of concerns in matter of scalability, deployments, versioning, among other advantages.

The `client` side is responsible for handle client's logic such as collaborative text editing, handling socket communication, requesting updates in DB and protecting the system routes.

The `server` side is responsible to handle the client requests, such as authentication, CRUD operations over the documents model, and handling socket communication.

### Client stack

The client-side application is built with React, powered with Vite bundler. The most relevant technologies involved at the current system state are:

- react: for rendering UI components
- vite: for an optimized and customized bundle
- socket.io/client: for handling socket connections
- js-cookie: for managing cookies
- tiptap/react: for handling and configure rich text editors
- lucide-react: for icons

### Server stack

The server-side application is a simple server created with Node.js, Express.js, Socket.io and MongoDB.

The most relevant technologies involved at the current system state are:

- node.js: to run javascript outside of the browser
- express.js: to configure the server API
- socket.io: for handling socket connections
- dotenv: to handle environment files
- jsonwebtoken: to sign and create user tokens for authentication
- mongoDB: to run the actual DB
- mongoose: to leverage object relational mapping

### Setup guide

In order to run the project there are a few requirements:

- have the required .env files
- have a MongoDB instance running in the background
-

client .env file schema:

```
    VITE_SERVER_URL=""
```

server .env file schema:

```
    DB_URI=""
    ORIGIN=""
    SECRET_KEY=""

```

### Scripts

`IMPORTANT`: Since this project is still in development, there are no
scripts for production mode or .env variables configured to work with.

- run `npm run dev` scripts for both client and server projects.
- visit: http://localhost:5173/ to preview the client in the browser
- check the server console, it should display: App listening on port: 3001

### Future improvements / Next steps

The following set of changes / validations are considered as the next steps in the project enchancements

`Client side`

- Add error handling, map with server responses
- Map more server responses with UI updates. (e.g: page transitions, spinners)
- Implement an Auth framework
- Enhance rich text editor to send and store rich text instead of plain text
- Enhance rich text editor with more full toolbar options
- Enhance rich text editor to track user cursors
- Enhance rich text editor to consume user data when displaying participant avatars in the document
- Enhance navigation bar with a context menu for handle auth operations
- Improve vite bundler configs
- Optimize CSS usage and component layout designs
- Validate component nodes performance, implement memoization when corresponds
- Optimize data loading patterns
- Implement a state management library
- Add test runners and unit tests
- ...

`Server side`

- Investigate and apply design patterns to handle endpoints
- Investigate and apply
- Implement a better strategy to handle socket messaging
- Secure session management and persistence
- Track and broadcast user cursor positions
- Add document version history to the Document models

## Version - 0.1.0 - Updated: 2024/12/16
