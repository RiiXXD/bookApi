API Setup and Usage Guide
This guide provides instructions for setting up and running the API.

Prerequisites
Node.js installed on your machine
MongoDB installed locally or accessible remotely
Basic understanding of RESTful APIs
Installation
Clone the repository to your local machine:
bash
Copy code
git clone <repository_url>
Navigate to the project directory:
bash
Copy code
cd <project_directory>
Install dependencies using npm:
Copy code
npm install
Configuration
Create a .env file in the root directory of the project.
Add the following configuration to the .env file:
makefile
Copy code
DB_CONNECTION_STRING=<your_mongodb_connection_string>
Port=<port_number>
Replace <your_mongodb_connection_string> with your MongoDB connection string, and <port_number> with the desired port number for the server to run on.

Running the Server
To start the server, run the following command:

sql
Copy code
npm start
The server will start running on the specified port.

API Endpoints
User Routes
POST /user/login: Login user.
POST /user/sign: Sign up new user.
Book Routes
POST /book/post: Post a new book.
GET /book/getBooks: Get all books.
DELETE /book/delete/:BookId: Delete a book by ID.
PUT /book/edit/:BookId: Edit a book by ID.
Endpoint Indexing
You can access a list of available endpoints by making a GET request to the root endpoint /. This will return a JSON object containing endpoint information for both user and book routes.

Example:

sql
Copy code
GET /
Response:

json
Copy code
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
License
This project is licensed under the MIT License - see the LICENSE file for details.
