



// fetch is for BROWSER, not nodejs


const weatherForm = document.querySelector('#search-location')
const myLocation = document.querySelector('#current-location')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = 'from JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    var location = searchElement.value

    const url = `/weather?address=${location}`

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

myLocation.addEventListener('click', (e) => {
    e.preventDefault()

    navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        const url = `/my_location?longitude=${pos.longitude}&latitude=${pos.latitude}`

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
    
        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageTwo.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })

    })


})

