var express     =   require("express");
var multer      =   require('multer');
var app         =   express();
var fs          = require("fs");
var file;
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var markerController = require('./markers/controller');

app.use(bodyParser.json());
app.use(cors());

var url = 'mongodb://root:123456@ds021999.mlab.com:21999/dengueemfoco';
mongoose.connect(url);
//INICIO armazenamento da imagem
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public');
  },
  filename: function (req, file, callback) {
    file = file.fieldname + '-' + Date.now()+'.jpg'
    callback(null, file);
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

app.post('/api/photo',function(req,res){


    upload(req,res,function(err) {

        if(err) {
            return res.end("Error uploading file." + err);
        }
        res.end("File: "+ req.file.filename +" is uploaded");
        markerController.inserir(res);

        //console.log("chamando o inserir do controller");
        //chamarController(req,res);
        //console.log(req);
    });
});
//FIM armazenamento da imagem
app.post('/api/photoLocation',function(req,res){
    console.log(res);
});

app.get('/api/markers/listar', markerController.listar);

app.post('/api/markers/inserir', chamarController);
function chamarController(req,res,obj){
  console.log('chamou controller');

}

//app.get('/api/markers/inserir', markerController.inserir);
app.get('/api/markers/localizarProximo/:lat/:lng', markerController.localizarProximo);

app.listen(process.env.PORT || 3000,function(){
    console.log("Working on port 3000");
});

function readFile(){
    fs.readFile( __dirname + "../../" + "markers.json", 'utf8', function (err, data) {
       if(data != null) {
            res.status(200).json( data );
       } else {
           console.log( err );
       }
   });
}
