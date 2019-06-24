var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");

var app = express();

// middleware
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now()+ ".pdf") ;
  }
});

var upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), ({ body, file }, res) => {
  console.log(body);
  console.log(file);
  res.json({
    status: "SUCCESS",
    responseData: {
      body: body,
      file: file
    }
  });
});

// start
var server = app.listen(3000, () => {
  console.log("Started at port " + server.address().port);
});
