You're right, I've removed those features from the key features section:

# Xery Blog App

![Xery Blog App Screenshot](https://raw.githubusercontent.com/abubakar-shaikh-dev/xery-blog-mern/main/media/xery-blog-app.png) 

Xery Blog App is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js).

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
    - [Client](#client)
    - [Server](#server)
  - [Installation](#installation)
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

Live Demo: [https://xery-blog-mern.vercel.app](https://xery-blog-mern.vercel.app)

## Getting Started

### Environment Variables

Copy the `.env.example` file to `.env` and update the values for the environment variables  

#### Client

`VITE_TINYMCE_API_KEY` : Get API key from [TinyMCE](https://www.tiny.cloud/)

`VITE_API_BASE_URL`: Base URL of the backend API

#### Server

`FRONTEND_ORIGIN_URL` : URL of frontend app (e.g. http://localhost:5173)

`CLOUDINARY_API_*` : Get credentials from [Cloudinary](https://cloudinary.com/) 

`SECRET_KEY` : Secret key for JWT

`MONGODB_URI` : Get URI from [MongoDB Atlas](https://www.mongodb.com/atlas/database)

`PORT` : Port for server (default is 3000)

### Installation

```bash
# Clone the repository
git clone https://github.com/abubakar-shaikh-dev/xery-blog-mern.git

# Server - Install dependencies and start 
cd server
npm install
npm start

# Client - Install dependencies and start
cd client
npm install
npm run dev
```

The app should now be running on http://localhost:5173

## Contact

For any questions or issues, please email shaikhabubakar2380@gmail.com
