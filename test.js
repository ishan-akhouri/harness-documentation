const assert = require('assert');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from harness-documentation app!\n');
});

server.listen(0, () => {
  const { port } = server.address();
  http.get(`http://localhost:${port}`, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      assert.strictEqual(res.statusCode, 200, 'expected 200 OK');
      assert.strictEqual(data, 'Hello from harness-documentation app!\n', 'unexpected response body');
      console.log('test.js: all assertions passed');
      server.close(() => process.exit(0));
    });
  });
});
