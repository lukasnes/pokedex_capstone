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
let pokeSprite = []
let spritesArrIndex = 0
app.get('/api/pokemon/:pokemon', (req,res) => {
  const { pokemon } = req.params
  console.log(pokemon)
  pokeSprite = []
  let pokemonInfo;
  axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      .then(response => {
        console.log(response.data)
        pokemonInfo = response.data
        const { back_default,back_female,back_shiny,back_shiny_female,front_default,front_female,front_shiny,front_shiny_female } = pokemonInfo.sprites
        pokeSprite.push(front_default,front_shiny,back_default,back_shiny,front_female,front_shiny_female,back_female,back_shiny_female)
        res.status(200).send(pokemonInfo)
      })
      .catch(err => {
        rollbar.log(err)
        res.status(400).send(err)
      })
})

app.get('/api/ability/:ability',(req,res) => {
    const { ability } = req.params
    rollbar.log(`A user tried to get info on ${ability}`)
    let abilityInfo;
    axios
        .get(`https://pokeapi.co/api/v2/ability/${ability}/`)
        .then(response => {
          abilityInfo = response.data
          res.status(200).send(abilityInfo)
        })
        .catch(err => {
          rollbar.log(err)
          res.status(400).send(err)
        })
})

app.get('/api/spriteUp',(req,res) => {
    spritesArrIndex++
    while(pokeSprite[spritesArrIndex] == null){
      spritesArrIndex++
      if(spritesArrIndex > 7){
        spritesArrIndex = 0
      }
    }
    if(spritesArrIndex > 7){
      spritesArrIndex = 0
    }
    res.status(200).send(pokeSprite[spritesArrIndex])
})

app.get('/api/spriteUp',(req,res) => {
  spritesArrIndex--
  while(pokeSprite[spritesArrIndex] == null){
    spritesArrIndex--
    if(spritesArrIndex < 0){
      spritesArrIndex = 7
    }
  }
  if(spritesArrIndex < 0){
    spritesArrIndex = 7
  }
  res.status(200).send(pokeSprite[spritesArrIndex])
})



const port = process.env.PORT || process.env.SERVER_PORT

app.listen(port, () => console.log(`Server running on ${port}`))