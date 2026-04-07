# Petstagram Backend

This is the backend for our Petstagram project (Group 2 COSC484).
Built with Node.js, Express, and MongoDB.

## How to run it

make sure you have node installed first

1. go into the backend folder and install everything
```bash
npm install
```

2. make a .env file (copy from .env.example) and fill in your mongodb connection string and a session secret

3. start the server
```bash
npm run dev
```

it runs on http://localhost:5001

## What's in here

- server.js - main file that starts everything
- routes/ - auth, posts, and users routes
- models/ - User and Post schemas
- middleware/ - checks if user is logged in

## API Routes

**Auth**
- POST /api/auth/register - make an account
- POST /api/auth/login - login
- POST /api/auth/logout - logout
- GET /api/auth/me - check if logged in

**Posts**
- GET /api/posts - get all posts
- POST /api/posts - make a post
- DELETE /api/posts/:id - delete a post
- POST /api/posts/:id/rate - rate a post
- POST /api/posts/:id/comments - comment on a post

**Users**
- GET /api/users/:username - get someones profile
- PATCH /api/users/profile - edit your profile

## Important

when calling the api from the frontend always add credentials: 'include' or the login wont work

the server needs to be running for anything to work
