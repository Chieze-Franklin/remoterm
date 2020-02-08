const cluster = require('cluster');
const ngrok = require('ngrok');
const os = require('os');

let port = 3000;
if (require.main == module) {
    const portStr = process.argv[2];
    if (portStr && !isNaN(portStr)) {
        port = parseInt(portStr, 10);
    }
}

if (cluster.isMaster) {
    const cpus = os.cpus().length;

    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            cluster.fork();
        }
    });

    ngrok.connect(port)
        .then(url => console.log(url))
        .catch(e => console.log(e));
} else {
    const server = require('./server');
    server.listen(port);
}