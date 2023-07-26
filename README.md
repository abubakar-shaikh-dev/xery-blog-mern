# Xery Blog App (MERN)

![Xery Blog App](https://github.com/abubakar-shaikh-dev/xery-blog-mern/assets/64248752/a4171c93-0e33-423c-997f-2accf7b559d0)

Xery Blog App is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js).

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
    - [Client](#client)
    - [Server](#server)
- [Contact](#contact)

## Key Features

- Blog post creation, editing, and deletion
- Rich text editor for creating posts
- Image upload for posts
- User authentication

## Tech Stack

**Client:** React, Redux Toolkit, TailwindCSS

**Server:** Node, Express, MongoDB, JWT

## Demo

Experience the live demo of the application: [https://xery-blog-mern.vercel.app](https://xery-blog-mern.vercel.app)

## Getting Started

### Installation

Follow these steps to set up the application:

```bash
# Clone the repository
git clone https://github.com/abubakar-shaikh-dev/xery-blog-mern.git

# Client - Install dependencies
cd client
npm install

# Server - Install dependencies
cd ../server
npm install
```

### Environment Variables

Before you run the application, make sure to create a `.env` file in both the `client` and `server` directories.

#### Client

In `.env` (client folder):

```
VITE_TINYMCE_API_KEY=<Get your API key from [TinyMCE](https://www.tiny.cloud/)>
VITE_API_BASE_URL=<Base URL of the backend API, e.g. http://localhost:3000/api>
```

#### Server

In `.env` (server folder):

```
FRONTEND_ORIGIN_URL=<URL of the frontend app, e.g. http://localhost:5173>
CLOUDINARY_API_KEY=<Get your API Key from [Cloudinary](https://cloudinary.com/) after creating an account>
CLOUDINARY_CLOUD_NAME=<Get your Cloud Name from [Cloudinary](https://cloudinary.com/) after creating an account>
SECRET_KEY=<Your secret key for JWT (Random Text)>
MONGODB_URI=<Get your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/atlas/database)>
PORT=<Port for the server, default is 3000>
```

### Start the Application

After setting up the environment variables, you can now start the application:

```bash
# Start the server
cd ../server
npm start

# Start the client
cd ../client
npm run dev
```

The app should now be up and running at http://localhost:5173

## Contact

For any questions or issues, feel free to reach out to us at shaikhabubakar2380@gmail.com. We would love to hear from you!
