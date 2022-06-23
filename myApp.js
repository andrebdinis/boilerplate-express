// Meet the Node console
//console.log("Hello World");

// Create an Express App Object
let express = require('express');
let app = express();

// Use body-parser to Parse POST Requests
// (to decode data in different formats)
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

// A Root-Level Request Logger Middleware
// Build a simple logger
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve Your First String
/*app.get("\/", function(req, res) {
  res.send("Hello Express");
});*/

// Serve an HTML File
app.get("\/", function(req, res) {
  const relativePath = "/views/index.html";
  const absolutePath = __dirname + relativePath;
  res.sendFile(absolutePath);
});

// Serve Static Assets (with express.static() middleware)
app.use("\/public", express.static(__dirname + "\/public"));

// Serve JSON on a Specific Route (a simple API)
/*app.get("\/json", function(req, res) {
  res.json({"message": "Hello json"});
});*/
// URL: https://boilerplate-express.andrebdinis.repl.co/json

// Use the .env File (access environment variables with process.env.VARIABLE_NAME)
app.get("\/json", function(req, res) {
  const MESSAGE_STYLE = process.env.MESSAGE_STYLE;
  let message = "Hello json";
  MESSAGE_STYLE==="uppercase" ?
    res.json({"message": message.toUpperCase()})
    : res.json({"message": message});
});
// URL: https://boilerplate-express.andrebdinis.repl.co/json

// Chain Middleware to Create a Time Server
// app.get(PATH, MIDDLEWARE, HANDLER)
app.get("\/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
},  function(req, res) {
  res.json({"time": req.time});
});
// URL: https://boilerplate-express.andrebdinis.repl.co/now

// Get Route Parameter Input from the Client
// Build an Echo Server (mounted at the route GET /:word/echo)
app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
})
// URL: https://boilerplate-express.andrebdinis.repl.co/freecodecamp/echo

// Get Query Parameter Input from the Client
// Build and API endpoint URL (mounted at GET /name)
// app.route(PATH).get(HANDLER).post(HANDLER)
app.route("/name")
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post((req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });
// Query String / Endpoint URL:
//   /name?first=firstname&last=lastname
// URL: https://boilerplate-express.andrebdinis.repl.co/name?first=firstname&last=lastname

















 module.exports = app;