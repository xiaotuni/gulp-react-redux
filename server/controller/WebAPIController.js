/**
 * Created by liaohb on 15-10-27 上午11:13.
 * File name By BlogController.js
 */
var Comm = require("./../lib/commonMethod");
var Fiber = require('fibers');

var WebApi = {
    index: function (Request, Respone, Options) {
        //Options.Condition = {};
        //Fiber.yield();
        Comm.Comm.Display(Request, Respone, Options);
    },

    GetValues: function (req, res, opt) {
        console.log('--------------123-----------');
        const result = [
            { id: 1, title: '标题', content: '哈哈~~~' },
            { id: 1, title: '标题', content: '哈哈~~~' },
            { id: 1, title: '标题', content: '哈哈~~~' },
            { id: 1, title: '标题', content: '哈哈~~~' },
        ];
        res.SendJSON(result);
        
    }
}

exports.WebApi = WebApi;