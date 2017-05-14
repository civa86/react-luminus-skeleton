#!/bin/bash

#TODO writa a uniqe var file!! and refactor to work inside build dir....
# VARS
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_NAME=`basename "$PWD"`
RUN_TPL=`cat $PROJECT_DIR/service.shtpl`

APP_DIR=$PROJECT_DIR/app
APP_PKG=$APP_DIR/dist

REST_DIR=$PROJECT_DIR/rest
REST_TARGET=$REST_DIR/target/uberjar/rest.jar

DIST_DIR=$PROJECT_DIR/dist
RESOURCES_DIR=$REST_DIR/env/prod/resources

# FUNCTIONS
function separator () {
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
}

# ----------------------- EXECUTION ---------------------------------------------
separator
echo "BUILD: $PROJECT_NAME in $DIST_DIR"
separator

# APP DISTRIBUTION
cd $APP_DIR
npm run distribution || { echo "Fronted dist failed"; exit 1; }
cd ..

# REST TEST
cd $REST_DIR
lein test || { echo "Backend test failed"; exit 1; }
cd ..

# SETUP BUILD
$PROJECT_DIR/build-setup.sh

# JAR PACKAGE
cd $REST_DIR
lein uberjar || { echo "Backend build failed"; exit 1; }
cd ..

## COPY JAR TO DIST
cp $REST_TARGET $PROJECT_DIR/dist/
mv $PROJECT_DIR/dist/rest.jar $PROJECT_DIR/dist/$PROJECT_NAME.jar
