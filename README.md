# API with Node.js and Serverless with AWS

An API built in Node.js using the Serverless framework for deployment on AWS. This API integrates with [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and offers custom endpoints, JWT authentication, and role-based authorization.

## Index

- [Description](#description)
- [Install](#install)
- [Use](#use)
- [API Endpoints](#api-endpoints)
- [Tests](#tests)
- [Swagger](#swagger)
- [Para El Revisor](#para-el-revisor) <-----

## Description

This project was designed as a solution to a technical challenge that involves:

- Integration with the JSONPlaceholder API.
- Authentication using JWT (JSON Web Tokens).
- Role-based authorization with middleware.
- Use of the `Serverless Framework` for deployment in AWS.

## Install

1. **Previous requirements**: Make sure you have Node.js and npm installed.
2. Clone this repository:
   ```
   git clone https://github.com/edsonarios/node-serverless.git
   ```
3. Navigate to the project folder and install the dependencies:
   ```
   cd node-serverless
   npm install
   ```

## Use

1. To start the API in development mode:

- Download the dynamodb zip file [Link zip file to DynamoDB](#https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and put in place `.dynamodb`
  ```
  npm run dev
  http://localhost:3000
  ```

2. To start the API in production mode:

- Download the AWS CLI for manage the credentials [Link AWS cli](#https://aws.amazon.com/es/cli/)
- Create user IAM with Access keys `ACCESS_KEY` and `SECRET_KEY`

  ```bash
  aws configure # set the access and secret key
  npm deploy:prod
  ```

## API Endpoints

All endpoints, except the login endpoint, require authentication via JWT. Depending on the user's role, they will have access to different endpoints.

### **Authentication**

- **Login** `[POST] /login`: Authenticates a user and returns a JWT token.

### **Users**

- **List Users** `[GET] /users`: Gets a list of all users. Requires `admin` role.
- **Get User** `[GET] /users/{userId}`: Gets a specific user by their ID. Requires `admin` role.
- **Create User** `[POST] /users`: Create a new user. Requires `admin` role.

### **Roles**

- **List Roles** `[GET] /roles`: Gets a list of all roles. Requires `admin` role.
- **Get Role** `[GET] /roles/{roleId}`: Gets a specific role by its ID. Requires `admin` role.
- **Create Role** `[POST] /roles`: Create a new role. Requires `admin` role.

### **Posts**

- **List Posts** `[GET] /posts`: Gets a list of all posts. Requires `admin` role.
- **Get Post** `[GET] /posts/{postId}`: Gets a specific post by its ID. Requires `admin` role.

### **Comments**

- **List Comments** `[GET] /comments`: Gets a list of all comments. Requires `admin` role.
- **Get Comment** `[GET] /comments/{commentId}`: Gets a specific comment by its ID. Requires `admin` role.

### **Personal Information (me)**

- **Get My Data** `[GET] /me`: Obtains the information of the authenticated user. Requires `personal` role.
- **My Posts** `[GET] /me/posts`: Gets the authenticated user's posts. Requires `personal` role.
- **One of My Posts** `[GET] /me/posts/{postId}`: Gets a specific post from the authenticated user. Requires `personal` role.
- **Comments on one of My Posts** `[GET] /me/posts/{postId}/comments`: Gets the comments on a specific post from the authenticated user. Requires `personal` role.

## Tests

To run the tests:

```
npm test
```

The tests cover the endpoints of: login, users, roles, posts, comments and me.

## Swagger

To access the Swagger documentation, start the server and visit the roote:

```
http://localhost:3000/
```

## Para el Revisor

Aquí se detallan todos los puntos solicitados en el reto técnico y su estado de realización:

[Link Produccion](#https://9anke0cyv4.execute-api.us-west-2.amazonaws.com) https://9anke0cyv4.execute-api.us-west-2.amazonaws.com

- [x] **Endpoints mínimos para el rol Personal**
- [x] **Integración con una base de datos**: Se utilizó **DynamoDB**
- [x] **Integración con JSONPlaceholder**
- [x] **Uso del Serverless Framework**
- [x] **Uso de Node.js con Javascript**
- [x] **Uso de ORM**: Se empleó **dynamoose** como ORM para DynamoDB.
- [x] **Respeto de las buenas prácticas de desarrollo**
- [x] **Uso de patrones de diseño**: Se implementaron los patrones **MVC** y **Factory**
- [x] **JWT para Autenticación**
- [x] **Autorización basada en roles usando middleware**
- [x] **Pruebas unitarias** 16 Tests para todos los EndPoints `npm test`
- [x] **Documentación con Open API/Swagger**
- [x] **Despliegue sin errores en AWS** `npm run deploy:prod`
- [x] **Creación de tablas**: Se crearon las tablas **Users**, **Roles**, y **Counters** para autoincremento de IDs.

Espero que esta documentación facilite la revisión y evaluación del proyecto. Quedo a disposición para cualquier consulta o aclaración.
