var express = require('express');
var cors = require('cors'); // so that the API is remotely testable by FCC

var app = express();

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public')); 

// front page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// get current time JSON
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({unix: now.getTime(), utc: now.toUTCString()});
});

// get time JSON based on a given date or unix
app.get("/api/:date", (req, res) => {
  var date = req.params.date;
  if(!isNaN(date))
    date = parseInt(date);
  date = new Date(date);
  const unix = date.getTime();
  const utc = date.toUTCString();
  res.json(date == "Invalid Date" ? {error: "Invalid Date"} : {unix: unix, utc: utc});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
