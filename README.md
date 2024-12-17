# `Nolte-docs`

This repository contains the the solution for a challenge proposal @nolte.io

### Architecture overview

The project is structured into two main folders: `server` and `client`.

Currently, it is a monolithic application, but the goal is to split it into separate applications for better maintainability and separation of concerns in terms of scalability, deployments, versioning, among other advantages.

The `client` side handles the client's logic, such as collaborative text editing, socket communication, requesting database updates, and protecting system routes.

The `server` side manages client requests, including authentication, CRUD operations on the documents model, and socket communication.

### Client stack

The client-side application is built with React, powered by Vite. The most relevant technologies involved in the current system state are:

- `react`: for rendering UI components
- `vite`: for an optimized and customized bundle
- `socket.io/client`: for handling socket connections
- `js-cookie`: for managing cookies
- `tiptap/react`: for handling and configure rich text editors
- `lucide-react`: for icons

### Server stack

The server-side application is a simple server created with Node.js, Express.js, Socket.io, and MongoDB.

The most relevant technologies involved in the current system state are:

- `node.js`: to run javascript outside of the browser
- `express.js`: to configure the server API
- `socket.io`: for handling socket connections
- `dotenv`: to manage environment files
- `jsonwebtoken`: to sign and create user tokens for authentication
- `mongoDB`: to run the actual database
- `mongoose`: to leverage object-relational mapping

### Setup guide

To run the project, you need to:

- have the required .env files
- have a MongoDB instance running in the background

client `.env` file schema:

```
    VITE_SERVER_URL=""
```

server `.env` file schema:

```
    DB_URI=""
    ORIGIN=""
    SECRET_KEY=""

```

### Scripts

`IMPORTANT`: Since this project is still in development, there are no scripts for production mode or .env variables configured to work with.

- run `npm run dev` scripts for both client and server projects.
- visit: `http://localhost:5173/` to preview the client in the browser
- in the server console; check that the "App listening on port: `{port}`"

### Future improvements / Next steps

The following set of changes/validations are considered as the next steps in the project enhancements

`Client side`

- Add more error handling
- Map and connect the full server responses
- Map and connect server responses with UI updates (e.g.: page transitions, spinners)
- Implement an auth framework
- Enhance the rich text editor to send and store rich text instead of plain text
- Enhance the rich text editor with full toolbar options
- Enhance the rich text editor to track users cursor
- Enhance the rich text editor to display participant avatars in the document
- Enhance the navigation bar with a context menu for handling auth operations
- Check for more useful Vite configurations
- Check for CSS usage and improve component layout designs
- Check components for performance
- Check for enhancements in data fetching patterns
- Check the potential need of implementing a state management library
- Add test runners and unit tests

...

`Server side`

- Investigate design patterns for handling endpoints
- Investigate patterns to handle socket messaging
- Enhance with secure session management and persistence
- Fix document version history

## Version - 0.1.0 - Updated: 2024/12/17
