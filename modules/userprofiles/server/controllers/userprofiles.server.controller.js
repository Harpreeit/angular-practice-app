'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  config = require(path.resolve('./config/config')),
  User = mongoose.model('User'),
  Userprofile = mongoose.model('Userprofile'), 
  validator = require('validator');

/**
 * Create a userprofile
 */
exports.create = function (req, res) {
  var userprofile = new Userprofile(req.body);
    userprofile.user = req.user;

  userprofile.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    console.log('This is creator');
    } else {
        
      res.json(userprofile);
    }
  });
};
/*
exports.profile = function (req, res) {
   var id = req.user.id.toString();
   console.log('this is from user profile: ',id);
  Userprofile.find({'user': id}).sort('-created').populate('user', 'displayName').exec(function (err, userprofiles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userprofiles);
    }
  });
};
 */

/**
 * Show the current userprofile
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  console.log('in read() method');
   var userprofile = req.userprofile ? req.userprofile.toJSON() : {};
  console.log('responsing json',userprofile.address1);

 // Add a custom field to the Userprofile, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Userprofile model.
  userprofile.isCurrentUserOwner = !!(req.user && userprofile.user && userprofile.user._id.toString() === req.user._id.toString());
  
  
  //userprofile.isCurrentUserOwner = !!(userprofile.user.toString() === req.user.id.toString());
  console.log('responsing json',userprofile.state);
  res.json(userprofile);

/*   
  //var mongoose = require('mongoose');
  //var id = mongoose.Types.ObjectId(req.param('userprofileId'));
  //var yoyo = req.param('userprofileId');
  //console.log('the current object id selected is:',id);
 
var moto = req.user.id.toString();
  console.log('nick fluris object id is: ',moto);
  console.log('i am in read method and about to exec. query:   ');
  
  Userprofile.find({'user': moto}).sort('-created').populate('user').exec(function (err, userprofiles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
         console.log('executed the query and json value is : ',userprofiles.zip);
      res.json(userprofiles);
     
    }
  });
  */
  
/*  


  Userprofile.find({'user': moto}).exec(function (err, userprofile) {
    if (err) {
      return next(err);
    } else if (!userprofile) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    //req.userprofile = userprofile;
    //next();
    
    res.json(userprofile);
    console.log('nick fluris zip is: ',userprofile.zip);
  });
  
  
  */
  
};

/**
 * Show the current userprofile
 
exports.view = function (req, res, next) {  
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
        console.log(user);
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
};
*/
/**
 * Update a userprofile
 */
exports.update = function (req, res) {
  var userprofile = req.userprofile;
	userprofile.firstName = req.user.firstName;
    userprofile.lastName = req.user.lastName;
    userprofile.category = req.body.category;
    userprofile.email1 = req.user.email;
    userprofile.email2 = req.body.email2;
	userprofile.mobilePhone = req.body.mobilePhone;
    userprofile.workPhone = req.body.workPhone;
    userprofile.address1 = req.body.address1;
    userprofile.address2 = req.body.address2;
    userprofile.city = req.body.city;
    userprofile.state = req.body.state;
    userprofile.country = req.body.country;
    userprofile.zip = req.body.zip;
	userprofile.followers = req.body.followers; 
	userprofile.views = req.body.views; 
	userprofile.ratings = req.body.ratings;
	userprofile.score = req.body.score;   
	userprofile.payRate = req.body.payRate;
	userprofile.status = req.body.status; 
	userprofile.tasks = req.body.tasks;
	userprofile.tasksComp = req.body.tasksComp;
	userprofile.tasksIncomp = req.body.tasksIncomp;						
	userprofile.message = req.body.messsage;					
	userprofile.comments = req.body.comments;					
	userprofile.notification = req.body.notification; 		
	userprofile.userSkills = req.body.userSkills; 
	userprofile.created = Date.now();
	userprofile.project = req.project;
	userprofile.education = req.education;
	userprofile.user = req.user;

  userprofile.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
        req.login(user, function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(userprofile);
            }
        });
    }
    });
};

/**
 * Delete an userprofile
 */
