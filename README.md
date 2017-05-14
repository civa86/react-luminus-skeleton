# React Luminus Skeleton

Skeleton for a Web Application based on React and Clojure.

Application structure:

- Frontend: React / Redux
- Backend: Clojure Luminus
- Database: MySql

## Usage: setup and development

Clone the repository and setup `new-project`

```bash
$ git clone https://github.com/civa86/react-luminus-skeleton.git new-project
$ cd new-project
$ rm -rf .git
$ git init
```

### Backend

```bash
.
├── rest                    # rest folder
│   ├── env                 ## rest env folder
│   ├── resources           ## rest resources
│   │   ├── db-migrations   #### flyway migrations
│   │   ├── sql             #### sql queries
│   │   └── templates       #### luminus html templates
│   ├── src                 ## rest source code
│   ├── test                ## rest unit tests
│   ├── profiles.clj        ## development and testing configuration file
│   └── project.clj         ## rest project main file
├── app                     # app folder
├── build                   # build folder
├── config.prod.edn         # production conf sample
└── README.md # Project     # readme file
```

Enter in the `rest` folder

```bash
$ cd rest
```

#### Configuration

Create development and testing configuration file

```bash
$ touch profiles.clj
```

*profiles.clj*

```clojure
{
 :profiles/dev  {:env {:database-url "jdbc:mysql://<host>/<db-name>?user=<db-user>&password=<db-passwd>"}}
 :profiles/test {:env {:database-url "jdbc:mysql://<host>/<db-name>?user=<db-user>&password=<db-passwd>"}}
}
```

#### Database

Run Flyway migration

```bash
$ lein flyway migrate
```

Migrations in....

#### Rest Service

Run service locally: `http://localhost:3334/api`

```bash
$ lein run
```

Run service under REPL

```bash
$ lein repl
=> (start)
```

### Frontend

```bash
.
├── rest                        # rest folder
├── app                         # app folder
│   ├── img                     ## images asset folder
│   ├── less                    ## less source files
│   ├── src                     ## app source code
│   ├── test                    ## app unit tests
│   ├── index.html              ## app index file
│   ├── humans.txt              ## humans file
│   ├── robots.txt              ## robots file
│   ├── server.js               ## development server
│   ├── package.json            ## app main file
│   ├── webpack.config.dev.js   ## webpack development configuration
│   └── webpack.config.prod.js  ## webpack production configuration
├── build                       # build folder
├── config.prod.edn             # production conf sample
└── README.md # Project         # readme
```

Enter in the `app` folder

```bash
$ cd app
```

#### Dependencies

```bash
$ npm install
```



<br><br><br><br><br><br><br><br>
OLD....:

Clone the repository and start working on your application

#### profile.clj

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
lein flyway <task>
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
