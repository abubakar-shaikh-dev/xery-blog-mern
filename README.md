Here is a draft README.md file for your github repo following the details and rules you provided:

# Xery Blog App

This is a blog app built with React, Redux Toolkit, MongoDB, Node.js, Express, HTML, CSS, JS, and Tailwind CSS. 

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation) 
- [Environment Variables](#environment-variables)
  - [Client Env Vars](#client-env-vars)
  - [Server Env Vars](#server-env-vars)  
- [Cloudinary Setup](#cloudinary-setup)  
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [TinyMCE Setup](#tinymce-setup)
- [Project Structure](#project-structure)
- [Demo](#demo)

## Technologies Used

- React
- Redux Toolkit
- MongoDB
- Node.js 
- Express
- HTML
- CSS
- JavaScript
- TailwindCSS

## Installation

```
npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Client Env Vars

`VITE_TINY_MCE_API_KEY`

`VITE_API_BASE_URL` 

### Server Env Vars 

`FRONTEND_ORIGIN_URL`

`CLOUDINARY_API_SECRET`

`CLOUDINARY_API_KEY`

`CLOUDINARY_CLOUD_NAME` 

`SECRET_KEY`

`MONGODB_URI`

## Cloudinary Setup

- Sign up for a free account on [Cloudinary](https://cloudinary.com/)
- Get your Cloudinary API Secret, Key, and Cloud name and add them to the Server Env Vars

## MongoDB Atlas Setup

- Sign up for a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- Whitelist your IP address 
- Create a database user 
- Get the connection URI and add it to `MONGODB_URI` server env var

## TinyMCE Setup 

- Sign up for a free API key on [TinyMCE](https://tiny.cloud/)
- Add the API key to `VITE_TINY_MCE_API_KEY` client env var

## Project Structure

```
├── client 
│   ├── src 
│   │   ├── components
│   │   ├── features
│   │   ├── app
│   │   ├── index.css
│   │   └── main.jsx
│   └── vite.config.js
├── server
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
└── README.md
```

## Demo

You can find a live demo here: [https://xery-blog-mern.vercel.app/](https://xery-blog-mern.vercel.app/)

Let me know if you would like me to modify or expand this README file in any way!
