# Nestjs + Docker + Heroku Postgres

-   Nestjs + Docker + Heroku Postgres + JWT Authentication + PUB NUB + Swagger Api Docs

## Dependencies:

-   Node >=16.0.0
-   Docker version 20.10.11
-   Docker-compose version 1.29.0

## Run:

-   install api dependencies:

```
cd ./api
yarn install

```

-   initialize api and php-myadmin containers with docker-compose:

```

docker-compose up

```

-   Open the browser on localhost:3000/docs to see the Api Swagger Docs
-   Run migrations
-   Seed database tables:

```

docker exec -it api bash

yarn migration:run
yarn seed


```

## RUN Unit Tests

```

yarn test

```

> This is a challenge by [Coodesh](https://coodesh.com/)
