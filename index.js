const fs= require('fs');
const http = require('http');
let str;
for (i=0; i<10000; i++){
    str+='hello from the file\n';
}
fs.writeFile(`${__dirname}/big.txt`, str, ()=>console.log('file was wtote'));



const server = http.createServer((req, res)=>{
    const readable = fs.createReadStream(`${__dirname}/big.txt`, 'utf-8');
    readable.pipe(res);

});
server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening port 8000');
});
