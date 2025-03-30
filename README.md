# 🚀 Basic MERN Stack Starter Guide

This is a personal starter guide for creating a basic MERN (MongoDB, Express, React, Node.js) stack application. I will use this as a reference for building similar projects in the future.


## 📁 Project Structure

Start by creating the following folder structure:
- `backend`: for the Express.js + Node.js server (API).
- `frontend`: for the React application.

```txt
/project-root
├── backend
└── frontend
```

## 🛠️ Initialize the Project

In the root directory, initialize a new Node.js project:

```bash
npm init -y
```

## 📦 Install Backend Dependencies

Install the core backend libraries in the `backend` folder:

```bash
npm install express mongoose dotenv
```

## 🔄 Enable Auto-Restart on Changes

To automatically restart the server on changes, install nodemon as a development dependency:

```bash
npm i nodemon -D
```

## 📝 Add Script to package.json

In the root package.json file, add the following script:

```json
"scripts": {
  "dev": "nodemon backend/server.js"
}
```

## ▶️ Start the Development Server

Run the development server using:

```bash
npm run dev
```

## 💻 Set Up the Frontend

Navigate to the `frontend` folder and create a new React project using Vite:

```
cd frontend 
```

```bash
npm create vite@latest ./
```

When prompted:

- Type `y` and press Enter to proceed
- Select **React**
- Select **JavaScript**

Then install the project dependencies:

```bash
npm install
```

## 💅 Add Chakra UI and Path Aliases

For detailed instructions, see the official docs:  
https://chakra-ui.com/docs/get-started/frameworks/vite


Start the frontend development server:

```bash
npm run dev
```
## 🧩 Additional Frontend Packages

Install React Router:

```bash
npm install react-router-dom
```

Install Zustand:

```bash
npm install zustand
```

Add proxy config in `vite.config.js`:

```js
server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
```

## 🚀 Deployment Setup

In your `server.js` file, add the following to handle production build:

```js
import path from "path";

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
```

In the root folder, install cross-env:

```bash
npm install cross-env --save-dev
```

Update the scripts section in your root `package.json`:

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development nodemon backend/server.js",
  "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
  "start": "cross-env NODE_ENV=production node backend/server.js"
}
```

✅ Build and Run in Production Mode

```bash
npm run build
npm run start
```

## 🗂️ Environment Variables

Create a .env file in the backend folder (or root, depending on setup) and define the following variable:

```ini
MONGO_URI=your_mongo_connection_string
PORT=5000
```

Make sure to load it using dotenv.config() in `server.js`.

---

## 📝 Notes & Common Issues

### Mongo URI malformed error

If your MongoDB connection string contains special characters like `%` or `&`, they must be URL-encoded...

For example:

```
%  →  %25  
&  →  %26
```

So instead of writing:

```
MONGO_URI=mongodb+srv://user:pa%ss&word@cluster.mongodb.net/db
```

You should write:

```
MONGO_URI=mongodb+srv://user:pa%25ss%26word@cluster.mongodb.net/db
```

This prevents parsing errors during database connection.



