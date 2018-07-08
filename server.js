const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.static(__dirname + '/dist'));
app.use(morgan('combined'))
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

const port = process.env.PORT || 4200;
app.listen(port);
console.log(`Server listening on port ${port}`);
