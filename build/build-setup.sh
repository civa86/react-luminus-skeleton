#!/bin/bash

#TODO writa a uniqe var file!!
# VARS
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_NAME=`basename "$PWD"`
RUN_TPL=`cat $PROJECT_DIR/service.shtpl`

APP_DIR=$PROJECT_DIR/app
APP_PKG=$APP_DIR/dist

REST_DIR=$PROJECT_DIR/rest

DIST_DIR=$PROJECT_DIR/dist
RESOURCES_DIR=$REST_DIR/env/prod/resources

## CLEAN
rm -rf $RESOURCES_DIR/templates
rm -rf $RESOURCES_DIR/public

# APPLICATION Resources
mkdir $RESOURCES_DIR/public

## public
cp -r $APP_PKG/assets $RESOURCES_DIR/public/
cp -r $APP_PKG/css $RESOURCES_DIR/public/
cp -r $APP_PKG/js $RESOURCES_DIR/public/
cp -r $APP_PKG/*.txt $RESOURCES_DIR/public/

## templates
cp -r $REST_DIR/resources/templates $RESOURCES_DIR/
cat $APP_PKG/index.html > $RESOURCES_DIR/templates/base.html

# SETUP
$PROJECT_DIR/setup.sh

# PREPARE DIST FOLDER
rm -rf $DIST_DIR
mkdir $DIST_DIR

# CREATE EXTERNAL RESOURCES
mkdir $DIST_DIR/resources

$PROJECT_DIR/setup.sh $DIST_DIR/resources

# RUN SCRIPT
RUN_TPL="${RUN_TPL//__PROJECT_NAME__/$PROJECT_NAME}"
echo "$RUN_TPL" > $PROJECT_DIR/dist/service.sh
chmod a+x $PROJECT_DIR/dist/service.sh
