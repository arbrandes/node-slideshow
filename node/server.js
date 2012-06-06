var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , querystring = require('querystring')
  , io = require('socket.io')
  , sys = require(process.binding('natives').util ? 'util' : 'sys')
  , Config = require('./Config').Config
  , Info = {
      timeLeft: Config.timed,
      timeWarning: Config.timeWarning,
      timeEnd: 0,
      timeEnabled: false,
      slide: 0,
      max: 0
    }
  , stack = {}
  , rdir = /\/$/
  , rstart = /^[^\/]/
  , slideshowServer;


send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};


// socket
slideshowServer = http.createServer(function(req, res){
  var path = url.parse(req.url).pathname;
  sys.puts(path);
      
  var fileName = './' + Config.slideshowName + path;
  sys.puts(fileName);

  fs.readFile(fileName, function(err, data) {
    if (err) return send404(res);
    
    if (path.match(/\.js/)) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
    } else if (path.match(/\.html/)) {
        res.writeHead(200, {'Content-Type': 'text/html'});
    } else if (path.match(/\.css/)) {
        res.writeHead(200, {'Content-Type': 'text/css'});
    } else if (path.match(/\.png/)) {
        res.writeHead(200, {'Content-Type': 'image/png'});
    } else if (path.match(/\.jpg/)) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
    } else if (path.match(/\.ico/)) {
        res.writeHead(200, {'Content-Type': 'image/vnd.microsoft.icon'});
    } else if (path.match(/\.woff/)) {
        res.writeHead(200, {'Content-Type': 'application/x-font-woff'});
    } else if (path.match(/\.eot/)) {
        res.writeHead(200, {'Content-Type': 'application/vnd.ms-fontobject'});
    } else if (path.match(/\.ttf/)) {
        res.writeHead(200, {'Content-Type': 'font/ttf'});
    } else if (path.match(/\.svg/)) {
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    } else {
      return send404(res);
    }
        
    res.write(data, 'utf8');
    res.end();
  });
});

slideshowServer.listen( Config.port );
sys.puts('Client enabled at http://localhost:' + Config.port + '/');


// set up socket.IO
var io = io.listen(slideshowServer);
io.sockets.on('connection', function(socket) {
  sys.puts('Connection created [id:' + socket.id + '] [time:' + Date.now() + ']');

  // when we receive a message, broadcast it to all sockets
  socket.on('message', function(message) {
    var msg = JSON.stringify(message);
    sys.puts(msg);
    socket.broadcast.send(msg);
  });

  socket.on('disconnect', function() {
    sys.puts('Connection closed [id:' + socket.id + '] [time:' + Date.now() + ']');
  });
});


/* Reading Max Slides */
fs.readFile( __dirname + '/../' + Config.slideshowName + '/index.html', 'utf-8', function( e, data ) {
  Info.max = data.match( /<section[> ]/g ).length;
  sys.puts( Info.max + ' Slides');
});
