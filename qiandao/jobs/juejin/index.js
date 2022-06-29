/*
 * @Author: liang.sun 44958918@qq.com
 * @Date: 2022-05-26 09:24:51
 * @LastEditors: liang.sun 44958918@qq.com
 * @LastEditTime: 2022-06-29 09:11:23
 * @FilePath: \sunNodeLearning\qiandao\juejin\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const got = require("got");
const getCookie = require("../../tools/cookieTools");
const path = require('path');
const cookiePath = path.join(__dirname, '../../config/jobs/juejin_cookies.properties');

const url =
    "https://api.juejin.cn/growth_api/v1/check_in?aid=2608&uuid=7072164724640679464&_signature=_02B4Z6wo00101DajqqwAAIDBValqxX1nong2p64AAG9ATYIItYrZnhTOP0KbKktJKDmbilljvsstFvP.5Fei9BPnIk5zvbdAbAI9NAT61cAIvMbmUTru0F6xdcawNzj54DvN5YpXEmu6WYA.f7";
const moment = require("moment");
var CronJob = require("cron").CronJob;

const juejinJob = new CronJob("0 3 8 * * *", async function () {
    console.log("开始掘金签到  ：" + moment().format("YYYY-MM-DD hh:mm:ss"));
    const result = await juejin();

    console.log("掘金签到结束:%s", moment().format("YYYY-MM-DD hh:mm:ss"));
});

async function juejin() {
    const cc = getCookie(cookiePath);


    try {
        console.log("开始掘金签到~~~")
        const { body } = await got.post(url , {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
                Referer: "https://api.juejin.cn",
                "X-Requested-With": "XMLHttpRequest",
                Accept: "*/*",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                Connection: "keep-alive",
                Host: "api.juejin.cn",
                Cookie:cc
            },
        });

        if (body) {
            console.log(JSON.parse(body));
            console.log(JSON.parse(body));
            console.log("结束掘金签到~~~")
        }
    } catch (ex) {
        console.log(ex.message);
        console.log("掘金签到失败！！！")
    }
}




// console.log('服务器启动中=====  ：'+moment().format("YYYY-MM-DD hh:mm:ss"));
// job.start();
// console.log('服务器启动完成=====  ：'+moment().format("YYYY-MM-DD hh:mm:ss"));

module.exports = juejinJob