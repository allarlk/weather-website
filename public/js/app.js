



// fetch is for BROWSER, not nodejs


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = 'from JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    var location = searchElement.value

    const url = `http://localhost:3000/weather?address=${location}`

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

