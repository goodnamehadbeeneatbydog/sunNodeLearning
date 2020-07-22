var CronJob = require('cron').CronJob;
const https = require('https');
const iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');



var job = new CronJob('* * * * * *', function() {
  console.log('You will see this message every second ：'+(new Date()));

  https.get('https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=jQuery1124014226422499881308_1593579578260&_=1593579578267',
    {headers:
        {
            'Accept':"*/*",
            'Accept-Encoding':'gzip, deflate, br',
            'Accept-Language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6',
            'Connection':'keep-alive',
            'Cookie':'__ckguid=pnU4UXKLHFcwyV3K3R3Oai; device_id=21307064331591195590365947262e9aee02fc0225219c4a2cf23c5d4d; homepage_sug=h; r_sort_type=score; __jsluid_s=362e9aee51e2f96c65fc4569111e79ba; _ga=GA1.2.2146295121.1591195595; wt3_sid=%3B999768690672041; __jsluid_h=bdf8eea7f9ee58f59d05158de13f2aa9; sess=OTA5NGV8MTU5NTc1NTkwMXw5MjE3MDE4Mzg3fDViNTM4ZWUyMzczZDZlMjhhMWVjMGNjMzQyNWQ1MGY4; user=user%3A9217018387%7C9217018387; smzdm_user_source=366957B225B16B3D8FE9C9B6D98FFC9A; smzdm_id=9217018387; shequ_pc_sug=a; Hm_lvt_9b7ac3d38f30fe89ff0b8a0546904e58=1593744730; smzdm_user_view=C04C73DB6388993880D4D399F7986D15; s_his=%E5%86%85%E5%AD%98%2C3700x%2C%E5%89%83%E9%A1%BB%E5%88%80%2C%E5%89%83%E9%A1%BB%E5%88%80%20%E5%90%89%E5%88%97%2C%E5%8C%97%E9%80%9A%E9%98%BF%E4%BF%AE%E7%BD%972%2C%E5%8C%97%E9%80%9A; zdm_qd=%7B%22referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3D_z31bKuRJiBYzDaLqP-Gt2jul8NgimqI_JShVSmAlZmNFE8DY_OWQxGdrvMBiWhR%26wd%3D%26eqid%3Dfa7b1b3a00008ff5000000065f116678%22%2C%22utm_source%22%3A%22chrome%22%2C%22utm_medium%22%3A%22Push%22%2C%22utm_campaign%22%3A%22Tixing%22%7D; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217323490b588d7-0b801103b40698-4353760-2073600-17323490b59ad2%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_utm_source%22%3A%22chrome%22%2C%22%24latest_utm_medium%22%3A%22Push%22%2C%22%24latest_utm_campaign%22%3A%22Tixing%22%7D%2C%22%24device_id%22%3A%2217323490b588d7-0b801103b40698-4353760-2073600-17323490b59ad2%22%7D; _gid=GA1.2.2081795768.1595206458; wt3_eid=%3B999768690672041%7C2159160711300142987%232159530181400497430; smzdm_collection_yuanchuang=70935719; _gat_UA-27058866-1=1; _zdmA.uid=ZDMA.dsWxdpMPb.1595387114.2419200; Hm_lpvt_9b7ac3d38f30fe89ff0b8a0546904e58=1595387114',
            'Host':'zhiyou.smzdm.com',
            'Referer':'https://www.smzdm.com/',
            'Sec-Fetch-Dest':'script',
            'Sec-Fetch-Mode':'no-cors',
            'Sec-Fetch-Site':'same-site',
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    
        }
    },
    function (res){

        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('请求失败\n' +
                            `状态码: ${statusCode}`);
        } 
        if (error) {
            console.error(error.message);
            // 消费响应的数据来释放内存。
            res.resume();
            return;
        }

        // res.setEncoding('GBK');
        let rawData = new BufferHelper();
        console.log(res.headers);

        res.on('data', (chunk) => { rawData.concat(chunk) ; });
        res.on('end', () => {
            try {
            // const parsedData = JSON.parse(rawData);
            console.log(rawData.toString());
            console.log(iconv.decode(rawData.toBuffer(),'utf-8').toString());
            } catch (e) {
            console.error(e.message);
            }
        });
    }
  ).on('error', (e) => {
    console.error(`出现错误: ${e.message}`);
  });

}, null, true, 'Asia/Shanghai');
job.start();