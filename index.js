//Lets require/import the HTTP module
var http = require('http');
var fs = require('fs');

//Lets define a port we want to listen to
const PORT=8080;

var path = [];
path['/'] = 'www/index.html';

var cache = [];

// var files = fs.readdirSync('www');
// console.log(files);
// for (var i = 0, len = files.length; i < len; i++) {
//     cache[files[i]] = fs.readFileSync('www/'+files[i], 'utf8');
// }

var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

walk('www', function(err, files) {
    if (err) throw err;
    for (var i = 0, len = files.length; i < len; i++) {
        cache[files[i]] = fs.readFileSync(files[i]);
        path[files[i].replace("www","")] = files[i];
    }
    console.log('Cached the directory');
});



//We need a function which handles requests and send response
function handleRequest(request, response){
    url = require('url').parse(request.url);
    response.end(cache[path[url.pathname]]);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});