const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/'${encodeURIComponent(address)}'.json?access_token=pk.eyJ1IjoiYWxsYXJsIiwiYSI6ImNrZmw0cTg2ODA5d2wycm10ZThkdzIyNWoifQ.YgCXqUYvvAdeCuV-BHzSFg&limit=1`
    //console.log(url)
    request({ url, json: true}, (error, {body} = {}) => { // destructured response.body to body
        if (error) {
            callback('Unable to connect to location services', undefined)  // Error sent back to caller
        } else if (body.message) {
            callback('Unable to find location, try another search', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            
            callback(undefined, {
                longitude,
                latitude,
                location
            })
        }
    })
}



module.exports = geocode