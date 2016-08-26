var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
// var User = require('../app/models/user');
// var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  // Links.reset().fetch().then(function(links) {
  // });
  db.urls.find().exec(function( error, urls) {
    res.status(200).send(urls);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }



  // new Link({ url: uri }).fetch().then(function(found) {
  //   if (found) {
  //     res.status(200).send(found.attributes);
  //   } else {
  //     util.getUrlTitle(uri, function(err, title) {
  //       if (err) {
  //         console.log('Error reading URL heading: ', err);
  //         return res.sendStatus(404);
  //       }
  //       var newLink = new Link({
  //         url: uri,
  //         title: title,
  //         baseUrl: req.headers.origin
  //       });
  //       newLink.save().then(function(newLink) {
  //         Links.add(newLink);
  //         res.status(200).send(newLink);
  //       });
  //     });
  //   }
  // });
};

// console.log("DB . USERS", db.users)
exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;


  db.users.find({username: username}, function(error, user) {
    if (error) {
      console.log(error);
    } else {
      console.log('password!!!!!', user);
      bcrypt.compare(password, user[0].password, function(err, match) {
        console.log('match: ', match);
        console.log('error: ', err);
        if (match) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      });
    }
  });
  // new User({ username: username })
  //   .fetch()
  //   .then(function(user) {
  //     if (!user) {
  //       res.redirect('/login');
  //     } else {
  //       user.comparePassword(password, function(match) {
  //         if (match) {
  //           util.createSession(req, res, user);
  //         } else {
  //           res.redirect('/login');
  //         }
  //       });
  //     }
  //   });
};

/**
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})
**/

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  // console.log(username, password);
 

  db.users.find({
    username: username
  }, function(error, existingUser) {
    console.log('EXISTING USER!!! =====>', existingUser);
    if (error) {
      console.error('FIND USER ERRORED', error);
    } else if (existingUser.length === 0) {
      bcrypt.hash(password, null, null, function (error, hash) {
        db.users({
          username: username, 
          password: hash
        }).save(function(error, newUser) {
          if (error) {
            console.error(error);
          } else if (newUser) {
            util.createSession(req, res, newUser);
          }
        });
      });
    } else if (existingUser.length > 0) {
      console.log('Account already exists');
      res.redirect('/login');
    }
  });
};

// db.users.find(function(err, users) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('ALLLLL OF THE USERS', users);
//   }
// });




   
    // new User({ username: username })
    // .fetch()
    // .then(function(user) {
    //   if (!user) {
    //     var newUser = new User({
    //       username: username,
    //       password: password
    //     });
    //     newUser.save()
    //       .then(function(newUser) {
    //         Users.add(newUser);
    //         util.createSession(req, res, newUser);
    //       });
    //   } else {
    //     console.log('Account already exists');
    //     res.redirect('/signup');
    //   }
    // });

exports.navToLink = function(req, res) {
  // new Link({ code: req.params[0] }).fetch().then(function(link) {
  //   if (!link) {
  //     res.redirect('/');
  //   } else {
  //     link.set({ visits: link.get('visits') + 1 })
  //       .save()
  //       .then(function() {
  //         return res.redirect(link.get('url'));
  //       });
  //   }
  // });
};