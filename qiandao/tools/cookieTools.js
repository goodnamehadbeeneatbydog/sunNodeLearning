/*
 * @Author: liang.sun 44958918@qq.com
 * @Date: 2022-06-28 14:59:17
 * @LastEditors: liang.sun 44958918@qq.com
 * @LastEditTime: 2022-06-28 15:39:24
 * @FilePath: \sunNodeLearning\qiandao\tools\cookieTools.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const readline = require('readline');
const fs = require('fs');





const getCookie = (path)=>{
    const jjCookie = fs.readFileSync(path).toString();
    console.log("cookies path ===={}",path);
    console.log("掘金cookies === {}",jjCookie);
   return  jjCookie;
   
}

module.exports = getCookie

