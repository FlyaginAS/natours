const fs = require('fs');
const http = require('http');
const url = require('url');
const replacetemp = require(`./replace.js`);
const util = require('util');
const readFile  = util.promisify(fs.readFile);
(async ()=> {
    console.log( await readFile('./1.txt', 'utf-8'));

})();

// console.log(fs.readFile('./1.txt', 'utf-8'));

// const server = http.createServer((req, res)=>{
//     console.log(url.parse(req.url, true));
//     if(req.url=== '/card'){
//         //reading template
//         fs.readFile(`${__dirname}/template/template-card.html`, 'utf-8', (err, data1)=>{
//             if(err){
//                 return console.log(err.message);
//             }
//             //reading json
//             fs.readFile(`${__dirname}/json/json-card.json`, 'utf-8', (err, data2)=>{
//                 if(err){
//                     console.log(err.message);
//                 }
//                 let card = JSON.parse(data2);
//                 let page = replacetemp(data1, card);
//
//                 //send response
//                 res.writeHead(200, {
//                     'Content-type': 'text/html',
//                 });
//                 res.end(page);
//             });
//
//         });
//     } else {
//         res.writeHead(404);
//         res.end('not found');
//     }
//
// });
//
// server.listen(8000, '127.0.0.1', ()=>{
//     console.log('listening on port 8000...');
// });




