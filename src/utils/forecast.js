const request = require('postman-request')

const forecast = (lat, lon, callback) => {


    //http://api.weatherstack.com/current?access_key=723598e47f8fc0f93674164aea81e243&query=44.3525,-75.3466
    const weather_key = '723598e47f8fc0f93674164aea81e243'
    const url = `http://api.weatherstack.com/current?access_key=${weather_key}&query=${lat},${lon}`
    //console.log(url)
    
    request({ url, json: true}, (error, {body} = {}) => {

        if (error) {
            callback('Unable to connect to location services', undefined)  // Error sent back to caller
        } else if (body.error) {
            callback('Unable to find location, try another search', undefined)
        } else {

            const { weather_descriptions, temperature, feelslike } = body.current
            callback(undefined, `Description: ${weather_descriptions}, Temperature: ${temperature} degrees C, Feels like: ${feelslike} degrees C`, {
                location: body.location.name,
                weater_desc: weather_descriptions,
                temp: temperature,
                feelslike: feelslike
            })
        }
    })
}


module.exports = forecast