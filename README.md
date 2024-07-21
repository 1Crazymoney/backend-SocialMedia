# 🌐 Social Network Backend System

This project aims to develop the backend system for a social network application. The system allows users to register, log in, and access various features such as sending messages, following other users, and managing their profiles. Users can also make their profiles private, write comments on posts, and like posts. Additionally, the system provides the option to deactivate or delete user accounts.

# EMME 🦇
<img alt="banner-emme" src="./img/banner-EMME.png>

EMME is a revolutionary social network emerging from the shadows, inspired by the enigmatic and powerful figure of the bat. Much like the iconic Batman, EMME represents the duality between introspection and expression, providing a space where ideas can fly freely and connect people in innovative ways. Our violet color evokes the mystery and creativity of twilight, symbolizing an environment where each user can find their unique voice and share their vision with the world. With EMME, darkness becomes a canvas full of infinite possibilities, where wisdom and imagination come together to illuminate the path towards a more connected future.

## 🛠️ Features

The social network offers the following features:

- **User Registration and Login**: Users can register and log in to access the application.
- **Messaging**: Users can send and receive messages.
- **Profile Management**: Users can update their profiles, set privacy settings, and view other users' profiles.
- **Following Users**: Users can follow other users to see their posts in their timeline.
- **Comments and Likes**: Users can comment on and like posts.
- **Account Deactivation and Deletion**: Users can deactivate their accounts or request deletion by a super admin.

## ⚙️ Stack

<img alt="vsc" src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"> <img alt="mongodb" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> <img alt="javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"> <img alt="jwt" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"> <img alt="express" src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"> <img alt="nodejs" src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img alt="npm" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img alt="docker" src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">

## Local Installation

1. Clone this repository:
`$git clone https://github.com/More-Pe/backend-SocialMedia`
2. Install node modules:
`$ npm install -y`
3. If you don't have one, create a MongoDB container in Docker:
`docker run -d -p 27017:27017 --name mongo -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest`
4. Connect this repository with our database. Create an `.env` file in the root of the project with the following content, ensuring that these credentials match those set in the MongoDB container:
-`PORT: 4000`
-`MONGO_URI=mongodb://localhost:27017/your_database_name`
-`SALT_ROUNDS=10`
-`JWT_SECRET=example`
5. Elevate our server:
`$ npm run dev`
6. If you want, execute the seeders:
`$ npm run db:seed` or introduce the information manually.

## Deploy 🚀

----

## 🗄️ Database Schema

<img alt="database-schema" src="./img/DB_Schema.png">

## 🌐 Endpoints

### 🔑 Authentication
| Method | URI                    | Action           | Auth        | Body |
|:--------:|:------------------------:|:------------------:|:-------------:|:------:|
| POST   | /api/auth/register     | Register user    | N/A (public)|{ "email": "youremail@email.com",
"password": "yourPassword" }    |
| POST   | /api/auth/login        | Login user       | N/A (public)|{ "email": "youremail@email.com",
"password": "yourPassword" }      |

### 👥 Users
| Method | URI                   | Action              | Auth                | Body |
|:--------:|:-----------------------:|:---------------------:|:---------------------:|:------:|
| GET    | /api/users            | View all users      | Token (superadmin)  |   N/A   |
| GET    | /api/users/profile    | View user profile   | Token (user)        |   N/A   |
| PUT    | /api/users/profile    | Update user profile | Token (user)        |   {"first_name": "newFirstName",
"last_name_ "newLastName", "nickname": "newNickName", "email": "newEmail", "password": "newPassword"}   |

### 📝 Posts
| Method | URI                        | Action                | Auth        | Body |
|:--------:|:----------------------------:|:-----------------------:|:-------------:|:------:|
| POST   | /api/posts                 | Create post           | Token (user)|{ "description": "description, "image": "URL_image"}      |
| DELETE | /api/posts/:id             | Delete post           | Token (user)|   N/A   |
| PUT    | /api/posts                 | Update post           | Token (user)|{ "postId": "postIdToUpdate", "description": "newDescription, "image": "newURL_image"}      |
| GET    | /api/posts/own             | Get own posts         | Token (user)|   N/A   |
| GET    | /api/posts                 | Get all posts         | Token (user)|   N/A   |
| GET    | /api/posts/:id             | Get post by id        | Token (user)|  N/A     |
| GET    | /api/posts/users/:user_id  | Get posts by a user   | Token (user)|  N/A     |
| PUT    | /api/posts/like/:id        | Like and unlike post  | Token (user)  |   N/A   |
