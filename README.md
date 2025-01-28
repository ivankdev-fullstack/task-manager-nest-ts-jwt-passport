## About

NestJS API to manage tasks under authenticated user using JWT Auth and hashed user password.

### Technical Stack

- **NestJS:** A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications with TypeScript support.

- **TypeScript:** A strongly-typed programming language that builds on JavaScript, adding static typing and enhanced development tools.

- **JWT (JSON Web Token):** A compact and secure token format used for authenticating and authorizing users in web applications.

- **Docker (+Docker Compose):** A platform for containerizing applications, enabling consistent environments, with Docker Compose simplifying multi-container setups.

- **Jest:** A JavaScript testing framework focused on simplicity, with powerful features for unit, integration, and snapshot testing.

## Run app

Install packages:

```bash
npm install
```

Create and fill up `.env` file with the variables provided in `.env.example`:

```bash
# APP
PORT=3000

# DATABASE
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
DB_SYNC=

# AUTH
JWT_SECRET=
JWT_EXPIRES_IN=60m
```

Manage docker compose:

```bash
docker compose up -D
```

Now, run the application:

```bash
npm run start:dev
```
