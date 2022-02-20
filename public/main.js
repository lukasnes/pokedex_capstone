const menuBtn = document.querySelector('[data-menu-btn]')
const sidebar = document.querySelector('[data-sidebar]')
const dexScreen = document.querySelector('[data-dex-screen]')
const screen = document.querySelector('.dex-screen')
const bigScreen = document.querySelector('.dex-screen-container')


menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open')
})

const clearDex = () => {
    screen.innerHTML = ''
}

const moveDetails = (evt) => {
    evt.preventDefault()
    let move = evt.target.textContent.toLowerCase()
    const details = document.createElement('div')
    details.classList = 'details'
    bigScreen.appendChild(details)
    axios
        .get(`http://localhost:4000/api/move/${move}`)
        .then(res => {
            console.log(res.data)
            const { accuracy,damage_class,effect_changes,effect_entries,flavor_text_entries,generation,learned_by_pokemon,machines,name,power,pp,stat_changes,type } = res.data

            const moveName = document.createElement('div')
            moveName.classList = 'move-detail-name'
            let mvName = name.charAt(0).toUpperCase() + name.slice(1)
            moveName.textContent = mvName
            details.appendChild(moveName)


            const moveStats = document.createElement('div')
            moveStats.classList = 'move-stats'
            details.appendChild(moveStats)

            const moveStatIcons = document.createElement('div')
            moveStatIcons.classList = 'move-stat-icons'
            moveStats.appendChild(moveStatIcons)
            const acc_img = document.createElement('img')
            acc_img.src = './pictures/acc_symbol.png'
            const pow_img = document.createElement('img')
            pow_img.src = './pictures/pow_symbol.png'
            const pp_img = document.createElement('img')
            pp_img.src = './pictures/pp_symbol.png'
            moveStatIcons.appendChild(acc_img)
            moveStatIcons.appendChild(pow_img)
            moveStatIcons.appendChild(pp_img)

            const moveStatNums = document.createElement('ul')
            moveStatNums.classList = 'move-stat-nums'
            moveStats.appendChild(moveStatNums)
            const acc_num = document.createElement('li')
            if(accuracy == null){
                acc_num.textContent = '--'
            } else {
                acc_num.textContent = accuracy
            }
            const pow_num = document.createElement('li')
            if(power == null){
                pow_num.textContent = '--'
            } else {
                pow_num.textContent = power
            }
            const pp_num = document.createElement('li')
            if(pp == null){
                pp_num.textContent = '--'
            } else {
                pp_num.textContent = pp
            }
            moveStatNums.appendChild(acc_num)
            moveStatNums.appendChild(pow_num)
            moveStatNums.appendChild(pp_num)


            const moveType = document.createElement('div')
            moveType.classList = 'move-type'
            details.appendChild(moveType)
            const type_img = document.createElement('img')
            type_img.src = `./pictures/${type.name}_type.png`
            moveType.appendChild(type_img)
            const moveTypeText = document.createElement('p')
            moveTypeText.classList = 'move-type-text'
            let moveTypeName = type.name
            moveTypeName = moveTypeName.charAt(0).toUpperCase() + moveTypeName.slice(1)
            moveTypeText.textContent = moveTypeName
            moveType.appendChild(moveTypeText)
        })
        .catch(err => console.log(err))
}

const abilityDetails = (evt) => {
    evt.preventDefault()
    let ability = evt.target.textContent.toLowerCase()
    const details = document.createElement('div')
    details.classList = 'details'
    bigScreen.appendChild(details)
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


            const movesDisplay = document.createElement('ul')
            movesDisplay.classList = 'moves-display'
            movesDisplay.textContent = 'Moves:'
            screen.appendChild(movesDisplay)
            let moveCountArr = []
            let moveArr = []
            for(i = 0; i < moves.length; i++){
                moveCountArr.push(moves[i])
            }
            moveCountArr.forEach((el) => {
                moveArr.push(el.move)
            })
            moveArr.forEach((el) => {
                let move = el.name
                move = move.charAt(0).toUpperCase() + move.slice(1)
                const moveName = document.createElement('li')
                moveName.textContent = move
                moveName.classList = 'move-name'
                movesDisplay.appendChild(moveName)
                moveName.addEventListener('click',moveDetails)
            })
            
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
                abilityName.addEventListener('click',abilityDetails)
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


            const statsDisplay = document.createElement('div')
            statsDisplay.classList = 'stats-display'

            const statsIcons = document.createElement('svg')
            statsIcons.classList = 'stats-icons'
            const hpImg = document.createElement('img')
            hpImg.src = './pictures/hp_symbol.png'
            const atkImg = document.createElement('img')
            atkImg.src = './pictures/atk_symbol.png'
            const defImg = document.createElement('img')
            defImg.src = './pictures/def_symbol.png'
            const sp_atkImg = document.createElement('img')
            sp_atkImg.src = './pictures/sp-atk_symbol.png'
            const sp_defImg = document.createElement('img')
            sp_defImg.src = './pictures/sp-def_symbol.png'
            const spdImg = document.createElement('img')
            spdImg.src = './pictures/spd_symbol.png'
            statsIcons.appendChild(hpImg)
            statsIcons.appendChild(atkImg)
            statsIcons.appendChild(defImg)
            statsIcons.appendChild(sp_atkImg)
            statsIcons.appendChild(sp_defImg)
            statsIcons.appendChild(spdImg)

            const statsNums = document.createElement('ul')
            statsNums.classList = 'stat-nums'
            const hpNum = document.createElement('li')
            hpNum.textContent = stats[0].base_stat
            const atkNum = document.createElement('li')
            atkNum.textContent = stats[1].base_stat
            const defNum = document.createElement('li')
            defNum.textContent = stats[2].base_stat
            const sp_atkNum = document.createElement('li')
            sp_atkNum.textContent = stats[3].base_stat
            const sp_defNum = document.createElement('li')
            sp_defNum.textContent = stats[4].base_stat
            const spdNum = document.createElement('li')
            spdNum.textContent = stats[5].base_stat
            statsNums.appendChild(hpNum)
            statsNums.appendChild(atkNum)
            statsNums.appendChild(defNum)
            statsNums.appendChild(sp_atkNum)
            statsNums.appendChild(sp_defNum)
            statsNums.appendChild(spdNum)

            statsDisplay.appendChild(statsIcons)
            statsDisplay.appendChild(statsNums)

            screen.appendChild(statsDisplay)

            
        })
        .catch(err => console.log(err))
    }
    
    const changeDex = (evt) => {
        evt.preventDefault()
        dexScreen.src = './pictures/dex_screen-on.png'
    }
    
    
    document.querySelector('.dex-req').addEventListener('submit',getPokemon)
    document.querySelector('.dex-req').addEventListener('submit',changeDex)

    