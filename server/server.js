/**
 * Created by liaohb on 15-10-9 上午10:10.
 * File name By server.js
 */

var http = require("http");
var util = require("util");
var Comm = require("./lib/commonMethod");
/**
 * 定义全局变量.
 */
global.Config = Comm.Comm.ReadConfig();

function start(route) {
    try {
        var listenPort = global.Config.ListenPort || 80;
        http.createServer(function (request, response) {
            response.writeHead(200, { "Content-Type": "text/html;charset=utf-8", "Access-Control-Allow-Origin": "*" });
            route(response, request);
        }).listen(listenPort);
        console.log("start http server :http://127.0.0.1:%d", listenPort);
    }
    catch (e) {
        console.log(util.inspect(e, true, 3, true));
    }
}
/**
 * 将方法公开可以让外面使用
 * @type {start}
 */
exports.start = start;

