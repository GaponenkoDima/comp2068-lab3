// server.js

// bring connect into our file
var connect = require('connect');

// load in the accounting module
var accounting = require('accounting');

// load in the url module to parse url parameters
var url = require('url');

// bring in the filesystem module
var fs = require('fs');

// instantiate our app from connect
var app = connect();

//make our calculator function
function calculator(method, x, y) {

  //possible values for the method signs
  var signs = {
    add: ' + ',
    subtract: ' - ',
    multiply: ' * ',
    divide: ' / ' };

    //error message if the method sign is anything else
  var result = 'Error. Invalid input.';
  //parseFloat to truncate the numbers out of the string
  x = parseFloat(x);
  y = parseFloat(y);

//function to perfom the calculation
  if (signs[method] && !isNaN(x) && !isNaN(y)) {
    var expression = x + signs[method] + y;
    result = expression + ' = ' + eval(expression);
  }
  return result;
}

app.use('/lab3.js', function(req, res) {
  // grab the values from the url
  // http://localhost:3000/lab3.js?method=add&x=16&y=4
  var query = url.parse(req.url, true).query;
   // display all values
  res.end(calculator(query.method, query.x, query.y));
});

function hello(req, res){
  res.end("Hello!");
}

// make a function to handle all
// generic requests
function generic(req, res){
  fs.readFile('default.html', function(err, data){
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.write(data);
    res.end();
  })
}

// make hello available to the browser
app.use('/hello', hello);

// make a goodbye route
app.use('/goodbye', function(req, res){
  res.end("Goodbye!")
})

// add the generic function to our connect
app.use(generic)

// actually start the server, on
// port 3000
app.listen(3000)

// spit out to the console telling us
// that the server is running
console.log('Connect running on port 3000')
