var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var multer = require('multer');

var News = mongoose.model('News');
var StructuralInfo = mongoose.model('StructuralInfo');

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

router.get('/partners', function(req, res, next) {

  res.render('partners', { title: 'Meninos de Oiro' });

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

  console.log("bla");

  console.log(req.newsPost);

  var updateInfo = req.newsPost;

  console.log(updateInfo._id);
  /*News.findOne({ "_id":updateInfo._id }).remove( function(err){
    console.log(err);
  });*/

  News.findOneAndRemove({"_id":updateInfo._id}, function(err, doc)
  {
    if(err){
       console.log("Something wrong when updating data! - " + err );
   }

      console.log(doc);
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
