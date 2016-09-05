Install the following packages globally:
├── bower@1.7.9
├── gulp@3.9.1
├── mocha@2.5.3
└── npm@3.8.6

Make sure you've installed mongoDB on your computer!
Run mongodb locally by typing the following command:
(assuming your've created your database folder ./data/db under your main mongodb folder)

./mongod --dbpath ../data/db

Setup:
npm install

bower install

To run the app:
gulp serve-dev

To test the app:
gulp serve-test

To show test coverage:
gulp test


Other gulp commands you can try:

gulp help

gulp vet (—verbose)

gulp styles

gulp clean-styles

gulp less-watcher(plumber error checker)

gulp inject

gulp test-watcher

