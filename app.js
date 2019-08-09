const path = require('path');
const express = require('express');
const app =express();
const hbs = require('hbs');
const giocode = require('./utils/jiocode');
const getWeather = require('./utils/getWeather.js');
const port =process.env.PORT || 3000;
//define paths for express config
const publicDirectoryPath = path.join(__dirname,'./public');
const viewsPath = path.join(__dirname,'./templates/views');
const partialPath = path.join(__dirname,'./templates/partials');

//setup handlbars engine and views location

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get('', (req,res)=>{
    res.render('index',{
        name:'Know Your Weather',
        title:'Node.js'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        name:'About',
        title:'Node.js'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
       return res.send('please provide address !')
    }else{


        giocode(req.query.address,(error,{longitude,latitude,Address}={})=>{
            console.log('error: '+error);
            if(error){
                return res.send(error);
            }
           

          
            getWeather(latitude,longitude,(summary,temp,wind)=>{
                console.log(summary + " &  the tempreture is: "+temp+"-Dig.");
               
                        res.send({
                    location:Address,
                    summary:summary,
                    temp:temp,
                    wind,
                })
                
            })
        });
    }
    
})
//error handler if page not exist
app.get('/about/*', (req,res)=>{
    res.render('404',{
        name:'401-Error',
        title:'No more about article '
    })
    })
    
app.get('*', (req,res)=>{
res.render('404',{
    name:'404-Error',
    title:'Page not Found....!'
})
})


app.listen(port,()=>{
    console.log('server runing '+port)
})