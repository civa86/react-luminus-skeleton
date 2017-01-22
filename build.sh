#!/bin/bash

# Vars
SERVER_PORT=8080
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_NAME=`basename "$PWD"`

# Setup
APP_DIR=$PROJECT_DIR/app
APP_PKG=$APP_DIR/dist

REST_DIR=$PROJECT_DIR/rest
REST_TARGET=$REST_DIR/target/uberjar/rest.jar

DIST_DIR=$PROJECT_DIR/dist
RESOURCES_DIR=$REST_DIR/env/prod/resources
#TODO test for external reosurce --- $PROJECT_DIR/dist/resources

# Functions
function separator () {
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
}

# ----------------------- Execution ---------------------------------------------
separator
echo "BUILD: $PROJECT_NAME in $DIST_DIR"
separator

# Prepare dist folder
rm -rf $DIST_DIR
mkdir $DIST_DIR
mkdir $RESOURCES_DIR

# Frontend Distribution
cd $APP_DIR
npm install || { echo "Fronted dependencies install failed"; exit 1; }
npm run distribution || { echo "Fronted dist failed"; exit 1; }
cd ..

# Application Resources
mkdir $RESOURCES_DIR/public

## public
cp -r $APP_PKG/assets $RESOURCES_DIR/public/
cp -r $APP_PKG/css $RESOURCES_DIR/public/
cp -r $APP_PKG/js $RESOURCES_DIR/public/
cp -r $APP_PKG/*.txt $RESOURCES_DIR/public/

## templates
cp -r $REST_DIR/resources/templates $RESOURCES_DIR/
cat $APP_PKG/index.html > $RESOURCES_DIR/templates/base.html

# Backend Tests and Distribution
cd $REST_DIR
lein test || { echo "Backend test failed"; exit 1; }
lein uberjar
cd ..

## Clean
rm -rf $RESOURCES_DIR/templates
rm -rf $RESOURCES_DIR/public

## Copy Jar to dist
cp $REST_TARGET $PROJECT_DIR/dist/
mv $PROJECT_DIR/dist/rest.jar $PROJECT_DIR/dist/$PROJECT_NAME.jar

# Run script
echo "#!/bin/bash" > $PROJECT_DIR/dist/run.sh
echo "JAR_DIR=\"\$( cd \"\$( dirname \"\${BASH_SOURCE[0]}\" )\" && pwd )\"" >> $PROJECT_DIR/dist/run.sh
echo "cd \$JAR_DIR" >> $PROJECT_DIR/dist/run.sh
echo "export PORT=$SERVER_PORT" >> $PROJECT_DIR/dist/run.sh
echo "java -jar ./$PROJECT_NAME.jar" >> $PROJECT_DIR/dist/run.sh
chmod a+x $PROJECT_DIR/dist/run.sh
