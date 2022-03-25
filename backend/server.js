const http = require('http');
const fs = require('fs');
const path = require('path');
const serverFunc = (req, res) => {

	const errorHTML = `Rise your gaze to the sky than a bit back to the URL bar and check that link again`;
    
	let filePath = path.resolve(`${__dirname}/../frontend${req.url}`);
    
	fs.access(filePath, fs.constants.R_OK, (err) => {
        if(err){
            res.statusCode = 404;
            res.end(errorHTML);
        }else{
            if(fs.statSync(filePath).isDirectory()) {
                filePath += '/index.html';
            }
            fs.readFile(filePath, (err, data) => {
                if(err) {
                    res.statusCode = 500;
                    res.end(errorHTML);
                } else {
                    res.end(data);
                }
            });
        }
	});
};

const server = http.createServer(serverFunc);

const port = 9000;
const ipAddress = "127.0.0.1";
const listenFunc = () => {
    const addr = server.address();
    console.log(`http://${addr.address}:${addr.port}`);
    console.log(`Nincs más hátra mint előre.`)
};

server.listen(port, ipAddress, listenFunc);