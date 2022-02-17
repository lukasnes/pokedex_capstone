require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const axios = require('axios')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})


app.get('/', (req,res) => {
  rollbar.log('Hello world!')
  console.log('Hello world!')
  res.sendFile(path.join(__dirname, '../public/home.html'))
})

app.get('/api/:pokemon', (req,res) => {
  console.log('hit')
  const { pokemon } = req.params
  console.log(pokemon)
  let pokemonInfo;
  axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      .then(response => {
        console.log(response)
        pokemonInfo = response.data
        res.status(200).send(pokemonInfo)
      })
      .catch(err => {
        console.log(err)
        res.status(400).send(err)
      })
})



const port = process.env.PORT || process.env.SERVER_PORT

app.listen(port, () => console.log(`Server running on ${port}`))