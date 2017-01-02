'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Job = mongoose.model('Job');

/**
 * Globals
 */
var user,
  job;

/**
 * Unit tests
 */
describe('Job Model Unit Tests:', function () {

  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      job = new Job({
        jobTitle: 'Job Title',
        position: 'Job Position',
	email1 : 'job@email.com',
	phone1 : '8456465465',
	moduleName : 'job moduleName',
	category : 'job category',
	img1 : '',
	taskDuration : '654',
	jobDescription : 'job jobDescription',
	skills : 'job skills', 
	startDate : '10/10/10',	
	resp : 'job resp',		//responsibilities
	features : 'job features',
	require : 'job require',	//requirements
	communication : 'job communication', 		//communication
	completion : 'job completion', //completion
	finProd : 'job finProd',	//final product
	payment : 'job payment',
	subCont : 'yes',	//subcontracting	
	views : '654', 
	status : 'job status',		
	link : '', 
	companyName : 'job companyName',
	state : 'job state',
	city : 'job city',
	zipcode : '41112',
	payRate : '54',
	score : '88',
	ratings : '8',  
	posted_at : '10/10/10',
  posted_by : 'job posted_by',
	creator : 'job user._id',
  user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      job.save(function (err) {
        should.not.exist(err);
        return done();
      });
    });

    it('should be able to show an error when try to save without title', function (done) {
      job.jobTitle = '';
/*      job.jobTitle = req.body.jobTitle;
	job.position = req.body.position;
	job.email1 = req.body.email1;
	job.phone1 = req.body.phone1;
	job.moduleName = req.body.moduleName;
	job.category = req.body.category;
	job.img1 = req.body.img1;
	job.taskDuration = req.body.taskDuration;
	job.jobDescription = req.body.jobDescription;
	job.skills = req.body.skills; 
	job.startDate = req.body.startDate;	
	job.resp = req.body.resp;		//responsibilities
	job.features = req.body.features;
	job.require = req.body.require;	//requirements
	job.communication = req.body.communication; 		//communication
	job.completion = req.body.completion; //completion
	job.finProd = req.body.finProd;	//final product
	job.payment = req.body.payment;
	job.subCont = req.body.subCont;	//subcontracting	
	job.views = req.body.views; 
	job.status = req.body.status;		
	job.link = req.body.link; 
	job.companyName = req.body.companyName;
	job.state = req.body.state;
	job.city = req.body.city;
	job.zipcode = req.body.zipcode;
	job.payRate = req.body.payRate;
	job.score = req.body.score;
	job.ratings = req.body.ratings;   
	job.posted_at = req.body.posted_at;
	job.posted_by = req.body.posted_by;
	job.updated_at = req.body.updated_at;
	job.creator = req.user._id;
	job.company = req.company;
	job.user = req.user;
*/
      job.save(function (err) {
        should.exist(err);
        return done();
      });
    });
  });

  afterEach(function (done) {
    Job.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});
