const express = require('express');
const app = express();
const met = require('./met.js')
const port = process.env.PORT || 3000;

app.get('/student/:id', function(req, res) {
    if( req.params.id != "A01193455" ) {
        return res.send({
          error: 'Error: Invalid ID',
        })
    }
    return res.send({
        "id": req.params.id,
        "fullname": "Patricio Gutierrez",
        "nickname": "Pato",
        "age": "22"
    })
});

app.get('/met', function(req, res) {
    if( !req.query.search ) {
        return res.send({
        error: 'Error: No search param.',
        })
    }

    met.objectSearch(req.query.search, function(error, response) {
        if(error) {
          return res.send({
            error: error
          })
        }
        const objectId = response
        met.objectSearch2(objectId, function(error,response){
            if(error) {
                return res.send({
                  error: error
                })
            }
            return res.send({
                "searchtearm": req.query.search,
                artist : response.artist,
                title: response.title,
                year: response.year,
                technique: response.technique,
                metUrl: response.metUrl

   
           })

        })
      })
});

app.get('*', function(req, res) {
    res.send({
      error: 'Esta ruta no existe'
    })
});
  

app.listen(port, () => {
    console.log('listening on port 3000')
  });