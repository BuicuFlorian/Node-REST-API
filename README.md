# Simple Node.js RESTful API

## Requirements
- [Node and npm](https://nodejs.org)
- MongoDB Database: [mLab](https://mlab.com) or [local](https://www.mongodb.com/download-center)
- Optional: [nodemon](http://nodemon.io/)

## Installation

- Download the [repository](https://github.com/BuicuFlorian/Node-REST-API/archive/master.zip)
- Install dependencies: `npm install`
- Copy the .env.example to your own file: `cp .env.example .env`
- Set the `DATABASE_URL` in `.env`
- Compile files: `npm run postinstall`
- Start the server: `npm start` or, if you have nodemon installed: `npm run dev`
- Test using [POSTMAN](https://www.getpostman.com/)  at `localhost:8080/api/books/`