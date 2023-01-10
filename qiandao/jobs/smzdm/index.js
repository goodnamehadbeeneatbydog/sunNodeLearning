/*
 * @Author: liang.sun 44958918@qq.com
 * @Date: 2023-01-10 12:40:23
 * @LastEditors: liang.sun 44958918@qq.com
 * @LastEditTime: 2023-01-10 13:22:33
 * @FilePath: \sunNodeLearning\qiandao\jobs\smzdm\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const got = require("got");
const getCookie = require("../../tools/cookieTools");
const path = require('path');
const cookiePath = path.join(__dirname, '../../config/jobs/smzdm_cookies.properties');

const url =
    "https://zhiyou.smzdm.com/user/checkin/jsonp_checkin";
const moment = require("moment");
var CronJob = require("cron").CronJob;

const job = new CronJob("0 5 7 * * *", async function () {
    console.log("开始签到  ：" + moment().format("YYYY-MM-DD hh:mm:ss"));
    const result = await qiandao();

    console.log("签到结束:%s", moment().format("YYYY-MM-DD hh:mm:ss"));
});

async function qiandao() {
    const cc = getCookie(cookiePath);


    try {
        console.log("开始什么值得买签到~~~")
        const { body } = await got.get(url , {
            headers: {
                'Accept': ' application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': ' gzip, deflate, br' ,
                'Accept-Language': ' zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6',
                'Cache-Control': ' no-cache',
                'Connection': ' keep-alive',
                'Host': 'zhiyou.smzdm.com',
                'Pragma': ' no-cache',
                'Referer': 'https://www.smzdm.com/',
                'Sec-Fetch-Dest': ' empty',
                'Sec-Fetch-Mode': ' cors',
                'Sec-Fetch-Site': ' same-origin',
                'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                'X-Requested-With': ' XMLHttpRequest',
                'sec-ch-ua': ' "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
                'sec-ch-ua-mobile': ' ?0',
                'sec-ch-ua-platform': ' "Windows"',
                'Cookie':' '+cc
            },
        });

        if (body) {
            console.log(JSON.parse(body));
            console.log(JSON.parse(body));
            console.log("结束什么值得买签到~~~")
        }
    } catch (ex) {
        console.log(ex.message);
        console.log("什么值得买签到失败！！！")
    }
}



//测试使用，上线注释
// console.log('服务器启动中=====  ：'+moment().format("YYYY-MM-DD hh:mm:ss"));
// job.start();
// console.log('服务器启动完成=====  ：'+moment().format("YYYY-MM-DD hh:mm:ss"));

module.exports = job