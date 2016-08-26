var path = require('path');
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shortly:27017');
var db = mongoose.connection;
// console.log(db, 'CONNECTION MONGOOSE')

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
  console.log('MongoDB connection established!');
});

/************** Links *****************/

var urlsSchema = new mongoose.Schema({
  url: String, 
  baseUrl: String, 
  code: Number, 
  title: String,
  visits: Number,
  timestamps: {type: Date, default: Date.now}
});

var Urls = mongoose.model('Urls', urlsSchema);

/************** Users ********************/

var usersSchema = new mongoose.Schema({
  username: String, 
  password: String, 
  timestamps: {type: Date, default: Date.now}
});

var Users = mongoose.model('Users', usersSchema);

module.exports.urls = Urls;
// module.exports.urlsSchema = urlsSchema;
module.exports.users = Users;
// module.exports.usersSchema = usersSchema;

module.exports.db = db;

