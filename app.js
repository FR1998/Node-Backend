const http = require('node:http');

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (req, res) => {
    if(req.url == "/")
    {
        res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
    }
    else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'About!',
  }));
    }
  
});

console.log(`Server is running at port ${8000}`)
server.listen(8000); 