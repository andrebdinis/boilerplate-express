let express = require('express');
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

//console.log("Hello World");

/*app.get("\/", function(req, res) {
  res.send("Hello Express");
});*/

app.get("\/", function(req, res) {
  const relativePath = "/views/index.html";
  const absolutePath = __dirname + relativePath;
  res.sendFile(absolutePath);
});

app.use("\/public", express.static(__dirname + "\/public"));

/*app.get("\/json", function(req, res) {
  res.json({"message": "Hello json"});
});*/
// url to see the json message:
// https://boilerplate-express.andrebdinis.repl.co/json

app.get("\/json", function(req, res) {
  const MESSAGE_STYLE = process.env.MESSAGE_STYLE;
  let message = "Hello json";
  MESSAGE_STYLE==="uppercase" ?
    res.json({"message": message.toUpperCase()})
    : res.json({"message": message});
});
// url to see the json message:
// https://boilerplate-express.andrebdinis.repl.co/json

app.get("\/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
},  function(req, res) {
  res.json({"time": req.time});
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
})
// url example to test this:
// https://boilerplate-express.andrebdinis.repl.co/freecodecamp/echo

// given a query string:
// /name?first=firstname&last=lastname
app.route("/name")
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post((req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });
// url to see the result of a given query string:
// https://boilerplate-express.andrebdinis.repl.co/name?first=firstname&last=lastname

















 module.exports = app;