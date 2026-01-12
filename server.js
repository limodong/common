const http = require('node:http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"});
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    // res.setHeader("Access-Control-Allow-Headers","*")
    res.end(JSON.stringify({ data: "Hello!" }))
});

server.listen(9999);
server.on("listening", () => {
    console.log("server listen port 9999");
})
