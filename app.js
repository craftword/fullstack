// BASE SETUP ================================================================
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	http = require("http");
    path = require("path");
	firebase = require("firebase");

var port = process.env.PORT || 6969; 


// firebase setup
firebase.initializeApp({
	apiKey: "AIzaSyDa4MXTByQGffWNQU45pW3qNKHz_WeAWrQ",
    authDomain: "bc-19-quiz-app.firebaseapp.com",
    databaseURL: "https://bc-19-quiz-app.firebaseio.com",
    storageBucket: "bc-19-quiz-app.appspot.com",
    messagingSenderId: "826087915451"
});

var db = firebase.database();
var usersRef = db.ref("-KfvRRv2Ed1RZMM6lg4M/English");

// CONFIGURE APP

// body parser, to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// configure app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});

// BASE APP ==================================================================
// MIDDLEWARE 
app.use(morgan('dev'));  // log all requests to the console

// 	VIEW ENGINE =======================================
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// BASE ROUTE ===================================================
app.get('/', function(req, res) {
res.render('index'); 
});

app.get('/leaderboard', function(req, res) {
res.render('leaderboard'); 
});

// API =======================================================================
var apiRouter = express.Router();  // get an express router

// API MIDDLEWARE ============================================================
apiRouter.use(function(req, res, next) {
	console.log("someone just came to the app");
	// this is where we authenticate users
	next();
});
// API Routes =================================================================
apiRouter.get('/', function(req, res) {
	res.json({ message: 'woah check out this json'});
});

apiRouter.route('/English')
   .get(function(req, res) {
		// Firebase get all users
		usersRef.once("value", function(snapshot, prevChildKey) {
			res.json(snapshot.val());
		})
	});



// Register our routes - all routes prefixed with /api
app.use('/api', apiRouter);

//START THE SERVER ===========================================================
app.listen(port);
console.log('port: '+ port);