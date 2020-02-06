const server = require('http').createServer();
let port = 3000;

server.on('request', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Hello World!\n');
});

if (require.main == module) {
    const portStr = process.argv[2];
    if (portStr && !isNaN(portStr)) {
        port = parseInt(portStr, 10);
    }
}

// server.timeout = 1000;
server.listen(port);
