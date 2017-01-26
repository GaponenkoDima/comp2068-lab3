// Defining the IP Address of our server
var ipAddress = "127.0.0.1";

// Defining the port on which we want to listen
var portNumber = "3000";

// Importing necessary library files
var httpModule = require("http");

// Creating our server's main method
httpModule.createServer(
 function serviceRequest (request, response) {

  // Check what file the user has requested and take necessary method
  var queryString = new String(request.url);

  // We're expecting URLs of the following type:
  // x=3[method=add]&y=6

  var keyValuePairs = queryString.split("&"); // Splitting the query string based on & delimiter

  // Now keyValuePairs[0] contains our method
  var method = keyValuePairs[0].replace("/","").split("=")[1]; // extracting the method specified in the URL
  var firstNumber = new String(keyValuePairs[1].split("&")).split("=")[1] || "0"; // extracting the first number
  var secondNumber = new String(keyValuePairs[2].split("&")).split("=")[1] || "0"; // extracting the second number

  // calling the method to get the result
  var result = getResult(method.toLowerCase(), Number(firstNumber) , Number(secondNumber));

  // HTML which we will display to the user
  
var htmlContent = "<html><b>" + firstNumber + "[" + method + "]" + secondNumber + "=" + "<b>" + result + "</b></html>";
  // write the response
  response.end(htmlContent);
 }
).listen(portNumber, ipAddress);

// Utility method to perform an operation on 2 numbers. Helps to modularize code
function getResult(operation, x, y)
{
 var result = 0;

 if(operation == "add")
  result = x + y;

 else if(operation == "subtract")
  result = x - y;

 else if(operation == "multiply")
  result = x * y;

 else if(operation == "divide" && y != 0)
  result = x / y;


 return result;
}