let express = require('express');
let app = express();
//console.log("Hello World");
/*app.get("\/", function(req, res) {
  res.send("Hello Express");
});*/
app.get("\/", function(req, res) {
  const relativePath = "/views/index.html";
  const absolutePath = __dirname + relativePath;
  res.sendFile(absolutePath);
});




































 module.exports = app;
