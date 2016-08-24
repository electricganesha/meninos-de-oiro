var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var multer = require('multer');

var News = mongoose.model('News');
var StructuralInfo = mongoose.model('StructuralInfo');
var Categories = mongoose.model('Categories');
var Stories = mongoose.model('Stories');
var Partners = mongoose.model('Partners');
var Team = mongoose.model('Team');
var Projects = mongoose.model('Projects');

var upload = multer({ dest: 'public/uploads/'});
var fs = require('fs');

var type = upload.single('recfile');

module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Meninos de Oiro' });

});

router.get('/about', function(req, res, next) {

  res.render('about', { title: 'Meninos de Oiro' });

});

router.get('/partnersPage', function(req, res, next) {

  res.render('partnersPage', { title: 'Meninos de Oiro' });

});

router.get('/acknowledgments', function(req, res, next) {

  res.render('acknowledgments', { title: 'Meninos de Oiro' });

});

router.get('/contacts', function(req, res, next) {

  res.render('contacts', { title: 'Meninos de Oiro' });

});

router.get('/membership', function(req, res, next) {

  res.render('membership', { title: 'Meninos de Oiro' });

});

router.get('/mission', function(req, res, next) {

  res.render('mission', { title: 'Meninos de Oiro' });

});

/* NEWS routes */
router.param('newsPost', function(req, res, next, id){
  var query = News.findById(id);

  query.exec(function (err, newsPost){
    if (err) { return next(err); }
    if (!newsPost) { return next(new Error('can\'t find news clip')); }

    req.newsPost = newsPost;
    return next();
  });
});

router.get('/news', function(req,res,next){
  News.find(function(err,news){
    if(err){ return next(err); }
    res.json(news);
  });
});

router.post('/news', function(req,res,next){

  var newsPost = new News(req.body);

  newsPost.save(function(err,newsPost){
    if(err){ return next(err);}

    res.json(newsPost);
  });
});

router.get('/news/:newsPost', function(req,res)
{
  res.json(req.newsPost);
});

router.delete('/news/:newsPost', function(req,res)
{
  var updateInfo = req.newsPost;

  News.findOneAndRemove({"_id":updateInfo._id}, function(err, doc)
  {
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }
  });
});

router.put('/news/:newsPost/update', function(req,res){

  var updateInfo = req.body;

  delete updateInfo.__v;

  News.findOneAndUpdate({"_id": updateInfo._id}, updateInfo, function(err, doc){
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }

    console.log(doc);
   });

});

router.put('/news/:newsPost/upvote', function(req, res, next) {
  req.newsPost.upvote(function(err, newsPost){
    if (err) { return next(err); }
    res.json(newsPost);
  });
});

/* CATEGORY routes */
router.param('category', function(req, res, next, id){
  var query = Categories.findById(id);

  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error('can\'t find Category')); }

    req.category = category;
    return next();
  });
});

router.get('/categories', function(req,res,next){
  Categories.find(function(err,categories){
    if(err){ return next(err); }
    console.log(categories);
    res.json(categories);

  });
});

router.post('/categories', function(req,res,next){

  var category = new Categories(req.body);

  category.save(function(err,category){
    if(err){ return next(err);}

    res.json(category);
  });
});

router.get('/categories/:category', function(req,res)
{
  res.json(req.category);
});

router.delete('/categories/:category', function(req,res)
{
  var updateInfo = req.category;

  Categories.findOneAndRemove({"_id":updateInfo._id}, function(err, doc)
  {
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }
  });
});

router.put('/categories/:category/update', function(req,res){

  var updateInfo = req.body;

  delete updateInfo.__v;

  Categories.findOneAndUpdate({"_id": updateInfo._id}, updateInfo, function(err, doc){
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }

    console.log(doc);
   });

});

/* STORY routes */
router.param('story', function(req, res, next, id){
  var query = Stories.findById(id);

  query.exec(function (err, story){
    if (err) { return next(err); }
    if (!story) { return next(new Error('can\'t find Story')); }

    req.story = story;
    return next();
  });
});

router.get('/stories', function(req,res,next){
  Stories.find(function(err,stories){
    if(err){ return next(err); }
    console.log(stories);
    res.json(stories);
  });
});

router.post('/stories', function(req,res,next){

  var story = new Stories(req.body);

  story.save(function(err,story){
    if(err){ return next(err);}

    res.json(story);
  });
});

router.get('/stories/:story', function(req,res)
{
  res.json(req.story);
});

router.delete('/stories/:story', function(req,res)
{
  var updateInfo = req.story;

  Stories.findOneAndRemove({"_id":updateInfo._id}, function(err, doc)
  {
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }
  });
});

router.put('/stories/:story/update', function(req,res){

  var updateInfo = req.body;

  delete updateInfo.__v;

  Stories.findOneAndUpdate({"_id": updateInfo._id}, updateInfo, function(err, doc){
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }

    console.log(doc);
   });

});

