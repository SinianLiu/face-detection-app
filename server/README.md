# Getting Started

- Config:
- In server repo, go to 'docker-compose.yml' file
- Change POSTGRES_USER and POSTGRES_PASSWORD or you could leave them as 'admin' and 'password'
- Install Docker on your computer

```
1. cd to 'server' repository
2. run 'docker-compose up --build -d'
3. open another terminal, cd to 'client' repository
4. run 'npm run dev'
5. go to the port: http://localhost:5173/

Start your journey!

Optional: get into interactive mode for Redis and PostgresSQL:
  docker-compose exec redis redis-cl
  docker-compose exec postgres psql -U postgres -d postgres
```

## Optional reading: Connect with the database via knex package

```
const db = knex({
  client: 'pg',
  // connect to db in docker
  connection: process.env.POSTGRES_URI

  // original connection
  // connection: {
  //   host: process.env.POSTGRES_HOST,
  //   user: process.env.POSTGRES_USERS,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DB
  // }
});
```

## Optional reading: Create PostgreSQL database

```
# use brew to install
brew install postgresql
brew services start postgresql

# Create user and initialize password
# Or you could just jump this step and use default user 'postgres' and password ''
createuser postgres -P

# Create Database
# -O means set the db smart-brain to the user 'postgres'
createdb smart-brain (-O postgres -e) <- optional

# To access postgres:
psql -h 127.0.0.1 -p 5432 -U postgres -d smart-brain
# or:
psql -d smart-brain

# and now you could insert sql commands in the edit mode
# use \q to quit
# user \d to check all the relations inside the db
```

