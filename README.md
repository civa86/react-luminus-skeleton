# React Luminus Skeleton

Skeleton for a Web Application based on React and Clojure/Luminus.

## Development

### Frontend

```bash
cd app
npm run development
```

Application Url: `http://localhost:3333`.

Api Proxy: `http://localhost:3333/api` -> `http://localhost:3334/api`.

### Backend

```bash
cd rest
lein run
```

#### REPL development

Run `lein repl`.

Launch server inside REPL with `(start)` function.

Api Service Url: `http://localhost:3334/api`.




## Build

Produce a stand alone folder `dist` with a running application.

Pass the port which the application will run at.

```bash
./build.sh -p <PORT>

> dist
...dist folder...
```

## Run

Start application on port chosen in the #Build step.

```bash
./dist/run.sh
```