/* PARTNER routes */
router.param('partner', function(req, res, next, id){
  var query = Partners.findById(id);

  query.exec(function (err, partner){
    if (err) { return next(err); }
    if (!partner) { return next(new Error('can\'t find Partner')); }

    req.partner = partner;
    return next();
  });
});

router.get('/partners', function(req,res,next){
  Partners.find(function(err,partners){
    if(err){ return next(err); }
    console.log(partners);
    res.json(partners);
  });
});

router.post('/partners', function(req,res,next){

  var partner = new Partners(req.body);
    console.log("partners");
    partner.save(function(err,partner){
    if(err){ return next(err); console.log(err);}

    res.json(partner);
  });
});

router.get('/partners/:partner', function(req,res)
{
  res.json(req.partner);
});

router.delete('/partners/:partner', function(req,res)
{
  var updateInfo = req.partner;

  Partners.findOneAndRemove({"_id":updateInfo._id}, function(err, doc)
  {
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }
  });
});

router.put('/partners/:partner/update', function(req,res){

  var updateInfo = req.body;

  delete updateInfo.__v;

  Partners.findOneAndUpdate({"_id": updateInfo._id}, updateInfo, function(err, doc){
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }

    console.log(doc);
   });
});

/* TEAM routes */
router.param('teammember', function(req, res, next, id){
  var query = Team.findById(id);

  query.exec(function (err, teammember){
    if (err) { return next(err); }
    if (!teammember) { return next(new Error('can\'t find Team Member')); }

    req.teammember = teammember;
    return next();
  });
});

router.get('/team', function(req,res,next){
  Team.find(function(err,team){
    if(err){ return next(err); }
    console.log(team);
    res.json(team);
  });
});

router.post('/team', function(req,res,next){

  var teammember = new Team(req.body);
    console.log("partners");
    teammember.save(function(err,teammember){
    if(err){ return next(err); console.log(err);}

    res.json(teammember);
  });
});

router.get('/team/:teammember', function(req,res)
{
  res.json(req.teammember);
});

router.delete('/team/:teammember', function(req,res)
{
  var updateInfo = req.teammember;

  Team.findOneAndRemove({"_id":updateInfo._id}, function(err, doc)
  {
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }
  });
});

router.put('/team/:teammember/update', function(req,res){

  var updateInfo = req.body;

  delete updateInfo.__v;

  Team.findOneAndUpdate({"_id": updateInfo._id}, updateInfo, function(err, doc){
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }
    console.log(doc);
   });
});

/* TEAM routes */
router.param('project', function(req, res, next, id){
  var query = Projects.findById(id);

  query.exec(function (err, project){
    if (err) { return next(err); }
    if (!project) { return next(new Error('can\'t find Project')); }

    req.project = project;
    return next();
  });
});

router.get('/projects', function(req,res,next){
  Projects.find(function(err,projects){
    if(err){ return next(err); }
    console.log(projects);
    res.json(projects);
  });
});

router.post('/projects', function(req,res,next){

  var project = new Projects(req.body);
    console.log("projects");
    project.save(function(err,project){
    if(err){ return next(err); console.log(err);}

    res.json(project);
  });
});

router.get('/projects/:project', function(req,res)
{
  res.json(req.project);
});

router.delete('/projects/:project', function(req,res)
{
  var updateInfo = req.project;

  Projects.findOneAndRemove({"_id":updateInfo._id}, function(err, doc)
  {
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }
  });
});

router.put('/projects/:project/update', function(req,res){

  var updateInfo = req.body;

  delete updateInfo.__v;

  Projects.findOneAndUpdate({"_id": updateInfo._id}, updateInfo, function(err, doc){
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }
    console.log(doc);
   });
});

/* STRUCTURE routes */
router.get('/structuralInfo', function(req,res,next){
  StructuralInfo.find(function(err,structuralInfo){
    if(err){ return next(err); }

    res.json(structuralInfo);
  });
});

router.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/admin', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/login'); //Inside a callback… bulletproof!
  });
});


/* GET admin page. */
router.get('/admin', isLoggedIn, function(req, res) {
        res.render('admin', {
            user : req.user, // get the user out of session and pass to template
            title: 'ADMIN - Meninos de Oiro',
            message: req.flash('loginMessage'),
        });
});

router.post('/upload', upload.single('uploadImageFile'), function (req, res, next){

  console.log("dentro do upload");
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	/* example output:
            { fieldname: 'upl',
              originalname: 'grumpy.png',
              encoding: '7bit',
              mimetype: 'image/png',
              destination: './uploads/',
              filename: '436ec561793aa4dc475a88e84776b1b9',
              path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
              size: 277056 }
	 */
	//res.status(204).end();

  console.log(req.file.filename);

  res.json(req.file.filename);
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
