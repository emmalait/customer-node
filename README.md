# Online store: Customer node

The customer node provides access to customer data.

## API

Path | Method | Function
--- | --- | ---
/users/register | POST | Creates a new user
/users/login | POST | Logs in a user
/users/{user id} | GET | Returns user X

## Development

Install dependencies:

```
npm install
```

The project uses [Sequelize](https://sequelize.org/v5/) as the ORM to access its PostgreSQL database.

To get started, define server port, database connection string & secret key for JWT tokens in .env, e.g.

```
PORT=8080
DATABASE_URL=postgres://<username>:<password>@localhost:5432/users
SECRET=VerySecretString
```

Create database:

```
npx sequelize-cli db:create
```

Run migrations:

```
npx sequelize-cli db:migrate
```

Run seeds:

```
npx sequelize-cli db:seed:all
```