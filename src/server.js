const { spawn } = require('child_process');
const ngrok = require('ngrok');
const server = require('http').createServer();

let port = 3000;

server.on('request', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });

    // process command
    const child = spawn('pwd');

    child.stderr.on('data', data => res.end(data));
    child.stdout.on('data', data => res.end(data));

    // res.end('Hello World!\n');
});

if (require.main == module) {
    const portStr = process.argv[2];
    if (portStr && !isNaN(portStr)) {
        port = parseInt(portStr, 10);

        // start ngrok
        (async () => {
            const url = await ngrok.connect(port);
            console.log(url);
        })();
    }
}

// server.timeout = 1000;
server.listen(port);
