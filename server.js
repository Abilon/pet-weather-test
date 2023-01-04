const net = require('net');
const port = 5999;
const host = '94.103.90.12'

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port +'.');
});
