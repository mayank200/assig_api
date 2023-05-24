const compression=require('compression');
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
//const { Router } = require("express");
const app = express();
// app.use(bodyParser.json({ limit: '2mb' }))
var useragent = require("express-useragent");
app.use(compression());

var corsOptions = {
 // origin: "http://localhost:8081"   fro particuler
   origin: '*' //for all
};
app.use(bodyParser.json({limit:'6mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'6mb',parameterLimit:6000,extended:true}));

app.use(cors(corsOptions));
// parse requests of content-type - application/json
// app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(useragent.express());
// app.use(bodyParser.json({ limit: '2mb' })) 

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome" });
// });

require('./src/routes')(app);
// set port, listen for requests
//const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
