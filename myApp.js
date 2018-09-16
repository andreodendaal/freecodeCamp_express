
var express = require('express');
var bodyParser = require('body-parser');
const app = express();

// --> 7)  Mount the Logger middleware here

app.use('/', function middleware(req, res, next){

  var meth = req.method;
  var pth = req.path;
  var iP = req.ip;
  var logMessage = meth + ' ' + pth + ' - ' + iP;
  console.log(logMessage);
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({ extended: false }));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
  app.get('/hello', function(req, res){
  res.send('Hello Express')
});

/** 3) Serve an HTML file */
  app.get('/', function(req, res){
  var absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
  let staticAssetPath = __dirname + "/public";
  app.use(express.static(staticAssetPath));

/** 5) serve JSON on a specific route */
  app.get("/json", function(req, res) {
    let value = "Hello json";
  /** 6) Use the .env file to configure the app */
    if (process.env.MESSAGE_STYLE == "uppercase"){
        res.json({"message": value.toUpperCase()});
  } else {
        res.json({"message": value});
  }
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
  app.get('/now', function middleware(req, res, next){
    // synchronous operation
    const now = new Date();
    req.time = now.getHours().toString() + ":" + now.getMinutes().toString() + ":" + now.getSeconds().toString();
    next();
  },
  function(req, res) {
    res.json({"time":req.time});
  });

/** 9)  Get input from client - Route parameters */
  app.get("/:word/echo", function(req, res) {
    res.json({"echo": req.params.word});
  });

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
  app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    res.json({name: firstName + ' ' + lastName});
  });
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
  app.post("/name", function(req, res) {
    // Handle the data in the request
    var firstName = req.body.first;
    var lastName = req.body.last;
    res.json({name: firstName + ' ' + lastName});
  });


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
app.listen(process.env.PORT || 3000 );

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
