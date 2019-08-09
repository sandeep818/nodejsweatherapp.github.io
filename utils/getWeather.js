const request = require('request');
const getWeather= function (latitude,longitude,callback){
    const weatherUrl= "https://api.darksky.net/forecast/b7578f0e12edc05de6ea0824dde7ea87/"+latitude+","+longitude+"?units=si";
request({url:weatherUrl,json:true},(error,Response)=>{
const summary=Response.body.currently.summary;
const temp=Response.body.currently.temperature;

callback(summary,temp);

});
}
module.exports=getWeather;