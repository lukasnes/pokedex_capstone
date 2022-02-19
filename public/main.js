const menuBtn = document.querySelector('[data-menu-btn]')
const sidebar = document.querySelector('[data-sidebar]')
const dexScreen = document.querySelector('[data-dex-screen]')
const screen = document.querySelector('.dex-screen')


menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open')
})

const clearDex = () => {
    const screen = document.querySelector('.dex-screen')
    screen.innerHTML = '<img src="./pictures/dex_screen-on.png" id="dex-screen" data-dex-screen>'
}

const abilityDetails = (evt) => {
    evt.preventDefault()
    let ability = evt.target.textContent.toLowerCase()
    const details = document.createElement('div')
    details.classList = 'details'
    screen.appendChild(details)
    axios
        .get(`http://localhost:4000/api/ability/${ability}`)
        .then(res => {
            const { effect_entries,generation } = res.data
            const abilityEffect = document.createElement('p')
            let genName = generation.name
            genName = genName.charAt(0).toUpperCase() + genName.slice(1)
            abilityEffect.textContent = `${evt.target.textContent} effect:`
            abilityEffect.classList = 'ability-effect'
            details.appendChild(abilityEffect)

            let effects = effect_entries[1]

            const effect = document.createElement('p')
            effect.textContent = effects.effect
            abilityEffect.appendChild(effect)

            const abilityShortEffect = document.createElement('p')
            abilityShortEffect.textContent = `${evt.target.textContent} short effect:`
            abilityShortEffect.classList = 'ability-short-effect'
            details.appendChild(abilityShortEffect)

            const shortEffect = document.createElement('p')
            shortEffect.textContent = effects.short_effect
            abilityShortEffect.appendChild(shortEffect)

            const generationText = document.createElement('p')
            generationText.textContent = `This ability first appeared in ${genName}`
            generationText.classList = 'generation'
            details.appendChild(generationText)
        })
        .catch(err => console.log(err))
}


const getPokemon = (evt) => {
    evt.preventDefault()
    clearDex()
    let pokemon = document.querySelector('#dex-input').value
    pokemon = pokemon.toLowerCase().trim()
    axios
        .get(`http://localhost:4000/api/pokemon/${pokemon}`)
        .then(res => {
            const { abilities,moves,name,order,species,sprites,stats,types } = res.data
            console.log(res.data)
            const { front_default } = sprites


            const pokeName = document.createElement('div')
            pokeName.classList = 'poke-name'
            let currName = name.charAt(0).toUpperCase() + name.slice(1)
            pokeName.textContent = currName
            screen.appendChild(pokeName)


            const orderNum = document.createElement('p')
            orderNum.classList = 'order-num'
            const orderNumText = document.createElement('span')
            orderNumText.textContent = `#${order}`
            orderNumText.classList = 'order-num-text'
            orderNum.appendChild(orderNumText)
            screen.appendChild(orderNum)

            
            const abilityText = document.createElement('ul')
            abilityText.textContent = 'Abilities:'
            abilityText.classList = 'ability'
            screen.appendChild(abilityText)
            let abilityCountArr = []
            let abilityArr = []
            for(i = 0; i < abilities.length; i++){
                abilityCountArr.push(abilities[i])
            }
            abilityCountArr.forEach((el) => {
                abilityArr.push(el.ability)
            })
            abilityArr.forEach((el) => {
                let ability = el.name
                ability = ability.charAt(0).toUpperCase() + ability.slice(1)
                const abilityName = document.createElement('li')
                abilityName.textContent = ability
                abilityName.classList = 'abilityName'
                abilityText.appendChild(abilityName)
                abilityName.addEventListener('mouseover',abilityDetails)
            })
            
            
            const spriteDisplay = document.createElement('img')
            spriteDisplay.classList = 'sprite'
            spriteDisplay.src = front_default
            const changeSpriteUp = (evt) => {
                evt.preventDefault()
                axios
                    .get('http://localhost:4000/api/spriteUp')
                    .then(res => {
                        console.log(res)
                        spriteDisplay.src = res.data
                    })
            }
            const changeSpriteDown = (evt) => {
                evt.preventDefault()
                axios
                    .get('http://localhost:4000/api/spriteDown')
                    .then(res => {
                        spriteDisplay.src = res.data
                    })
            }
            screen.appendChild(spriteDisplay)
            const spriteDisplayPlus = document.createElement('button')
            const spriteDisplayMinus = document.createElement('button')
            spriteDisplayPlus.classList = 'backBtn'
            spriteDisplayMinus.classList = 'forwardBtn'
            spriteDisplayPlus.style.backgroundImage = "url(./pictures/arrow_right.png)"
            spriteDisplayMinus.style.backgroundImage = 'url(./pictures/arrow_left.png)'
            screen.appendChild(spriteDisplayMinus)
            screen.appendChild(spriteDisplayPlus)
            spriteDisplayMinus.addEventListener('click', changeSpriteDown)
            spriteDisplayPlus.addEventListener('click',changeSpriteUp)
        })
        .catch(err => console.log(err))
    }
    
    const changeDex = (evt) => {
        evt.preventDefault()
        dexScreen.src = './pictures/dex_screen-on.png'
    }
    
    
    document.querySelector('.dex-req').addEventListener('submit',getPokemon)
    document.querySelector('.dex-req').addEventListener('submit',changeDex)

    