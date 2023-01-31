/*
 * @Author: liang.sun 44958918@qq.com
 * @Date: 2023-01-10 12:40:23
 * @LastEditors: liang.sun 44958918@qq.com
 * @LastEditTime: 2023-01-31 08:39:29
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

const job = new CronJob("0 * * * * *", async function () {
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
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br' ,
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Host': 'zhiyou.smzdm.com',
                'Pragma': 'no-cache',
                'DNT': '1',
                'Referer': 'https://www.smzdm.com/',
                'sec-ch-ua':'"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'script',
                'Sec-Fetch-Mode': 'no-cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70',
                'X-Requested-With': ' XMLHttpRequest',
                'Cookie':cc
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
 console.log('服务器启动中=====  ：'+moment().format("YYYY-MM-DD hh:mm:ss"));
 job.start();
 console.log('服务器启动完成=====  ：'+moment().format("YYYY-MM-DD hh:mm:ss"));

module.exports = job