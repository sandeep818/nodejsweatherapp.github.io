const request = require('request');


const giocode = (address,callback)=>{
    
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoic2FuZGVlcDgxOCIsImEiOiJjanl2anYwMHEwb2FmM2xuNGxpaTEyeHhqIn0.9Vr4LzmRx4IN2kX68Aucng";

    request({url:url, json:true},(error,responce)=>{
       
        if(error){
            callback('Cnnection failed',undefined)
        }
        else if (responce.body.features.length == 0){
            callback({error:'unable to find location ! PLEASE CORRECT THE ADDRESS'},undefined);
        }else{
            callback(undefined,{
                longitude : responce.body.features[0].center[0],
                latitude : responce.body.features[0].center[1],
                Address: responce.body.features[0].place_name,
            });
           
            
        }
    })
 
}

module.exports=giocode;
            