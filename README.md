# React Luminus Skeleton

Skeleton for a Web Application based on React and Clojure.

## Development

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

`db-migrations` folder, under rest resources, contains all migrations file for Flyway.

File naming convention: `V<incremental_number>__<migration-name>.sql

Migrations sample: `V1__my-first-table.sql`

*Run Flyway migration*

```bash
$ lein flyway migrate
```

*Clean database*

```bash
$ lein flyway clean
```

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

#### Development Server

Run Webpack development server: `http://localhost:3000`

```bash
$ npm run development
```

#### NPM Tasks

```bash
$ npm run <task>
```

| Task             | Description                  |
| ---------------- | ---------------------------- |
| development      | run development server       |
| test             | app unit test single run     |
| test:watch       | app unit test watcher        |
| test:rest        | rest unit test single run    |
| test:rest:watch  | rest unit test watcher       |
| build            | app build                    |
| dist             | app test and build           |
| db:clean         | database clean               |
| db:migrate       | database migration           |
| db:rebuild       | database clean and migration |
| db:info          | database status              |

## Unit Test

## Build

...
