const http = require('http');
const fs = require('fs')
const { readFileSync } = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const headsImage = readFileSync('images/peso.png');
const tailsImage = readFileSync('images/back.png');

const server = http.createServer(function (req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else if (page == '/css/style.css') {
        fs.readFile('css/style.css', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/css'
            });
            res.write(data);
            res.end();
        });
    } else if (page == '/js/main.js') {
        fs.readFile('js/main.js', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/javascript'
            });
            res.write(data);
            res.end();
        });
    } else if (page == '/api') {
        let result

        function flip() {
            const flipCoin = Math.ceil(Math.random() * 2)
            if (flipCoin <= 1) {
                result = 'Heads'
                console.log(result)

            } else {
                result = 'Tails'
                console.log(result)
            }
        }
        flip()
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        const objToJson = {
            result
        }
        res.end(JSON.stringify(objToJson));

    } else if (page == '/images/peso.png') {
        res.writeHead(200, {"Content-Type": "image/png"})
        res.write(headsImage);
        res.end()
        } else if (page == '/images/back.png') {
        res.writeHead(200, {"Content-Type": "image/png"})
        res.write(tailsImage);
        res.end()
        }else {
            figlet('404.!.', function (err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                res.write(data);
                res.end();
            });
        }
    
});

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT} `));