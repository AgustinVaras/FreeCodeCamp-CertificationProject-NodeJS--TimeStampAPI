// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//Function to check valid Date strings
isValidDate = (dateString) => {
  return !isNaN(new Date(dateString));
};

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const inputDate = req.params.date;
  
  if( isValidDate(inputDate) ) {
    const parsedDate = new Date(inputDate);
    const GMTString = parsedDate.toGMTString();

    const unix = Math.floor(parsedDate.getTime());
    // console.log(GMTString);
    // console.log(unix);
    res.json({unix: unix, utc: GMTString});
  } else if (/^\d+$/.test(inputDate) && inputDate.length >= 13) {
    const parsedDate = new Date(parseInt(inputDate, 10));
    const GMTString = parsedDate.toGMTString();
    // console.log(parsedDate.toGMTString());

    res.json({unix: parseInt(inputDate), utc: GMTString});
  } else {
    res.json({error: "Invalid Date"});
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
