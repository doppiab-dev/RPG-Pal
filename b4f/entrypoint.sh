#! /bin/sh

export DATABASE_URL=postgres://${DB_USER}:${DB_PASS}@/${DB_NAME}?host=${DB_HOST}

yarn run migrate up && yarn start