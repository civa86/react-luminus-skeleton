#!/bin/bash

# Vars
SERVER_PORT=8080
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_NAME=`basename "$PWD"`

REST_APP_NAME=rest
REST_TARGET=$PROJECT_DIR/$REST_APP_NAME/target/uberjar/$REST_APP_NAME.jar

# Functions
function separator () {
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
}

# ----------------------- Execution ---------------------------------------------
separator
echo "BUILD: $PROJECT_NAME in $PROJECT_DIR/dist"
separator

# Prepare dist folder
rm -rf ./dist
mkdir dist

# Frontend Distribution
cd app
npm run distribution || { echo "Fronted dist Failed"; exit 1; }
cd ..


# Backend Resources
mkdir $PROJECT_DIR/rest/env/prod/resources/public
cp -r $PROJECT_DIR/app/dist/assets $PROJECT_DIR/rest/env/prod/resources/public/
cp -r $PROJECT_DIR/app/dist/css $PROJECT_DIR/rest/env/prod/resources/public/
cp -r $PROJECT_DIR/app/dist/js $PROJECT_DIR/rest/env/prod/resources/public/
cp -r $PROJECT_DIR/app/dist/*.txt $PROJECT_DIR/rest/env/prod/resources/public/
cp -r $PROJECT_DIR/rest/resources/templates $PROJECT_DIR/rest/env/prod/resources/
cat $PROJECT_DIR/app/dist/index.html > $PROJECT_DIR/rest/env/prod/resources/templates/base.html

# Backend Tests and Distribution
cd $REST_APP_NAME
lein test || { echo "Backend Test Failed"; exit 1; }
lein uberjar
cd ..

## Clean
rm -rf $PROJECT_DIR/rest/env/prod/resources/templates
rm -rf $PROJECT_DIR/rest/env/prod/resources/public


## Copy Jar to dist
cp $REST_TARGET $PROJECT_DIR/dist/
mv $PROJECT_DIR/dist/$REST_APP_NAME.jar $PROJECT_DIR/dist/$PROJECT_NAME.jar

# Run script
echo "#!/bin/bash" > $PROJECT_DIR/dist/run.sh
echo "JAR_DIR=\"\$( cd \"\$( dirname \"\${BASH_SOURCE[0]}\" )\" && pwd )\"" >> $PROJECT_DIR/dist/run.sh
echo "cd \$JAR_DIR" >> $PROJECT_DIR/dist/run.sh
echo "export PORT=$SERVER_PORT" >> $PROJECT_DIR/dist/run.sh
echo "java -jar ./$PROJECT_NAME.jar" >> $PROJECT_DIR/dist/run.sh
chmod a+x $PROJECT_DIR/dist/run.sh
