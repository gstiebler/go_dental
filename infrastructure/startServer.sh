cd ..
git pull
yarn

node ./node_modules/gulp/bin/gulp.js bundle:webapp
node ./node_modules/gulp/bin/gulp.js start:server