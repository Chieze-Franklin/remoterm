const { spawn } = require('child_process');
const server = require('http').createServer();

server.on('request', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });

    // process command
    const child = spawn('pwd'); // ('ab -c200 -t10 http://localhost:3000/');

    child.stderr.on('data', data => res.end(data));
    child.stdout.on('data', data => res.end(data));

    // child.on('exit', (code, signal) => res.write('\n\n'))
});

// start the server
// server.timeout = 1000;
module.exports = server;
