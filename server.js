var express = require('express'),
    minify = require('express-minify'),
    app = express(),
    _ = require('underscore');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.disable('x-powered-by');
if (process.env.NODE_ENV == 'production') {
  app.use(minify({
    cache: true
  }));
}
app.use(express.static(__dirname + '/public'));

var server = app.listen(3008, function () {
  console.log('Listening at ' + 'http://%s:%s', server.address().address, server.address().port);
});
