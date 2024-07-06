const data = require('../../data');

module.exports = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        const parsedBody = new URLSearchParams(body);
        const name = parsedBody.get('name');
        const birthday = parsedBody.get('birthday');

        if (name && birthday) {
            const user = {name, birthday};
            data.addUser(user);
            res.writeHead(201);
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(400);
            res.end(JSON.stringify({ message: 'Не указаны имя и дата рождения'}))
        }
    });
}