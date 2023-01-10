const stocks=require('./stocks') 
const got = require('got')
const fhurl ="http://f10.eastmoney.com/BonusFinancing/PageAjax?code="
const priceurl ="http://hq.sinajs.cn/list="
const notify_url = "http://www.pushplus.plus/send"
const moment = require('moment')
var CronJob = require('cron').CronJob;

var job = new CronJob('35 15 15 * * *', async function() {
    console.log('开始收集分红数据  ：'+moment().format('YYYY-MM-DD hh:mm:ss'));
    const result = await stockFh(4);

    console.log('共收集到分红数据%d条：%s',result.length,moment().format('YYYY-MM-DD hh:mm:ss'));
})
console.log('服务器启动中=====  ：'+moment().format('YYYY-MM-DD hh:mm:ss'));
job.start();
console.log('服务器启动完成=====  ：'+moment().format('YYYY-MM-DD hh:mm:ss'));


async function stockFh(fhrate){
    const now = moment();
    now.hour(0);
    now.minute(0);
    now.second(0);
    const year = now.year();
    const month = now.month();
    const day = now.day();
    let fhStocks = [];
    for(i=0;i<stocks.length;i++){
        try{
            const {body} = await got.post(fhurl+stocks[i].coden,{
                headers:{
                    'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' ,
                    'Accept-Encoding': 'gzip, deflate'  ,
                    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6',
                    'Referer': 'http://f10.eastmoney.com/f10_v2/BonusFinancing.aspx?code='+stocks[i].coden.toLowerCase(),
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': '*/*',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Connection': 'keep-alive',
                    'Host': 'f10.eastmoney.com',
                    'Cookie': 'em_hq_fls=js; qgqp_b_id=6c5a857a8a965171d395c6d0c9c914d0; st_si=06658933420553; intellpositionL=1522.39px; st_asi=delete; intellpositionT=2368px; EMFUND1=null; EMFUND2=null; EMFUND3=null; EMFUND4=null; EMFUND5=null; EMFUND6=null; EMFUND7=null; EMFUND8=null; EMFUND0=null; EMFUND9=06-29 10:28:04@#$%u6613%u65B9%u8FBE%u6CAA%u6DF1300%u533B%u836FETF@%23%24512010; cowCookie=true; HAList=a-sz-000002-%u4E07%20%20%u79D1%uFF21%2Ca-sh-601398-%u5DE5%u5546%u94F6%u884C%2Ca-sz-300614-C%u767E%u5DDD%2Ca-sz-002426-%u80DC%u5229%u7CBE%u5BC6%2Ca-sh-601127-%u5C0F%u5EB7%u80A1%u4EFD; Hm_lvt_f5b8577eb864c9edb45975f456f5dc27=1625450232,1625461068; st_pvi=75830725222500; st_sp=2021-04-28%2011%3A29%3A59; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Flink; st_sn=452; st_psi=20210705154011881-113301310291-9429488402; Hm_lpvt_f5b8577eb864c9edb45975f456f5dc27=1625470822'
                }
            });
            
            if(body){
                fhObj = JSON.parse(body)
                // console.log(fhObj);

                //股权登记日期
                const djrq = fhObj.fhyx[0] &&fhObj.fhyx[0].EQUITY_RECORD_DATE?fhObj.fhyx[0].EQUITY_RECORD_DATE : '';
                
                /**
                if(!djrq || moment(djrq) < now){
                    continue;
                }
                 */
                //股票代码
                const code = fhObj.fhyx[0].SECUCODE;
                //公共日期
                const nrq = formatDate(fhObj.fhyx[0].NOTICE_DATE);
                //股票名称
                const name = fhObj.fhyx[0].SECURITY_NAME_ABBR;
                
                //分红日期
                const fhrq = formatDate(fhObj.fhyx[0].EX_DIVIDEND_DATE);
                //现金到账日期
                const payrq = formatDate(fhObj.fhyx[0].PAY_CASH_DATE);
                //分红方案
                const fhfa = fhObj.fhyx[0].IMPL_PLAN_PROFILE;
                
                const fhLists = fhfa.match(/[0-9]+(\.?[0-9]+)?/g);

                const cpr = await getCurrentPrice(stocks[i].coden.toLowerCase());

                let fhbl = 0;
                if(fhLists && fhLists.length>1){
                    const sgs = fhLists[0];
                    const psv = fhLists[1];
                    fhbl = (parseFloat(psv)*100/(parseFloat(cpr)*parseFloat(sgs))).toFixed(2)
                    
                }
                //分红比例小于fhrate的直接过滤
                if(fhbl < fhrate)
                    continue;

                const stock ={'股票代码':code,'股票名称':name,'公告日期':nrq,'登记日期':formatDate(djrq),
                '分红日期':fhrq,'到账日期':payrq,'分红方案':fhfa,'当前价格':cpr,'分红率':fhbl}

                fhStocks.push(stock);

                // console.log(fhObj.fhyx[0])
                console.log('code:%s,name:%s,股权登记日:%s,分红日:%s,分红到账日期:%s,分红方案:%s,当前最近一日收盘价格:%s,分红收益率:%s',
                code,name,djrq,fhrq,payrq,fhfa,cpr,fhbl)
            }

        // s1 = moment("2021-07-01 00:00:00","YYYY-MM-DD hh:mm:ss");
        // s2 = moment("2020-07-01 00:00:00","YYYY-MM-DD hh:mm:ss")
        // console.log(`${s1.year()}:${s1.month()+1}:${s1.day()+1}`)
        }catch(ex){
            console.log(ex.message);
            continue;
        }
    }
    
    fhStocks.sort((a,b)=>{
        return moment(a.djrq) > moment(b.djrq)
    });
    sendNotify(JSON.stringify(fhStocks));   
    return fhStocks;
};

function formatDate(datestr){
    const result = moment(datestr);
    return result.isValid() ? result.format('YYYY-MM-DD') : ''
}
async function sendNotify(content){
    const json = {
        "token":'2fe0f9092fde4e9abfe8f080d97199d9',
        "title":'分红日历',
        "content":content,
        "template":'json'
	};
    const {body} = await got.post(notify_url,{json});
    // console.log(body);
}
async function getCurrentPrice(code){
    const {body} = await got.post(priceurl+code.toLowerCase());
    if(body){
        let v = body.split('"');
        // console.log(v);
        if(v[1]){
            stockV = v[1].split(",");
            if(stockV[3]) return stockV[3]
        }
    }
    
    return '';
    
}
// test(4);

// console.log(formatDate("this not date"))
// getCurrentPrice("sh601688")


// (async ()=>{
    

// })()

