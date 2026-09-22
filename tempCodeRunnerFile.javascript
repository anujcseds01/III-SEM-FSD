  const http = require('http');

let items = ['Apple', 'Banana'];

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    // GET
    if (req.method === 'GET') {
        res.end(JSON.stringify(items));
    }

    // POST
    else if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            items.push(body);
            res.end('Item added: ' + body);
        });
    }

    // PUT
    else if (req.method === 'PUT') {
        items[0] = 'Updated Item';
        res.end('First item updated');
    }

    // DELETE
    else if (req.method === 'DELETE') {
        items.pop();
        res.end('Last item removed');
    }

});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
   