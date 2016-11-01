var express = require('express');
var router = express.Router();
var carData;
var key = "vw6nkmg569pxh9fx5csem29b";
var request = require('request');
var parsedObject = '';


router.get('/result', function(req, res, next) {
  res.send('this is the import cost api');
});



//Return result data for main form
router.get('/result/:make/:model/:year/:importorigin/:importdestination/:currency/:price/:freightcost/:importdutycost/:roadlegalcost', function(req, res, next) {
  var styleId = "https://api.edmunds.com/api/vehicle/v2/" + req.params.make + "/" + req.params.model +"/" + req.params.year + "/styles?fmt=json&api_key=" + key;
  //Set header response to JSON (pretty sure res.json automatically does this for us though..)
  res.setHeader('Content-Type', 'application/json');
  carData = new Array(req.params.make, req.params.model, req.params.year, req.params.importorigin, req.params.importdestination,
      req.params.currency, req.params.price, req.params.freightcost, req.params.importdutycost, req.params.roadlegalcost);
        request.get(styleId, function(err, response, body) {
            if (!err && response.statusCode == 200) {
                var locals = JSON.parse(body);
                for(var keys in locals) {
                  for(var o in keys){
                    for(var j in keys[o]) {
                        parsedObject += 'Index is: ' + keys + '\nDescription is: ' + o[j] + '\n---------------------------\n';
                    }

                  }

                  }



                res.send(body + '\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n' + parsedObject);
                }

        });

});



module.exports = router;
