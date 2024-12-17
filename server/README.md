# Server.js Documentation - V 0.1

### Overview

The `server.js` file is the main entry point for the server-side application. It sets up the server, handles the HTTP requests while managing WebSocket connections.

This documentation provides a brief overview of the main endpoints and relevant socket events in the server.js file. For more detailed information, refer to the source code and inline comments.

## Main Endpoints

### 1. `POST /login`
- **Description**: Authenticates a user and returns a token.
- **Request Body**:
  ```json
  {
    "username": "user",
    "password": "pass"
  }
  ```
- **Response**:

  ```json
  {
    "token": "abcdef123456"
  }
  ```
### Future improvements:
Avoid sending and storing the token in the CS Cookies. Ideally a JWT rotation token will make the app more reliable in combination with a trusted Auth framework. The current state is just a primary approach to handle an Auth context across the application.

### 2. `POST /register`

- **Description**: Registers a new user and returns a confirmation message.
- **Request Body**:
  ```json
  {
    "username": "newuser",
    "password": "newpass",
    "email": "user@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### 3. `POST /logout`

- **Description**: Logs out a user by invalidating the token.

- **Response**:
  ```json
  {
    "message": "User logged out successfully"
  }
  ```
### Future improvements:
The current state of `/logout` is only invalidating the SS Cookies, but not looking for a specific token. Ideally, we should send a token in the request body to manage properly the cookies settle and removal. This includes rotation token and session refreshing with a new enpoint

### 4. `GET /documents`

- **Description**: Retrieves a list of documents.
- **Response**:
  ```json
  [
    {
        "name": "Document 1",
        "created": "...",
        "author": { username: "...", email: "..." },
        "content": "Lorem ipsum ...",
        "lastModified": "...",
        "__v": "..." <--- version key
        "_id": "6760b0a3c181f1838a6de5af"
    },
    {
        ...
    }
  ]
  ```

### 5. `POST /documents`

### 6. `PATCH /documents/:id`

### 7. `DELETE /documents/:id`

## Socket Events

```
const events = {
JOIN_DOCUMENT: "join-document",
GET_ROOM_PARTICIPANTS: "get-room-participants",
SEND_CHANGES: "send-changes",
AUTOSAVE: "autosave",
DISCONNECT: "disconnect",
USERS_CONNECTED: "users-connected",
LOAD_DOCUMENT: "load-document",
RECEIVE_CHANGES: "recieve-changes",
ALERT: "alert",
CONNECTION: "connection",
};

```
