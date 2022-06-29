/*
 * @Author: liang.sun 44958918@qq.com
 * @Date: 2022-05-26 09:24:51
 * @LastEditors: liang.sun 44958918@qq.com
 * @LastEditTime: 2022-06-29 08:43:25
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
    const now = moment();
    const cc = getCookie(cookiePath);
    now.hour(0);
    now.minute(0);
    now.second(0);
    let fhStocks = [];
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
                // Cookie: "MONITOR_WEB_ID=8e3cbfec-01c7-468d-9515-6ac5a4adff98; __tea_cookie_tokens_2608=%7B%22web_id%22%3A%227072164724640679464%22%2C%22user_unique_id%22%3A%227072164724640679464%22%2C%22timestamp%22%3A1646616675304%7D; _ga=GA1.2.1103425885.1646616676; n_mh=9-mIeuD4wZnlYrrOvfzG3MuT6aQmCUtmr8FxV8Kl8xY; _tea_utm_cache_2608={'utm_source':'gold_browser_extension'}; _gid=GA1.2.2091693546.1653707169; passport_csrf_token=66f4fa374ea92755863b86a2cc3bf73c; passport_csrf_token_default=66f4fa374ea92755863b86a2cc3bf73c; sid_guard=98a03525ee0ae2b706851d3840c714a8|1653707189|31536000|Sun,+28-May-2023+03:06:29+GMT; uid_tt=4ad342ea7a00bbfdf98be025386c0080; uid_tt_ss=4ad342ea7a00bbfdf98be025386c0080; sid_tt=98a03525ee0ae2b706851d3840c714a8; sessionid=98a03525ee0ae2b706851d3840c714a8; sessionid_ss=98a03525ee0ae2b706851d3840c714a8; sid_ucp_v1=1.0.0-KGFjZGRhMjg2NGI0ZGQ3OTZmZWFjOWE2NDAxYjFmODhmMGFjNGZkNGMKFgiuraHA_fWhBhC1o8aUBhiwFDgIQAsaAmxmIiA5OGEwMzUyNWVlMGFlMmI3MDY4NTFkMzg0MGM3MTRhOA; ssid_ucp_v1=1.0.0-KGFjZGRhMjg2NGI0ZGQ3OTZmZWFjOWE2NDAxYjFmODhmMGFjNGZkNGMKFgiuraHA_fWhBhC1o8aUBhiwFDgIQAsaAmxmIiA5OGEwMzUyNWVlMGFlMmI3MDY4NTFkMzg0MGM3MTRhOA; _gat=1"
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