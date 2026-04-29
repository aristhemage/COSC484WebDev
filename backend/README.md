# Petstagram Backend

Node/Express/MongoDB backend. The React frontend hits these endpoints.

## Setup

```bash
npm install
```

make a `.env` file in this folder with:

```
MONGO_URI=<the shared atlas connection string>
SESSION_SECRET=whatever_long_string
PORT=5001
```

then:

```bash
npm run dev
```

if it works you'll see `mongodb connected`. if not the .env is probably wrong.

## stuff to know for the react side

a couple things or stuff won't work:

1. every fetch needs `credentials: 'include'`, otherwise sessions break and you'll get logged out on every refresh
2. base url is `http://localhost:5001/api`. cors is set to `http://localhost:3000` so make sure vite is on 3000

example:

```js
const res = await fetch('http://localhost:5001/api/posts', {
  credentials: 'include'
})
const posts = await res.json()
```

POST with a body:

```js
const res = await fetch('http://localhost:5001/api/posts', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ imageUrl, petName, caption })
})
```

## endpoints

### auth

- `POST /api/auth/register` - body: `{ username, email, password }`. logs you in automatically
- `POST /api/auth/login` - body: `{ identifier, password }`. identifier can be username OR email
- `POST /api/auth/logout` - no body
- `GET /api/auth/me` - returns the logged in user, or 401 if not logged in. use this on app load

### posts

- `GET /api/posts` - all posts. supports `?sort=recent|popular|unpopular|top-rated` and `?search=petname`
- `GET /api/posts/:id` - single post (for the popup)
- `POST /api/posts` - body: `{ imageUrl, petName, caption }`. login required
- `DELETE /api/posts/:id` - login required, only the author can delete
- `POST /api/posts/:id/rate` - body: `{ value }` (1-5). returns `{ avgRating, ratingCount }`. one rating per user, sending again just updates it
- `POST /api/posts/:id/comments` - body: `{ text }`. returns the new comment

each post in the response looks roughly like:

```js
{
  _id: "...",
  imageUrl: "...",
  petName: "Arugula",
  caption: "first day at the park",
  author: { _id, username, profilePic },
  comments: [...],
  ratings: [...],
  avgRating: 4.5,
  ratingCount: 12,
  createdAt: "..."
}
```

### users / profiles

- `GET /api/users?search=name` - search profiles by username (partial match, up to 20 results)
- `GET /api/users/:username` - returns `{ user, posts }` for the profile page
- `PATCH /api/users/profile` - body: `{ bio, profilePic }`. login required, updates your own profile

### image upload

- `POST /api/upload` - takes FormData with field name `image`. returns `{ imageUrl }`. login required, 5mb max, jpg/png/webp/gif

heads up: this one takes FormData, NOT json. don't set Content-Type manually, the browser does it. like:

```js
const formData = new FormData()
formData.append('image', file)

const res = await fetch('http://localhost:5001/api/upload', {
  method: 'POST',
  credentials: 'include',
  body: formData  // no Content-Type header here!
})
const { imageUrl } = await res.json()

// then create the post with that url
await fetch('http://localhost:5001/api/posts', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ imageUrl, petName, caption })
})
```

so it's two steps: upload first, get the url, then create the post.

## errors

everything returns json like `{ error: "message" }` when something goes wrong.

- 400 = bad request (missing fields etc)
- 401 = not logged in
- 403 = logged in but not allowed (deleting someone else's post)
- 404 = not found
- 500 = something broke on the server

## if stuff isn't working

- "db connection error" -> .env is wrong or your IP isn't whitelisted in atlas
- always logged out / sessions don't work -> you forgot `credentials: 'include'` somewhere
- cors error -> react app isn't on port 3000
- uploaded image won't load -> make sure you're using the url that came back from the upload endpoint, should be `http://localhost:5001/uploads/<filename>`