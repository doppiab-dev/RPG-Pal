# Backend

Node backend, copy .env.example vars in .env file (you should create it) and ask [me](https://github.com/DrBlink7) on how to fill vars.
It will run (by default) on 3001 port, you can see API Swagger [there](http://localhost:3001/swagger/)

## DB Migration
We use node-pg-migrate, complete guide [here](https://salsita.github.io/node-pg-migrate/#/)

### INITIALIZATION
To do the first migration we did these steps, from backend bash run
```bash
yarn migrate create init db
```
a file *timestamp_init-db.js* will be created, open it and initialize with the database script, ex:
```js
exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('post', {
    id: { type: 'text', notNull: true },
    text: { type: 'text', notNull: true }
  });

  pgm.addConstraint('post', 'unique_id', {
    unique: ['id'],
  });
};
```
after saved the file we run the init-db migration with this script
```bash
DATABASE_URL=postgres://DB_USER:DB_PASS@DB_HOST:DB_PORT/DB_NAME yarn migrate up
```
N.B. Note that if you're running from locale your DB_HOST will be localhost.

### FUTURE MIGRATION
If you need to do another migration, like adding a column *userGroup* on table *post*
```bash
yarn migrate create user-group-on-post
```
then, as before, edit *timestamp_user-group-on-post.js* adding the column on the table:
```js
exports.up = (pgm) => {
  pgm.addColumns('post', {
    userGroup: { type: 'text', notNull: true },
  })
}
```
and then run 
```bash
DATABASE_URL=postgres://DB_USER:DB_PASS@DB_HOST:DB_PORT/DB_NAME yarn migrate up
```
after that there will be new column in post table.
