const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirPath)) // this includes all files included in provided folder (help and about)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Allar Lauk'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Allar Lauk'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is example message for help',
        title: 'Help',
        name: 'Allar Lauk'
    })
})

// app.com - this doesnt do anything when express.static is called
/* app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
}) */

// app.com/about
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { // { ... } = {} is required when error occurs, then other parameters are not defined and program crashse
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            //console.log(location)
            //console.log(forecastData)

            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            })
        })
    })
 
})

app.get('/products', (req,res) => {
    
    if (!req.query.search) {
        return res.send({ //must return so that other res.send doesnt fire
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    
    // res.send CANNOT be sent more than once per req

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('not_found', {
        title: 'Error 404',
        name: 'Allar Lauk',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => { // * means "match everything that hasnt matched so far"
    res.render('not_found', {
        title: 'Error 404',
        name: 'Allar Lauk',
        errorMsg: 'Page not found'
    })

})

//Start server on port 3000
app.listen(port, () => {
    console.log('Server running on port ' + port)
})

