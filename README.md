# Xery Blog App

![Xery Blog App](https://your-image-url.com)

## Table of Contents

- [Description](#description)
- [Environment Variables](#environment-variables)
  - [Client Folder](#client-folder)
  - [Server Folder](#server-folder)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Description

Xery Blog App is a full-stack web application built using Vite, React.js, Redux Toolkit, MongoDB, Node.js, Express, HTML, CSS, and Tailwind CSS. The project consists of two folders, "Client" and "Server," where "Client" contains the frontend code, and "Server" handles Node.js, Express, and MongoDB connectivity.

## Environment Variables

### Client Folder

Before running the client application, you need to set the following environment variables in the `.env` file located in the "client" folder:

- `VITE_TINY_MCE_API_KEY`: Obtain this API key by creating an account on [TinyMCE](https://www.tiny.cloud/).
- `VITE_API_BASE_URL`: The base URL for the server API.

### Server Folder

To run the server successfully, set the following environment variables in the `.env` file located in the "server" folder:

- `FRONTEND_ORIGIN_URL`: URL of the frontend application (e.g., `http://localhost:5173`).
- `CLOUDINARY_API_SECRET`, `CLOUDINARY_API_KEY`, `CLOUDINARY_CLOUD_NAME`: Obtain these credentials by creating an account on [Cloudinary](https://cloudinary.com/).
- `SECRET_KEY`: A secret key for JWT token generation.
- `MONGODB_URI`: MongoDB connection string. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to get the connection URI.
- `PORT`: The port number for the server (default: `3000`).

## Demo

Check out the live demo of the Xery Blog App: [Demo Link](https://xery-blog-mern.vercel.app/)

## Technologies Used

- Vite
- React.js
- Redux Toolkit
- MongoDB
- Node.js
- Express
- HTML
- CSS
- Tailwind CSS

## Installation

Follow these steps to run the application locally using npm:

1. Clone the repository: `git clone https://github.com/abubakar-shaikh-dev/xery-blog-mern.git`
2. Navigate to the "server" folder: `cd xery-blog-mern/server`
3. Install server dependencies: `npm install`
4. Set up the environment variables as explained above.
5. Start the server: `npm start`
6. Open a new terminal.
7. Navigate to the "client" folder: `cd ../client`
8. Install client dependencies: `npm install`
9. Set up the environment variables as explained above.
10. Start the client application: `npm run dev`

Now you can use and explore the Xery Blog App locally!

## Usage

Include any additional usage instructions or guidelines here.

## Contact

For any inquiries or feedback, you can reach me at [Your Email](mailto:your-email@example.com).
