# pawbase backend

express + mongodb backend for the pawbase pet social media app.

## setup

1. install dependencies
```bash
npm install
```

2. copy `.env.example` to `.env` and fill in your values
```bash
cp .env.example .env
```

you need two things in your .env:
- `MONGO_URI` — get this from mongodb atlas (free tier is fine)
- `SESSION_SECRET` — just type any long random string

3. run the dev server
```bash
npm run dev
```

server starts on http://localhost:5000

---

## folder structure

```
pawbase-backend/
├── models/
│   ├── User.js       # user schema + password hashing
│   └── Post.js       # posts, comments, ratings
├── routes/
│   ├── auth.js       # register, login, logout, /me
│   ├── posts.js      # feed, create, delete, rate, comment
│   └── users.js      # profile page
├── middleware/
│   └── requireAuth.js  # protects routes that need login
├── .env.example
├── package.json
└── server.js
```

---

## api endpoints

### auth
| method | route | description |
|--------|-------|-------------|
| POST | /api/auth/register | create account |
| POST | /api/auth/login | login |
| POST | /api/auth/logout | logout |
| GET  | /api/auth/me | check current session |

### posts
| method | route | description |
|--------|-------|-------------|
| GET    | /api/posts | get all posts (supports ?sort=recent/popular/unpopular and ?search=) |
| POST   | /api/posts | create a post (auth required) |
| DELETE | /api/posts/:id | delete your post (auth required) |
| POST   | /api/posts/:id/rate | rate a post 1-5 (auth required) |
| POST   | /api/posts/:id/comments | comment on a post (auth required) |

### users
| method | route | description |
|--------|-------|-------------|
| GET   | /api/users/:username | get public profile + their posts |
| PATCH | /api/users/profile | update your own profile (auth required) |

---

## connecting to react

in your react app, fetch from `http://localhost:5000/api/...` and make sure you include `credentials: 'include'` on every request so the session cookie gets sent:

```js
const res = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',   // <-- important
  body: JSON.stringify({ email, password })
})
```

---

## notes

- images aren't stored in mongo — just the url. for actual image uploads you'd add multer + cloudinary but that can come later
- passwords are hashed with bcrypt before saving, never stored plain
- sessions expire after 24 hours
