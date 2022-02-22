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
const { response } = require('express')
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
  spritesArrIndex = 0
  let pokemonInfo;
  axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
      .then(response => {
        console.log(response.data)
        pokemonInfo = response.data
        const { back_default,back_female,back_shiny,back_shiny_female,front_default,front_female,front_shiny,front_shiny_female } = pokemonInfo.sprites
        pokeSprite.push(front_default,front_shiny,back_default,back_shiny,front_female,front_shiny_female,back_female,back_shiny_female)
        axios
          .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
          .then(response => {
            pokemonInfo.species = response.data
            res.status(200).send(pokemonInfo)
          })
          .catch(err => console.log(err))
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

let flavorText = []
let flavorTextIndex = 0
app.get('/api/move/:move',(req,res) => {
  const { move } = req.params
  flavorText = []
  flavorTextIndex = 0
  rollbar.log(`A user tried to get info on ${move}`)
  let moveInfo;
  axios
      .get(`https://pokeapi.co/api/v2/move/${move}/`)
      .then(response => {
        moveInfo = response.data
        const { flavor_text_entries } = moveInfo
        for(i = 0; i < flavor_text_entries.length; i++){
          let entry = flavor_text_entries[i]
          const { language } = entry
          const { name } = language
          if(name == 'en'){
            flavorText.push(entry)
          }
        }
        moveInfo.flavor_text_entries = flavorText[0]
        res.status(200).send(moveInfo)
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

app.get('/api/spriteDown',(req,res) => {
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

app.get('/api/flavorUp',(req,res) => {
  flavorTextIndex++
  if(flavorTextIndex >= flavorText.length){
    flavorTextIndex = 0
  }
  res.status(200).send(flavorText[flavorTextIndex])
})

app.get('/api/flavorDown',(req,res) => {
  flavorTextIndex--
  if(flavorTextIndex < 0){
    flavorTextIndex = flavorText.length - 1
  }
  res.status(200).send(flavorText[flavorTextIndex])
})
let evoArr = []
let evoNames = []
let multiEvoNames = []
app.get('/api/species/:species', async(req,res) => {
  const { species } = req.params
  console.log(species)
  evoNames = []
  multiEvoNames = []
  evoArr = []
  axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${species}/`)
    .then(response => {
      let speciesInfo = response.data
      let evo = speciesInfo.evolution_chain
      axios
        .get(`${evo.url}`)
        .then(response => {
          speciesInfo.evolution_chain = response.data
          const { chain } = speciesInfo.evolution_chain
          evoNames.push(chain.species.name)
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}/`)
            .then(response => {
              let evo1 = response.data
              evoArr.push(evo1.sprites.front_default)
              if(chain.evolves_to.length == 1){
                let evoChain2 = chain.evolves_to[0]
                evoNames.push(evoChain2.species.name)
                axios
                .get(`https://pokeapi.co/api/v2/pokemon/${evoChain2.species.name}/`)
                .then(response => {
                  let evo2 = response.data
                  evoArr.push(evo2.sprites.front_default)
                  if(evoChain2.evolves_to.length == 1){
                    let evoChain3 = evoChain2.evolves_to[0]
                    evoNames.push(evoChain3.species.name)
                    axios
                      .get(`https://pokeapi.co/api/v2/pokemon/${evoChain3.species.name}`)
                      .then(response => {
                        let evo3 = response.data
                        evoArr.push(evo3.sprites.front_default)
                        speciesInfo.evolution_chain = {evoArr,evoNames}
                        res.status(200).send(speciesInfo)
                      })
                  } else if (evoChain2.evolves_to.length > 1){
                    multiEvoNames = []
                    let evolveArr = evoChain2.evolves_to
                    evolveArr.forEach((el) => {
                      multiEvoNames.push(el.species.name)
                    })
                    console.log(multiEvoNames)
                    for(i = 0; i < multiEvoNames.length; i++) {
                      axios
                        .get(`https://pokeapi.co/api/v2/pokemon/${multiEvoNames[i]}`)
                        .then(response => {
                          let evoMulti = response.data
                          evoArr.push(evoMulti.sprites.front_default)
                          evoNames.push(evoMulti.name)
                          if(evoArr.length == 4){
                            speciesInfo.evolution_chain = {evoArr,evoNames}
                            console.log(evoArr)
                            res.status(200).send(speciesInfo)
                          }
                        })
                    }
                  } else {
                      speciesInfo.evolution_chain = {evoArr,evoNames}
                      res.status(200).send(speciesInfo)
                  }
                })
              } else if(chain.evolves_to.length > 1){
                  multiEvoNames = []
                  let evolveArr = chain.evolves_to
                  evolveArr.forEach((el) => {
                    multiEvoNames.push(el.species.name)
                  })
                  for(i = 0; i < multiEvoNames.length; i++) {
                    axios
                      .get(`https://pokeapi.co/api/v2/pokemon/${multiEvoNames[i]}`)
                      .then(response => {
                        let evoMulti = response.data
                        evoArr.push(evoMulti.sprites.front_default)
                        evoNames.push(evoMulti.name)
                        if(evoArr.length == evolveArr.length + 1){
                          speciesInfo.evolution_chain = {evoArr,evoNames}
                          res.status(200).send(speciesInfo)
                        }
                      })
                  }
              } else {
                  speciesInfo.evolution_chain = {evoArr,evoNames}
                  res.status(200).send(speciesInfo)
              }
            })
        })
    })
})

app.get('/api/egg/:egg',(req,res) => {
  const { egg } = req.params
  console.log(egg)
  axios
    .get(`https://pokeapi.co/api/v2/egg-group/${egg}/`)
    .then(response => {
      res.status(200).send(response.data)
    })
})

app.get('/api/types/:type',(req,res) => {
  const { type } = req.params
  axios
    .get(`https://pokeapi.co/api/v2/type/${type}/`)
    .then(response => {
      res.status(200).send(response.data)
    })
})

const port = process.env.PORT || process.env.SERVER_PORT

app.listen(port, () => console.log(`Server running on ${port}`))