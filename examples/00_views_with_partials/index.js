var express = require('express'),
    rendr = require('rendr'),
    app = express();

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.logger());
app.use(express.bodyParser());


var apiApp = express();

apiApp.get('/users', function(req, res) {
  res.json([{ name: "User 1 from api", email: "user1@email.cm" },
          { name: "User 2 from api", email: "user2@email.cm" }])
})


var dataAdapterConfig = {
  'default': {
    host: 'localhost:3030/api',
    protocol: 'http'
  }
}

var server = rendr.createServer({
  apiPath: '/apiproxy',
  // apiPath: 'http://localhost:3030/api',
  dataAdapterConfig: dataAdapterConfig
});

app.use('/api/', apiApp);
app.use(server);

function start() {
  var port = process.env.PORT || 3030;
  app.listen(port);
  console.log("server pid %s listening on port %s in %s mode",
      process.pid,
      port,
      app.get('env')
  );
}

if (require.main === module) {
  start();
}

exports.app = app;
