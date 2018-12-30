
const hbs     = require('hbs');
const express = require('express');
const fs      = require('fs');
const port    = process.env.PORT || 3000

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
console.log("Starting");
var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
  var date = new Date().toString();
  var log=`${date} : method : ${req.method}  ${req.url} `+'\n'
    fs.appendFile('server.log', log, (err)=>{
      if(err){
        console.log("File parsing error");
      }
    });
    next();
});


app.get('/',(req,res)=>{
   res.render('about.hbs',{
     pageTitle:'ABOUT'
   });
});

app.get('/index',(req,res)=>{
   res.render('index.hbs',{
     pageTitle:'INDEX'

   })
});

app.get('/content',(req,res)=>{
   res.render('content.hbs',{
     pageTitle:'CONTENT'

   })
});
app.listen(port);
