# Models Documentation

## Document Model

The `DocumentModel` represents a document in the rich-text editor application.

### Schema

- `name`: A string representing the name of the document.
- `created`: A date representing when the document was created. Defaults to the current date.
- `author`: An object containing the author's `username` and `email`.
- `content`: A string representing the content of the document. Defaults to an empty string.
- `lastModified`: A date representing when the document was last modified. Defaults to the current date.
- `__v`: A version key that increments whenever the document content is modified.

### Export

- `DocumentModel`: The Mongoose model for the document schema.

## User Model

The `UserModel` represents a user in the rich-text editor application.

### Schema

- `username`: A string representing the username of the user.
- `email`: A string representing the email of the user.
- `password`: A string representing the hashed password of the user.
- `created`: A date representing when the user was created. Defaults to the current date.

### Hooks

- `pre('save')`: Before saving a user, the password is hashed using bcrypt.

### Utils

- `comparePassword(candidatePassword)`: Compares a candidate password with the user's hashed password using bcrypt.

### Export

- `UserModel`: The Mongoose model for the user schema.
