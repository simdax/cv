var express = require('express');
var router = express.Router();

const dirToJson = require('dir-to-json');
var files;
const fs = require('fs');
const md = require('node-markdown').Markdown;

var root =  "textes/redemption/blabla/"; 
var files;
var my;

// callback Func
var parse=function(dossier){
  var container=[];
  for (var i = 0; i < dossier.children.length; i++) {
    var elem =  dossier.children[i];
    var regexp = /[a-zA-Z0-9]+.md$/;
    if(elem.type == 'directory') 
      {
        container.push(parse(elem))
      }; 
    if(elem.name.match(regexp))
      {
//        console.log(elem.path);
        var content=fs.readFileSync(root+elem.path);
//        console.log(content);
        container.push(md(content.toString()));
      }
  }
  return container;
};

dirToJson( root , function( err, dirTree ){
    if( err ){
      throw err;
    }else{
      files = dirTree;
      my=parse(files);
//      console.log(my);
    }
});


router.get('/', function(req, res, next) {
  res.render('index', {histoire:my})
});

module.exports = router;


