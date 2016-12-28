'use strict';
let express = require('express');
let db;
const MongoClient = require('mongodb').MongoClient
var ObjectID = require("mongodb").ObjectID;

let app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'})); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/elaborazione',function(req,res){
    db.collection('elaborazione').find().toArray(function(err,items){
        if(err) throw err;
        res.send(items);
    })
})
app.get('/elaborazione/:id',function(req,res){
    db.collection('elaborazione').find({_id:ObjectID(req.params.id)}).sort({'elaborazione.file':1}).toArray(
        function(err,items){
            if(err) throw err;
            res.send(items[0]);
        })
})
app.post('/elaborazione',function(req,res){
    var data_ora = new Date();
    var elaborazione = req.body.elaborazione;
    if(!elaborazione){
        res.send("Errore! Campi mancanti!");
    }
    else{
    db.collection('elaborazione').insertOne({
        data_ora:data_ora,elaborazione:elaborazione
    },function(err){
           if(err) throw err;
               res.send("File xml salvato con successo");

       })
    }
})
app.get('/file_xml',function(req,res){
   db.collection('file_xml').find().toArray(function(err, items) {
        if(err) throw err;
        res.send(items);
      });
});
app.get('/file_xml/:id',function(req,res){
        db.collection('file_xml').find({_id: ObjectID(req.params.id)}).toArray(function(err,items){
            if(err) throw err;
            res.send(items[0]);
        })

})
app.post('/file_xml',function(req,res){
    let nome_file = req.body.nome_file;
    let testo = req.body.testo;
    console.log(req.body);
    if(!nome_file || !testo){
        res.send("errore!");
    }
    else{
       db.collection('file_xml').insertOne( {
           "nome_file":nome_file,
           "testo":testo
       },function(err){
           if(err) throw err;
               res.send("File xml salvato con successo");

       })
    }
})
MongoClient.connect('mongodb://prova:prova@ds127878.mlab.com:27878/filexml', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('listening on 3000')
  })
})