exports.delete = function (req, res) {
  var userprofile = req.userprofile;

  userprofile.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userprofile);
    }
  });
};

/**
 * List of Userprofiles
 */
exports.list = function (req, res) {
  
  Userprofile.find().sort('-created').populate('user').exec(function (err, userprofiles) {
      
/*       userprofiles[0].users[0].skill.skills; //skill from skills schema
        console.log('this skills', userprofile.skill);
      res.json(userprofiles);*/
   if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userprofiles);
    }
  });
};
/*
var userprofile = new Userprofile({skill});
var userprofile = new Userprofile({});
skill.save(function(err){
    userprofile.skill.push(userskill);
    userprofile.save(function(err){
        
    console.log('kick the skills ',userprofile.skill);   
      res.json(userprofile);
    });
});
*/

exports.userprofileByID = function (req, res, next, id) {
//findOne({'user': us}
//var us = req.user.id;
//console.log('this', us);
//var jobj = JSON.parse(userprofiles);
//console.log('return user first name: ',jobj.firstName);
 // console.log('return user category: ',jobj.category);
 // console.log('return user address1: ',jobj.address1);
  /*Userprofile.findById(id).sort('-created').populate('user', 'displayName').exec(function (err, userprofiles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(userprofiles);
      console.log('return user created',userprofiles.created);
      console.log('return user city',userprofiles.city);
      console.log('return user zip',userprofiles.zip);
      
    }
  });
  */
  //var mongoose = require('mongoose');
  //var id = mongoose.Types.ObjectId(req.param('userprofileId'));
  //var yoyo = req.param('userprofileId');
  console.log('the current object id selected is:',id);
  
 if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Userprofile is invalid'
    });
  }

 // var dipika = [{path:'user', select:'displayName'}, {path:'user', select:'profileImageURL'}];
Userprofile.findById(id).populate('user').exec(function (err, userprofile) {
    if (err) {
      return next(err);
    } else if (!userprofile) {
      return res.status(404).send({
        message: 'No userprofile with that identifier has been found'
      });
    }
    req.userprofile = userprofile;
    //
    
    //res.json(userprofile);
    
    next();
    console.log('query executed and jeson will be responsed',userprofile.state);
    console.log('query executed and jeson will be responsed',userprofile.user.email);
    console.log('query executed and jeson will be responsed',userprofile.project);
    console.log('query executed and jeson will be responsed',userprofile.skill);
  });
 
 /*
 
Userprofile.find({_id: yoyo}).sort('-created').populate('user', 'displayName').exec(function (err, userprofiles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
        
      res.json(userprofiles);
      console.log('query executed and jeson will be responsed',userprofiles.state);
    }
  });
  
*/
/*
app.param('userprofileId', function(req, res, next, userprofileId) {
  // typically we might sanity check that user_id is of the right format
  Userprofile.find(userprofileId, function(err, user) {
    if (err) {
      return next(err);
    } else if (!userprofile) {
      return res.status(404).send({
        message: 'No userprofile with that identifier has been found'
      });
    }
    req.userprofile = userprofile;
    next();
  });
});
*/


/*
/**
 * Userprofile middleware
 */
//exports.userprofileByID = function (req, res, next, id) {

//  if (!mongoose.Types.ObjectId.isValid(id)) {
//    return res.status(400).send({
//      message: 'Userprofile is invalid'
//    });
//  }



  /*if (req.session && req.session.user) {
     
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
        console.log(user);
      }
      // finishing processing the middleware and run the route
    */ 

/*Userprofile.findById(id).exec(function (err, userprofile) 

//Userprofile.findone({'user': us}).exec(function (err, userprofiles) 
{
    if (err) {
      return next(err);
    } else if (!userprofile) {
      return res.status(404).send({
        message: 'No userprofile with that identifier has been found'
      });
    }
    req.userprofile = userprofile;
    console.log('this is the profile by id data', req.userprofile);
    next();
  });
  Userprofile.find({'user' : us }, function(err, restaurant){
    console.log('query executed');  
    // Will show your array of Menu Categories
    // No further queries required
});*/


};
