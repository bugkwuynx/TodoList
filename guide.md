# Complete Guide to Building a MERN Stack Application

The MERN stack consists of **MongoDB, Express.js, React** and **Node.js**.
In this guide, I will write an example on building a Todo List

## Project Setup

Requirement:

- VSCode
- Node.js
- Github Account
- MongoDB Atlas Account

Create your project folder:

```
mkdir todoList
cd todoList
```

Initialize a Node.js project

```
npm init -y
```

Create folder structure

```
todoList/
|--backend/
    |--controllers/
    |--routes/
    |--config/
    |--models/
    |--.env
    |--server.js
|--frontend/
```

## Backend

Initalize a Node.js project:

```
npm init -y
```

Install Dependencies

```
npm install express mongoose dotenv cors
npm install nodemon --save-dev
```

Add scripts to your `package.json`

```
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### MongoDB Connection

Go to [mongodb.com](https://www.mongodb.com/) and sign in.
Create a New Project -> Next
