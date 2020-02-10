const { spawn } = require('child_process');
const server = require('http').createServer();
const url = require('url');
// const querystring = require('querystring');

server.on('request', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });

    // parse url
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.query.command) {
        const { command: commandQuery } = parsedUrl.query;

        const args = commandQuery.split(' ');
        const command = args[0];
        args.splice(0, 1);

        // process command
        const child = spawn(command, args);

        child.stderr.on('data', data => res.write(data));
        child.stdout.on('data', data => res.write(data));

        child.on('exit', (code, signal) => res.end('\n\n'))
    } else {
        res.end();
    }
});

// start the server
// server.timeout = 1000;
module.exports = server;
