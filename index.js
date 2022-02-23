// const schedule = require('node-schedule');
//
// const job = schedule.scheduleJob('1 * * * * * ', function(){
//     console.log('The answer to life, the universe, and everything!');
// });
const request = require('request');
var id_group = -533554248;
var offset = 100;
var token = "1726806689:AAGa2K8uczDBdZxvDJaL9uKCPINNMpIsjIA";
var domainTele = "https://api.telegram.org/bot";
var proxyUrl = "http://10.61.11.42:3128";
var proxiedRequest = request.defaults({'proxy': proxyUrl});
var update_id;
var options = {
    method: "GET",
    url: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
};
setInterval(()=>{
    var optionsTelegram = {
        method: "GET",
        url: domainTele +token+"/getUpdates?offset=" + offset
    };
    proxiedRequest(optionsTelegram, function (err, res, data) {
        data = JSON.parse(data);
        offset = data.result[data.result.length - 1].update_id;
        message = data.result[data.result.length - 1].message.text;
        var optionsCoin = {
            method: "GET",
            url: "https://api.binance.com/api/v3/ticker/price?symbol="+message.split("/")[1].split("@")[0].toUpperCase()+"USDT",
        };
        if (update_id != offset) {
            update_id = offset;
            if(message.includes("/")){
                proxiedRequest(optionsCoin, function (err, res, coin) {
                    coin = JSON.parse(coin)
                    var optionsSendTele = {
                        method: "GET",
                        url: domainTele +token+"/sendMessage?chat_id=" + id_group + "&text=Giá " + message.split("/")[1].split("@")[0].toUpperCase() + ": " + coin.price + "$",
                    }
                    proxiedRequest(optionsSendTele, function (err, res, coin) {
                    });
                });
            }
        }
    });
},500)