
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const cookiePath = path.join(__dirname, 'cookies.properties');


const getCookie = ()=>{
    const jjCookie = fs.readFileSync(cookiePath).toString();
    console.log("cookies path ===={}",cookiePath);
    console.log("掘金cookies === {}",jjCookie);
   return  jjCookie;
   
}

module.exports = getCookie

