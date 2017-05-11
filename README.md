# React Luminus Skeleton

Skeleton for a Web Application based on React and Clojure/Luminus

Clone the repository and start working on your application

## Frontend

```bash
cd app
npm run development
```

Application Url: `http://localhost:3333`

Api Proxy: `http://localhost:3333/api` -> `http://localhost:3334/api`

## Backend

```bash
cd rest
lein run
```

#### Flyway: Database Migrations

```bash
DATABASE_URL="jdbc:mysql://<db-host>/<db-name>?user=<db-user>&password=<db-passwd>" lein flyway <task>
```

#### REPL development

Run `lein repl`

Launch server inside REPL with `(start)` function

Api Service Url: `http://localhost:3334/api`

## Build

Build a stand alone folder `dist` with a full running application

```bash
./build.sh (-p|--port <PORT>) (-n|--name <NAME>)
```

#### Optional Arguments

-p|--port: default server port

-n|--name: application name

#### dist

## Run

Start application on default server port

```bash
./dist/run.sh (-p|--port <PORT>)
```

#### Optional Arguments

-p|--port: override the default server port
