const express = require("express");
const os = require("os");
const app = express();

app.get("/", (request, response) => {
    return response
    .status(200)
    .json({
        message: "Olá"
    });
});

app.get("/liveness", (request, response) => {
    const gid = typeof process.getegid === 'function' ? process.getegid() : 'N/A';
    const uid = typeof process.geteuid === 'function' ? process.geteuid() : 'N/A';

    return response
    .status(200)
    .json({
        message: "Meu app está vivo!",
        path: process.cwd(),
        gid: gid,
        uid: uid,
        date: new Date().getTime()
    });
});

//app.get("/liveness", (request, response) => {
//    return response
//    .status(200)
//    .json({
//        message: "Meu app esta vivo!",
//        path: process.cwd(),
//        gid: process.getegid(),
//        uid: process.geteuid()
//    });
//});

app.get("/readiness", (request, response) => {
    return response
    .status(200)
    .json({
        message: "Meu app está pronto!",
        plataform: os.platform(),
        freemem: os.freemem(),
        homedir: os.homedir(),
        date: new Date().getTime()
    });
});

module.exports = app;