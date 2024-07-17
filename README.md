# 🌐 Social Network Backend System

This project aims to develop the backend system for a social network application. The system allows users to register, log in, and access various features such as sending messages, following other users, and managing their profiles. Users can also make their profiles private, write comments on posts, and like posts. Additionally, the system provides the option to deactivate or delete user accounts.

## 🛠️ Features

The social network offers the following features:

- **User Registration and Login**: Users can register and log in to access the application.
- **Messaging**: Users can send and receive messages.
- **Profile Management**: Users can update their profiles, set privacy settings, and view other users' profiles.
- **Following Users**: Users can follow other users to see their posts in their timeline.
- **Comments and Likes**: Users can comment on and like posts.
- **Account Deactivation and Deletion**: Users can deactivate their accounts or request deletion by a super admin.

## ⚙️ Stack

<img alt="vsc" src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"> <img alt="mongodb" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> <img alt="typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img alt="jwt" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"> <img alt="express" src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"> <img alt="nodejs" src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img alt="npm" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img alt="docker" src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">

## Local Installation

1. Clone the repository from the URL
2. `$ npm install`
3. Connect the cloned repo with your MongoDB database
4. Execute the migrations
5. Execute the seeders
6. `$ npm run dev` to start the server

## Deploy 🚀

----

## 🗄️ Database Schema

----

## 🌐 Endpoints

### 🔑 Authentication
| Method | URI                    | Action           | Auth        | Body |
|--------|------------------------|------------------|-------------|------|
| POST   | /api/auth/register     | Register user    | N/A (public)|      |
| POST   | /api/auth/login        | Login user       | N/A (public)|      |

### 👥 Users
| Method | URI                   | Action              | Auth                | Body |
|--------|-----------------------|---------------------|---------------------|------|
| GET    | /api/users            | View all users      | Token (superadmin)  |      |
| GET    | /api/users/profile    | View user profile   | Token (user)        |      |
| PUT    | /api/users/profile    | Update user profile | Token (user)        |      |

### 📝 Posts
| Method | URI                        | Action                | Auth        | Body |
|--------|----------------------------|-----------------------|-------------|------|
| POST   | /api/posts                 | Create post           | Token (user)|      |
| DELETE | /api/posts/:id             | Delete post           | Token (user)|      |
| PUT    | /api/posts                 | Update post           | Token (user)|      |
| GET    | /api/posts/own             | Get own posts         | Token (user)|      |
| GET    | /api/posts                 | Get all posts         | N/A (public)|      |
| GET    | /api/posts/:id             | Get post by id        | N/A (public)|      |
| GET    | /api/users/posts/:user_id  | Get posts by a user   | N/A (public)|      |

### 📝 Like
| Method | URI                        | Action                | Auth          | Body |
|--------|----------------------------|-----------------------|---------------|------|
| PUT    | /api/posts/like/:id        | Like and unlike post  | Token (user)  |      |
