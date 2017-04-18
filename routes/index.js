var express = require('express');
var router = express.Router();

const dirToJson = require('dir-to-json');
var files;
const fs = require('fs');
const md = require('node-markdown').Markdown;

var root =  "textes/redemption/blabla/4/"; 
var files;
var my;
const regexp = /[a-zA-Z0-9]+.md$/;

// callback Func
var parse=function(dossier){
  var container=[];
  for (var i = 0; i < dossier.children.length; i++) {
    var elem =  dossier.children[i];
    if(elem.type == 'directory') 
      {
        container.push(parse(elem))
      }; 
    if(elem.name.match(regexp))
      {
        var content=fs.readFileSync(root+elem.path);
        // console.log(content.toString());
        // container.push(content.toString());
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
      my = parse(files);
      console.log('cuo');
      for (var i = 0; i < my.length; i++) {
         console.log(my[i])
       }
    }
});


router.get('/', function(req, res, next) {
  res.render('index', {histoire:my})
});

module.exports = router;


