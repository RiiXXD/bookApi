
# API Setup and Usage Guide

This guide provides instructions for setting up and running the API.

## Prerequisites

- Node.js installed on your machine
- MongoDB installed locally or accessible remotely
- Basic understanding of RESTful APIs

## Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/RiiXXD/bookApi.git
```

3. Install dependencies using npm:

```
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following configuration to the `.env` file:

```
MONGO_URL=<your_mongodb_connection_string>
Port=<port_number>
EncryptionKey=<EncryptionKey>
```

Replace `<your_mongodb_connection_string>` with your MongoDB connection string, `<port_number>` with the desired port number for the server to run on and `<EncryptionKey>` Of Your Choice.

## Running the Server

To start the server, run the following command:

```
npm run dev (npm run nodemon server.js)
npm run start (npm run node server.js)

```

The server will start running on the specified port.

## API Endpoints

### User Routes

- **POST /user/login**: Login user.
- **POST /user/sign**: Sign up new user.

### Book Routes

- **POST /book/post**: Post a new book.
- **GET /book/getBooks**: Get all books.
- **DELETE /book/delete/:BookId**: Delete a book by ID.
- **PUT /book/edit/:BookId**: Edit a book by ID.

### Endpoint Indexing

You can access a list of available endpoints by making a GET request to the root endpoint `/`. This will return a JSON object containing endpoint information for both user and book routes.

Example:

```
GET /
```

Response:

```json
{
  "endpoints": {
    "user": {
      "/login": "login",
      "/sign": "Sign up"
    },
    "book": {
      "/post": "To Post Book",
      "/getBooks": "To get all Books",
      "/delete/:BookId": "Delete Book",
      "/edit/:BookId": "Edit Book"
    }
  }
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to let me know if you need any further modifications or additional information!
