const request = require('request')


const objectSearch = function( objeto, callback ) {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + objeto
    request({ url, json: true }, function(error, response ) {
      if (error) {
        callback('Service unavailable', undefined)
      } else if ( response.body.Response == 'False' ) {
        callback(response.body.Error, undefined)
      } else  if (response.body.total == "0"){
        callback('No se encontro un objeto relacionado', undefined)
      }
      else {
        const data = response.body.objectIDs[0]
   
        callback(undefined, data)
      }
    })
  }


  const objectSearch2 = function( objetoID, callback ) {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objetoID
    request({ url, json: true }, function(error, response ) {
      if (error) {
        callback('Service unavailable', undefined)
      } else if ( response.body.Response == 'False' ) {
        callback(response.body.Error, undefined)
      } else  if (response.body.total == "0"){
        callback('No se encontro un objeto relacionado con ese id', undefined)
      }
      else {
        const data = {
            artist : response.body.constituents[0].name,
            title: response.body.title,
            year: response.body.objectEndDate,
            technique: response.body.medium,
            metUrl: response.body.objectURL
          }
   
        callback(undefined, data)
      }
    })
  }
  module.exports = {
    objectSearch: objectSearch,
    objectSearch2: objectSearch2
  }
  

