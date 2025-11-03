# 📝 ToDoX — Fullstack MERN To-Do Application

**ToDoX** is a full-stack To-Do management web application built with **React + Vite (frontend)** and **Node.js + Express + MongoDB (backend)**.  
It features **JWT authentication with secure HTTP-only refresh tokens**, allowing users to register, log in, and manage their personal tasks safely and efficiently.

---

## 🚀 Features

- 🔐 **User Authentication** — JWT with refresh tokens stored securely in HTTP-only cookies  
- 🧠 **Global State Management** — Zustand for lightweight state handling  
- 📋 **Full CRUD Operations** — Create, Read, Update, Delete tasks  
- 🎨 **Modern UI** — TailwindCSS + Radix UI + React Hook Form + Zod validation  
- 🧭 **Protected Routes** with React Router v7  
- ☁️ Ready for deployment on **Vercel, Render, or Railway**

---

## 🧱 Project Structure
```
ToDoX/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js # MongoDB connection
│ │ ├── controller/
│ │ │ ├── authController.js # Register / Login / Refresh token logic
│ │ │ └── tasksController.js # CRUD for tasks
│ │ ├── middlewares/
│ │ │ └── authMiddleware.js # JWT authentication middleware
│ │ ├── routes/
│ │ │ ├── authRoute.js # Auth routes
│ │ │ └── tasksRouter.js # Task routes
│ │ └── server.js # Express server entry point
│ ├── .env # Environment variables
│ └── package.json
│
└── frontend/
├── src/
│ ├── assets/ # Images, icons
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components
│ ├── services/ # API services (Axios)
│ ├── stores/ # Zustand store
│ ├── App.jsx # App root
│ ├── main.jsx # Entry point
│ └── index.css # Global styles
├── public/
├── vite.config.js
└── package.json
```
---

## ⚙️ Tech Stack

### Frontend
- ⚛️ **React 19**
- ⚡ **Vite**
- 🎨 **TailwindCSS**, **Radix UI**
- 🧩 **React Hook Form** + **Zod**
- 🪶 **Zustand**
- 🚏 **React Router v7**
- 🌐 **Axios**

### Backend
- 🧠 **Node.js + Express**
- 🗄️ **MongoDB + Mongoose**
- 🔐 **jsonwebtoken (JWT)**
- 🧂 **bcrypt**
- ⚙️ **dotenv**
- 🍪 **cookie-parser**
- 🌍 **CORS**

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repositorsdfy
```bash
git clone https://github.com/hungtan1406/ToDoX.git
cd ToDoX
```

### 2️⃣ Install dependencies
```
cd backend && npm install
cd ../frontend && npm install
```

### 3️⃣ Create a .env file in backend
```
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_access_secret
CLIENT_URL=http://localhost:5173
```

### 4️⃣ Run the app
```
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev

```

📍 The app will run at:

Frontend → http://localhost:5173

Backend → http://localhost:5001

---

### 🧩 API Endpoints
| Method     | Endpoint             | Description                        |
| ---------- | -------------------- | ---------------------------------- |
| **POST**   | `/api/auth/register` | Register new user                  |
| **POST**   | `/api/auth/login`    | Login and set refresh token cookie |
| **POST**   | `/api/auth/logout`   | Logout and clear cookies           |
| **POST**   | `/api/auth/refresh`  | Refresh access token               |
| **GET**    | `/api/tasks`         | Get all tasks (requires auth)      |
| **POST**   | `/api/tasks`         | Create a new task                  |
| **PUT**    | `/api/tasks/:id`     | Update task                        |
| **DELETE** | `/api/tasks/:id`     | Delete task                        |

===

### 🔐 Authentication Flow
When a user logs in, the server returns:

- an access token (short-lived)

- a refresh token (stored in an HTTP-only cookie)

- The frontend attaches the access token to every API request (Authorization: Bearer <token>).

- If the access token expires, the app automatically calls /api/auth/refresh to get a new one.

- Logging out clears the refresh token cookie on the server.

---

### 🧠 Key Technical Highlights
- Implemented secure authentication with JWT + HTTP-only refresh tokens

- Built modular backend using Express Router, Middleware, and Controllers

- Designed modern, responsive UI using TailwindCSS + Radix UI

- Managed form validation with React Hook Form + Zod

- Implemented state management via Zustand

- Integrated RESTful APIs between frontend and backend using Axios

---

### 💬 Contact
- 📧 Email: hungtanth1406@gmail.com
- 🌐 GitHub: github.com/hungtan1406
