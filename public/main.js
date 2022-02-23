const menuBtn = document.querySelector('[data-menu-btn]')
const sidebar = document.querySelector('[data-sidebar]')
const dexScreen = document.querySelector('[data-dex-screen]')
const screen = document.querySelector('.dex-screen')
const bigScreen = document.querySelector('.dex-screen-container')
const detailsContainer = document.querySelector('.details-container')


menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open')
})

const clearDex = () => {
    screen.innerHTML = ''
}
const clearDetails = () => {
    detailsContainer.innerHTML = ''
}
const typeDetailsClickName = (evt) => {
    evt.preventDefault()
    let typeClicked = evt.target.textContent
    typeClicked = typeClicked.toLowerCase()
    typeDetails(typeClicked)
}
const typeDetailsClickImg = (evt) => {
    evt.preventDefault()
    let typeClicked = evt.target
    let typeToSearch = typeClicked.getAttribute('id')
    console.log(typeClicked)
    typeDetails(typeToSearch)
}

const typeDetails = (type) => {
    clearDetails()
    const details = document.createElement('div')
    details.classList = 'details'
    detailsContainer.appendChild(details)
    axios
        .get(`/api/types/${type}`)
        .then(res => {
            console.log(res.data)
            const { damage_relations,generation,moves,name,pokemon } = res.data

            const titleBox = document.createElement('div')
            titleBox.classList = 'type-details-title-box'
            details.appendChild(titleBox)

            const titleImg = document.createElement('img')
            titleImg.src = `./pictures/${name}_type.png`
            titleBox.appendChild(titleImg)

            const typeTitle = document.createElement('p')
            let title = name
            title = title.charAt(0).toUpperCase() + title.slice(1)
            typeTitle.textContent = title + ' Type'
            titleBox.appendChild(typeTitle)

            const typeMovesDisplay = document.createElement('ul')
            typeMovesDisplay.classList = 'type-moves-display'
            typeMovesDisplay.textContent = 'Moves:'
            details.appendChild(typeMovesDisplay)
            let moveCountArr = []
            for(i = 0; i < moves.length; i++){
                moveCountArr.push(moves[i])
            }
            moveCountArr.forEach((el) => {
                let move = el.name
                move = move.charAt(0).toUpperCase() + move.slice(1)
                const typeMoveName = document.createElement('li')
                typeMoveName.textContent = move
                typeMoveName.classList = 'type-move-name'
                typeMovesDisplay.appendChild(typeMoveName)
                typeMoveName.addEventListener('click',moveDetails)
            })

            const typePokemonDisplay = document.createElement('ul')
            typePokemonDisplay.classList = 'type-pokemon-display'
            typePokemonDisplay.textContent = 'Pokemon:'
            details.appendChild(typePokemonDisplay)
            let pokeCountArr = []
            for(i = 0; i < pokemon.length; i++){
                pokeCountArr.push(pokemon[i])
            }
            pokeCountArr.forEach((el) => {
                let pokemon = el.pokemon.name
                pokemon = pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
                const typePokemonName = document.createElement('li')
                typePokemonName.textContent = pokemon
                typePokemonName.classList = 'type-pokemon-name'
                typePokemonDisplay.appendChild(typePokemonName)
                typePokemonName.addEventListener('click',getPokemonClick)
            })

            const genText = document.createElement('p')
            let gen_text = generation.name
            let split_gen_text = gen_text.split('-')
            gen_text = split_gen_text[0]
            gen_text = gen_text.charAt(0).toUpperCase() + gen_text.slice(1)
            let gen_num = split_gen_text[1]
            gen_text = `${title} type was introduced in ` + gen_text + '-' + gen_num.toUpperCase()
            genText.classList = 'type-details-gen'
            genText.textContent = gen_text
            details.appendChild(genText)

            const { double_damage_from,double_damage_to,half_damage_from,half_damage_to,no_damage_from,no_damage_to } = damage_relations

            const damageRelationsBox = document.createElement('div')
            damageRelationsBox.classList = 'damage-relations-box'
            details.appendChild(damageRelationsBox)
            const damageRelationsText = document.createElement('p')
            damageRelationsText.classList = 'damage-relations-text'
            damageRelationsText.textContent = 'Type Match-ups'
            damageRelationsBox.appendChild(damageRelationsText)

            const doubleDamageBox = document.createElement('div')
            doubleDamageBox.classList = 'double-damage-box'
            damageRelationsBox.appendChild(doubleDamageBox)
            const doubleDamageTypes = document.createElement('div')
            doubleDamageTypes.classList = 'double-damage-types'
            doubleDamageBox.appendChild(doubleDamageTypes)
            const doubleDamageBar = document.createElement('div')
            doubleDamageBar.classList = 'double-damage-bar'
            doubleDamageBar.textContent = 'Very Strong Against'
            doubleDamageBox.appendChild(doubleDamageBar)
            double_damage_to.forEach((el) => {
                let typeName = el.name
                typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
                const doubleDamageImgBox = document.createElement('div')
                doubleDamageImgBox.classList = 'strongest-img'
                const doubleDamageImg = document.createElement('img')
                doubleDamageImg.src = `./pictures/${el.name}_type.png`
                doubleDamageImgBox.appendChild(doubleDamageImg)
                doubleDamageTypes.appendChild(doubleDamageImgBox)
                const tooltip = document.createElement('span')
                tooltip.classList = 'strongest-tooltip'
                doubleDamageImgBox.appendChild(tooltip)
                const tooltipText = document.createElement('p')
                tooltipText.classList = 'strongest-tooltip-text'
                tooltipText.textContent = `${typeName}`
                tooltip.appendChild(tooltipText)
                doubleDamageImg.setAttribute('id',`${el.name}`)
                doubleDamageImgBox.addEventListener('click',typeDetailsClickImg)
            })

            const strongBox = document.createElement('div')
            strongBox.classList = 'strong-box'
            damageRelationsBox.appendChild(strongBox)
            const strongTypes = document.createElement('div')
            strongTypes.classList = 'strong-types'
            strongBox.appendChild(strongTypes)
            const strongBar = document.createElement('div')
            strongBar.classList = 'strong-bar'
            strongBar.textContent = 'Strong Against'
            strongBox.appendChild(strongBar)
            half_damage_to.forEach((el) => {
                let typeName = el.name
                typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
                const strongImgBox = document.createElement('div')
                strongImgBox.classList = 'strong-img'
                const strongImg = document.createElement('img')
                strongImg.src = `./pictures/${el.name}_type.png`
                strongImgBox.appendChild(strongImg)
                strongTypes.appendChild(strongImgBox)
                const tooltip = document.createElement('span')
                tooltip.classList = 'strong-tooltip'
                strongImgBox.appendChild(tooltip)
                const tooltipText = document.createElement('p')
                tooltipText.classList = 'strong-tooltip-text'
                tooltipText.textContent = `${typeName}`
                tooltip.appendChild(tooltipText)
                strongImg.setAttribute('id',`${el.name}`)
                strongImgBox.addEventListener('click',typeDetailsClickImg)
            })

            const weakBox = document.createElement('div')
            weakBox.classList = 'weak-box'
            damageRelationsBox.appendChild(weakBox)
            const weakBar = document.createElement('div')
            weakBar.classList = 'weak-bar'
            weakBar.textContent = 'Weak Against'
            weakBox.appendChild(weakBar)
            const weakTypes = document.createElement('div')
            weakTypes.classList = 'weak-types'
            weakBox.appendChild(weakTypes)
            half_damage_from.forEach((el) => {
                let typeName = el.name
                typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
                const weakImgBox = document.createElement('div')
                weakImgBox.classList = 'weak-img'
                const weakImg = document.createElement('img')
                weakImg.src = `./pictures/${el.name}_type.png`
                weakImgBox.appendChild(weakImg)
                weakTypes.appendChild(weakImgBox)
                const tooltip = document.createElement('span')
                tooltip.classList = 'weak-tooltip'
                weakImgBox.appendChild(tooltip)
                const tooltipText = document.createElement('p')
                tooltipText.classList = 'weak-tooltip-text'
                tooltipText.textContent = `${typeName}`
                tooltip.appendChild(tooltipText)
                weakImg.setAttribute('id',`${el.name}`)
                weakImgBox.addEventListener('click',typeDetailsClickImg)
            })

            const weakestBox = document.createElement('div')
            weakestBox.classList = 'weakest-box'
            const weakestBar = document.createElement('div')
            weakestBar.classList = 'weakest-bar'
            weakestBar.textContent = 'Weakest Against'
            weakestBox.appendChild(weakestBar)
            damageRelationsBox.appendChild(weakestBox)
            const weakestTypes = document.createElement('div')
            weakestTypes.classList = 'weakest-types'
            weakestBox.appendChild(weakestTypes)
            double_damage_from.forEach((el) => {
                let typeName = el.name
                typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
                const weakestImgBox = document.createElement('div')
                weakestImgBox.classList = 'weakest-img'
                const weakestImg = document.createElement('img')
                weakestImg.src = `./pictures/${el.name}_type.png`
                weakestImgBox.appendChild(weakestImg)
                weakestTypes.appendChild(weakestImgBox)
                const tooltip = document.createElement('span')
                tooltip.classList = 'weakest-tooltip'
                weakestImgBox.appendChild(tooltip)
                const tooltipText = document.createElement('p')
                tooltipText.classList = 'weakest-tooltip-text'
                tooltipText.textContent = `${typeName}`
                tooltip.appendChild(tooltipText)
                weakestImg.setAttribute('id',`${el.name}`)
                weakestImgBox.addEventListener('click',typeDetailsClickImg)
            })

            const noDamageBox = document.createElement('div')
            noDamageBox.classList = 'no-damage-box'
            const noDamageBar = document.createElement('div')
            noDamageBar.classList = 'no-damage-bar'
            noDamageBar.textContent = 'No Damage Against'
            noDamageBox.appendChild(noDamageBar)
            damageRelationsBox.appendChild(noDamageBox)
            const noDamageTypes = document.createElement('div')
            noDamageTypes.classList = 'no-damage-types'
            noDamageBox.appendChild(noDamageTypes)
            no_damage_to.forEach((el) => {
                let typeName = el.name
                typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
                const noDamageImgBox = document.createElement('div')
                noDamageImgBox.classList = 'no-damage-img'
                const noDamageImg = document.createElement('img')
                noDamageImg.src = `./pictures/${el.name}_type.png`
                noDamageImgBox.appendChild(noDamageImg)
                noDamageTypes.appendChild(noDamageImgBox)
                const tooltip = document.createElement('span')
                tooltip.classList = 'no-damage-tooltip'
                noDamageImgBox.appendChild(tooltip)
                const tooltipText = document.createElement('p')
                tooltipText.classList = 'no-damage-tooltip-text'
                tooltipText.textContent = `${typeName}`
                tooltip.appendChild(tooltipText)
                noDamageImg.setAttribute('id',`${el.name}`)
                noDamageImgBox.addEventListener('click',typeDetailsClickImg)
            })
            const noDamageFromBox = document.createElement('div')
            noDamageFromBox.classList = 'no-damage-from-box'
            const noDamageFromBar = document.createElement('div')
            noDamageFromBar.classList = 'no-damage-from-bar'
            noDamageFromBar.textContent = 'No Damage From'
            noDamageFromBox.appendChild(noDamageFromBar)
            damageRelationsBox.appendChild(noDamageFromBox)
            const noDamageFromTypes = document.createElement('div')
            noDamageFromTypes.classList = 'no-damage-from-types'
            noDamageFromBox.appendChild(noDamageFromTypes)
            no_damage_from.forEach((el) => {
                let typeName = el.name
                typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
                const noDamageFromImgBox = document.createElement('div')
                noDamageFromImgBox.classList = 'no-damage-from-img'
                const noDamageFromImg = document.createElement('img')
                noDamageFromImg.src = `./pictures/${el.name}_type.png`
                noDamageFromImgBox.appendChild(noDamageFromImg)
                noDamageFromTypes.appendChild(noDamageFromImgBox)
                const tooltip = document.createElement('span')
                tooltip.classList = 'no-damage-from-tooltip'
                noDamageFromImgBox.appendChild(tooltip)
                const tooltipText = document.createElement('p')
                tooltipText.classList = 'no-damage-from-tooltip-text'
                tooltipText.textContent = `${typeName}`
                tooltip.appendChild(tooltipText)
                noDamageFromImg.setAttribute('id',`${el.name}`)
                noDamageFromImgBox.addEventListener('click',typeDetailsClickImg)
            })
        })
}

const speciesDetails = (evt) => {
    evt.preventDefault()
    clearDetails()
    let speciesClicked = evt.target
    let speciesToSearch = speciesClicked.getAttribute('id')
    const details = document.createElement('div')
    details.classList = 'details'
    detailsContainer.appendChild(details)
    axios
        .get(`/api/species/${speciesToSearch}`)
        .then(res => {
            const { name,habitat,evolution_chain,egg_groups,capture_rate,is_legendary,is_mythical,generation } = res.data

            let thisName = name
            thisName = thisName.charAt(0).toUpperCase() + thisName.slice(1)

            const { evoArr,evoNames } = evolution_chain
            const imgBox = document.createElement('div')
            imgBox.classList = 'evo-image'
            if(evoArr.length <= 3){
                imgBox.style.justifyContent = 'center'
            }
            evoArr.forEach((el,i) => {
                let poke_box = document.createElement('div')
                poke_box.classList = 'poke-box'
                let poke_img = document.createElement('img')
                poke_img.src = el
                poke_box.appendChild(poke_img)
                let poke_name = document.createElement('p')
                poke_name.classList = 'evo-name'
                let evo_name = evoNames[i].charAt(0).toUpperCase() + evoNames[i].slice(1)
                poke_name.textContent = evo_name
                poke_box.appendChild(poke_name)
                imgBox.appendChild(poke_box)
                poke_name.addEventListener('click',getPokemonClick)
            })
            details.appendChild(imgBox)

            const genText = document.createElement('p')
            let gen_text = generation.name
            let split_gen_text = gen_text.split('-')
            gen_text = split_gen_text[0]
            gen_text = gen_text.charAt(0).toUpperCase() + gen_text.slice(1)
            let gen_num = split_gen_text[1]
            gen_text = `${thisName} was introduced in ` + gen_text + '-' + gen_num.toUpperCase()
            genText.classList = 'species-details-gen'
            genText.textContent = gen_text
            details.appendChild(genText)

            const eggBox = document.createElement('div')
            eggBox.classList = 'egg-box'
            const eggPokemon = document.createElement('ul')
            eggPokemon.classList = 'egg-pokemon'
            if(egg_groups.length == 1){
                eggPokemon.textContent = 'The Pokemon belonging to this egg group are:'
            } else if(egg_groups.length > 1){
                eggPokemon.textContent = 'The Pokemon belonging to these egg groups are:'
            }
            details.appendChild(eggBox)
            details.appendChild(eggPokemon)
            egg_groups.forEach((el) => {
                const { name } = el
                axios
                    .get(`/api/egg/${name}`)
                    .then(res => {
                        const { name,pokemon_species } = res.data
                        let eggName = name
                        eggName = eggName.charAt(0).toUpperCase() + eggName.slice(1)

                        const eggImgBox = document.createElement('div')
                        eggImgBox.classList = 'egg-img'
                        const eggImg = document.createElement('img')
                        eggImg.src = `./pictures/${name}_egg.png`
                        eggImgBox.appendChild(eggImg)

                        const eggTypeBox = document.createElement('div')
                        eggTypeBox.classList = 'egg-type'
                        const egg_type = document.createElement('p')
                        egg_type.textContent = `${eggName} egg group`
                        eggTypeBox.appendChild(egg_type)

                        eggBox.appendChild(eggImgBox)
                        eggBox.appendChild(eggTypeBox)

                        pokemon_species.forEach((el) => {
                            let curr = el.name
                            curr = curr.charAt(0).toUpperCase() + curr.slice(1)
                            const egg_pokemon_name = document.createElement('li')
                            egg_pokemon_name.classList = 'egg-pokemon-name'
                            egg_pokemon_name.textContent = curr
                            eggPokemon.appendChild(egg_pokemon_name)
                            egg_pokemon_name.addEventListener('click',getPokemonClick)
                        })
                    })
            })

            const legendary = document.createElement('p')
            legendary.classList = 'legendary'
            details.appendChild(legendary)
            if(is_legendary && is_mythical){
                legendary.textContent = `${thisName} is a legendary, mythical pokemon! These are pokemon that have only been known to appear very rarely, and some believe they are one of a kind.`
            } else if(is_legendary && !is_mythical){
                legendary.textContent = `${thisName} is a legendary pokemon. Said to be one of a kind, if you miss your opportunity to catch ${thisName}, you may not get another.`
            } else if(!is_legendary && is_mythical){
                legendary.textContent = `${thisName} is a mythical pokemon. Few know their origin, and fewer yet have ever seen ${thisName}.`
            } else if(!is_legendary && !is_mythical && habitat != null){
                legendary.textContent = `${thisName} is as ordinary as ordinary can be. They can be found in ${habitat.name} regions.`
            } else if (!is_legendary && !is_mythical){
                legendary.textContent = `${thisName} doesn't have any known habitats, but they are nonetheless plentiful, if not a little bit rare.`
            }

            const capRate = document.createElement('p')
            capRate.classList = 'cap-rate'
            details.appendChild(capRate)
            if(capture_rate >= 200){
                capRate.textContent = `${thisName} is a breeze to catch! Any ol' pokeball will do!`
            } else if(capture_rate < 200 && capture_rate >= 150){
                capRate.textContent = `${thisName} can be persuaded easily. A pokeball or a type-specific ball will be enough to snag it.`
            } else if(capture_rate < 150 && capture_rate >= 100){
                capRate.textContent = `${thisName} is no simple catch! You'll certainly have to weaken it first. A great ball may be advised. Type-specific balls will be useful too.`
            } else if(capture_rate < 100 && capture_rate >= 50){
                capRate.textContent = `${thisName} will put up a fight. Weakening it or putting it to sleep will be necessary. At least a great ball for safety, but even an ultra ball wouldn't be missed against ${thisName}.`
            } else if(capture_rate < 50 && capture_rate >= 15){
                capRate.textContent = `${thisName} is tough to catch even with the best equipment. Stock up on ultra balls if you plan to tango with ${thisName}. Paralysis, sleep, and other status effects will raise your capture rate, but be careful! Don't want ${thisName} to faint!`
            } else if(capture_rate < 15){
                capRate.textContent = `${thisName} has an extremely low capture rate. Unless you're throwing a master ball, your odds are very low. If you know you're going for ${thisName}, make sure you have some sort of status effect help, lots of ultra balls, and maybe even put to use that elusive master ball!`
            }
        })
}

const moveDetails = (evt) => {
    evt.preventDefault()
    clearDetails()
    let move = evt.target.textContent.toLowerCase()
    const details = document.createElement('div')
    details.classList = 'details'
    detailsContainer.appendChild(details)
    axios
        .get(`/api/move/${move}`)
        .then(res => {
            const { accuracy,damage_class,effect_entries,flavor_text_entries,generation,learned_by_pokemon,name,power,pp,stat_changes,type } = res.data

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
            moveTypeText.addEventListener('click',typeDetailsClickName)

            const textBox = document.createElement('div')
            textBox.classList = 'move-details-text-box'
            details.appendChild(textBox)

            const moveEffectType = document.createElement('div')
            moveEffectType.classList = 'move-effect-type'
            details.appendChild(moveEffectType)
            const effect_img = document.createElement('img')
            effect_img.src = `./pictures/${damage_class.name}_effect.png`
            moveEffectType.appendChild(effect_img)
            const moveEffectText = document.createElement('p')
            moveEffectText.classList = 'move-effect-text'
            let moveEffectName = damage_class.name
            moveEffectName = moveEffectName.charAt(0).toUpperCase() + moveEffectName.slice(1)
            moveEffectText.textContent = moveEffectName
            moveEffectType.appendChild(moveEffectText)


            const movePokemon = document.createElement('ul')
            movePokemon.classList = 'move-pokemon'
            movePokemon.textContent = 'Pokemon that can learn this move:'
            details.appendChild(movePokemon)

            let pokeCountArr = []
            let pokeArr = []
            for(i = 0; i < learned_by_pokemon.length; i++){
                pokeCountArr.push(learned_by_pokemon[i])
            }
            pokeCountArr.forEach((el) => {
                let name_of_poke = el.name
                name_of_poke = name_of_poke.charAt(0).toUpperCase() + name_of_poke.slice(1)
                pokeArr.push(name_of_poke)
            })
            pokeArr.forEach((el) => {
                const poke_name = document.createElement('li')
                poke_name.classList = 'move-pokemon-name'
                poke_name.textContent = el
                movePokemon.appendChild(poke_name)
                poke_name.addEventListener('click',getPokemonClick)
            })


            const moveGenText = document.createElement('p')
            let moveGen = generation.name
            moveGen = moveGen.charAt(0).toUpperCase() + moveGen.slice(1)
            moveGenText.classList = 'move-gen-text'
            moveGenText.textContent = `This move was introduced in ${moveGen}`
            details.appendChild(moveGenText)


            if(stat_changes.length > 0){
                const statChangeDisplay = document.createElement('div')
                statChangeDisplay.classList = 'stat-change-display'
                details.appendChild(statChangeDisplay)
                let statChangeCount = []
                let statChanges = []
                let statToChange = []
                for(i = 0; i < stat_changes.length; i++){
                    statChangeCount.push(stat_changes[i])
                }
                statChangeCount.forEach((el) => {
                    statChanges.push(el.change)
                    statToChange.push(el.stat.name)
                })
                statToChange.forEach((el) => {
                    const changedStat = document.createElement('img')
                    changedStat.src = `./pictures/${el}_symbol.png`
                    changedStat.classList = 'changed-stat'
                    statChangeDisplay.appendChild(changedStat)
                })
                statChanges.forEach((el) => {
                    const statChange = document.createElement('p')
                    statChange.classList = 'stat-change'
                    statChange.textContent = el
                    statChangeDisplay.appendChild(statChange)
                })

                
            }


            const moveEffectEntry = document.createElement('p')
            moveEffectEntry.textContent = `${mvName} effect:`
            moveEffectEntry.classList = 'move-effect-entry'
            textBox.appendChild(moveEffectEntry)

            let effects = effect_entries[0]

            const effect = document.createElement('p')
            effect.textContent = effects.effect
            moveEffectEntry.appendChild(effect)

            const moveShortEffectEntry = document.createElement('p')
            moveShortEffectEntry.textContent = `${mvName} short effect:`
            moveShortEffectEntry.classList = 'move-short-effect-entry'
            textBox.appendChild(moveShortEffectEntry)

            const shortEffect = document.createElement('p')
            shortEffect.textContent = effects.short_effect
            moveShortEffectEntry.appendChild(shortEffect)

            let flavor_text_entry = flavor_text_entries
            const changeFlavorUp = (evt) => {
                evt.preventDefault()
                axios
                    .get('/api/flavorUp')
                    .then(res => {
                        const { flavor_text,version_group } = res.data
                        flavorTextDisplay.textContent = flavor_text
                        let version = version_group.name.split('-')
                        let versionNames = []
                        let versionText = 'This flavor text appears in the'
                        for(i = 0; i < version.length; i++){
                            let vName = version[i]
                            vName = vName.charAt(0).toUpperCase() + vName.slice(1)
                            versionNames.push(vName)
                        }
                        if(versionNames.length > 1){
                            versionText += ` ${versionNames[0]}`
                            for(i = 0; i < versionNames.length; i++){
                                if(i != 0 && i != versionNames.length - 1){
                                    versionText += ` and ${versionNames[i]}`
                                } else if (i == versionNames.length - 1){
                                versionText += ` and ${versionNames[i]} versions.`
                                }
                            }
                        } else if (versionNames.length == 1){
                            versionText += ` ${versionNames[0]} version.`
                        }
                        versionTextDisplay.textContent = versionText
                    })
            }
            const changeFlavorDown = (evt) => {
                evt.preventDefault()
                axios
                    .get('/api/flavorDown')
                    .then(res => {
                        const { flavor_text,version_group } = res.data
                        flavorTextDisplay.textContent = flavor_text
                        let version = version_group.name.split('-')
                        let versionNames = []
                        let versionText = 'This flavor text appears in the'
                        for(i = 0; i < version.length; i++){
                            let vName = version[i]
                            vName = vName.charAt(0).toUpperCase() + vName.slice(1)
                            versionNames.push(vName)
                        }
                        if(versionNames.length > 1){
                            versionText += ` ${versionNames[0]}`
                            for(i = 0; i < versionNames.length; i++){
                                if(i != 0 && i != versionNames.length - 1){
                                    versionText += ` and ${versionNames[i]}`
                                } else if (i == versionNames.length - 1){
                                versionText += ` and ${versionNames[i]} versions.`
                                }
                            }
                        } else if (versionNames.length == 1){
                            versionText += ` ${versionNames[0]} version.`
                        }
                        versionTextDisplay.textContent = versionText
                    })
            }

            const flavorDisplayPlus = document.createElement('button')
            const flavorDisplayMinus = document.createElement('button')
            flavorDisplayPlus.classList = 'flavor-forward'
            flavorDisplayMinus.classList = 'flavor-back'
            flavorDisplayPlus.style.backgroundImage = 'url(./pictures/arrow_right.png)'
            flavorDisplayMinus.style.backgroundImage = 'url(./pictures/arrow_left.png)'
            details.appendChild(flavorDisplayPlus)
            details.appendChild(flavorDisplayMinus)
            flavorDisplayPlus.addEventListener('click',changeFlavorUp)
            flavorDisplayMinus.addEventListener('click',changeFlavorDown)

            const flavorText = document.createElement('p')
            flavorText.classList = 'flavor-text-display'
            flavorText.textContent = 'Move flavor text:'
            details.appendChild(flavorText)

            const { flavor_text,version_group } = flavor_text_entry
            const flavorTextDisplay = document.createElement('p')
            flavorTextDisplay.textContent = flavor_text
            flavorText.appendChild(flavorTextDisplay)

            let version = version_group.name.split('-')
            let versionNames = []
            let versionText = 'This flavor text appears in the'
            for(i = 0; i < version.length; i++){
                let vName = version[i]
                vName = vName.charAt(0).toUpperCase() + vName.slice(1)
                versionNames.push(vName)
            }
            if(versionNames.length > 1){
                versionText += ` ${versionNames[0]}`
                for(i = 0; i < versionNames.length; i++){
                    if(i != 0 && i != versionNames.length - 1){
                        versionText += ` and ${versionNames[i]}`
                    } else if (i == versionNames.length - 1){
                        versionText += ` and ${versionNames[i]} versions.`
                    }
                }
            } else if (versionNames.length == 1){
                versionText += ` ${versionNames[0]} version.`
            }
            const versionTextDisplay = document.createElement('p')
            versionTextDisplay.textContent = versionText
            versionTextDisplay.classList = 'version-text'
            flavorText.appendChild(versionTextDisplay)
        })
        .catch(err => console.log(err))
}

const abilityDetails = (evt) => {
    evt.preventDefault()
    clearDetails()
    let ability = evt.target.textContent.toLowerCase()
    const details = document.createElement('div')
    details.classList = 'details'
    detailsContainer.appendChild(details)
    axios
        .get(`/api/ability/${ability}`)
        .then(res => {
            const { effect_entries,generation } = res.data

            const abilityEffect = document.createElement('p')
            let genName = generation.name
            genName = genName.charAt(0).toUpperCase() + genName.slice(1)
            let genNameSplit = genName.split('-')
            let gen_num = genNameSplit[1]
            genName = genNameSplit[0] + '-' + gen_num.toUpperCase()
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
const getPokemonSubmit = (evt) => {
    evt.preventDefault()
    let pokemon = document.querySelector('#dex-input').value
    pokemon = pokemon.toLowerCase().trim()
    return getPokemon(pokemon)
}
const getPokemonClick = (evt) => {
    evt.preventDefault()
    let pokemon = evt.target.textContent
    pokemon = pokemon.toLowerCase().trim()
    return getPokemon(pokemon)
}

const getPokemon = (pokemon) => {
    clearDex()
    axios
        .get(`/api/pokemon/${pokemon}`)
        .then(res => {
            const { abilities,moves,name,order,species,sprites,stats,types } = res.data
            console.log(res.data)
            const { front_default } = sprites

            const pokeName = document.createElement('div')
            pokeName.classList = 'poke-name'
            let currName = name.charAt(0).toUpperCase() + name.slice(1)
            pokeName.textContent = currName
            screen.appendChild(pokeName)

            const typesBox = document.createElement('div')
            typesBox.classList = 'types-box'
            screen.appendChild(typesBox)

            types.forEach((el) => {
                let type_name = el.type.name
                type_name = type_name.charAt(0).toUpperCase() + type_name.slice(1)
                const typeDisplayBox = document.createElement('div')
                typeDisplayBox.classList = 'type-display-box'
                typesBox.appendChild(typeDisplayBox)
                const typeImg = document.createElement('img')
                typeImg.src = `./pictures/${el.type.name}_type.png`
                typeDisplayBox.appendChild(typeImg)
                const typeText = document.createElement('p')
                typeText.textContent = type_name
                typeDisplayBox.appendChild(typeText)
                typeText.addEventListener('click',typeDetailsClickName)
            })


            let genus;
            for(i = 0; i < species.genera.length; i++){
                let genera = species.genera[i]
                const{ language } = genera
                const{ name } = language
                if(name == 'en'){
                    genus = genera.genus
                }
            }

            const pokeSpecies = document.createElement('p')
            pokeSpecies.classList = 'poke-species'
            pokeSpecies.setAttribute('id',`${name}`)
            pokeSpecies.textContent = genus
            screen.appendChild(pokeSpecies)
            pokeSpecies.addEventListener('click',speciesDetails)
            

            const orderNum = document.createElement('p')
            orderNum.classList = 'order-num'
            const orderNumText = document.createElement('span')
            orderNumText.textContent = `#${order}`
            orderNumText.classList = 'order-num-text'
            orderNum.appendChild(orderNumText)
            screen.appendChild(orderNum)

            // const typeDisplay = document.createElement('')


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
                    .get('/api/spriteUp')
                    .then(res => {
                        console.log(res)
                        spriteDisplay.src = res.data
                    })
            }
            const changeSpriteDown = (evt) => {
                evt.preventDefault()
                axios
                    .get('/api/spriteDown')
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
            const hpBox = document.createElement('div')
            hpBox.classList = 'hp'
            const hpImg = document.createElement('img')
            hpImg.src = './pictures/hp_symbol.png'
            const hpToolTipBox = document.createElement('span')
            hpToolTipBox.classList = 'hp-tooltip-box'
            const hpToolTip = document.createElement('p')
            hpToolTip.classList = 'hp-tooltip'
            hpToolTip.textContent = 'HP'
            hpToolTipBox.appendChild(hpToolTip)
            hpBox.appendChild(hpImg)
            hpBox.appendChild(hpToolTipBox)

            const atkBox = document.createElement('div')
            atkBox.classList = 'atk'
            const atkImg = document.createElement('img')
            atkImg.src = './pictures/atk_symbol.png'
            const atkToolTipBox = document.createElement('span')
            atkToolTipBox.classList = 'atk-tooltip-box'
            const atkToolTip = document.createElement('p')
            atkToolTip.classList = 'atk-tooltip'
            atkToolTip.textContent = 'ATK'
            atkToolTipBox.appendChild(atkToolTip)
            atkBox.appendChild(atkImg)
            atkBox.appendChild(atkToolTipBox)

            const defBox = document.createElement('div')
            defBox.classList = 'def'
            const defImg = document.createElement('img')
            defImg.src = './pictures/def_symbol.png'
            const defToolTipBox = document.createElement('span')
            defToolTipBox.classList = 'def-tooltip-box'
            const defToolTip = document.createElement('p')
            defToolTip.classList = 'def-tooltip'
            defToolTip.textContent = 'DEF'
            defToolTipBox.appendChild(defToolTip)
            defBox.appendChild(defImg)
            defBox.appendChild(defToolTipBox)

            const sp_atkBox = document.createElement('div')
            sp_atkBox.classList = 'sp-atk'
            const sp_atkImg = document.createElement('img')
            sp_atkImg.src = './pictures/sp-atk_symbol.png'
            const sp_atkToolTipBox = document.createElement('span')
            sp_atkToolTipBox.classList = 'sp-atk-tooltip-box'
            const sp_atkToolTip = document.createElement('p')
            sp_atkToolTip.classList = 'sp-atk-tooltip'
            sp_atkToolTip.textContent = 'SP-ATK'
            sp_atkToolTipBox.appendChild(sp_atkToolTip)
            sp_atkBox.appendChild(sp_atkImg)
            sp_atkBox.appendChild(sp_atkToolTipBox)

            const sp_defBox = document.createElement('div')
            sp_defBox.classList = 'sp-def'
            const sp_defImg = document.createElement('img')
            sp_defImg.src = './pictures/sp-def_symbol.png'
            const sp_defToolTipBox = document.createElement('span')
            sp_defToolTipBox.classList = 'sp-def-tooltip-box'
            const sp_defToolTip = document.createElement('p')
            sp_defToolTip.classList = 'sp-def-tooltip'
            sp_defToolTip.textContent = 'SP-DEF'
            sp_defToolTipBox.appendChild(sp_defToolTip)
            sp_defBox.appendChild(sp_defImg)
            sp_defBox.appendChild(sp_defToolTipBox)

            const spdBox = document.createElement('div')
            spdBox.classList = 'spd'
            const spdImg = document.createElement('img')
            spdImg.src = './pictures/spd_symbol.png'
            const spdToolTipBox = document.createElement('span')
            spdToolTipBox.classList = 'spd-tooltip-box'
            const spdToolTip = document.createElement('p')
            spdToolTip.classList = 'spd-tooltip'
            spdToolTip.textContent = 'SPD'
            spdToolTipBox.appendChild(spdToolTip)
            spdBox.appendChild(spdImg)
            spdBox.appendChild(spdToolTipBox)

            statsIcons.appendChild(hpBox)
            statsIcons.appendChild(atkBox)
            statsIcons.appendChild(defBox)
            statsIcons.appendChild(sp_atkBox)
            statsIcons.appendChild(sp_defBox)
            statsIcons.appendChild(spdBox)

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
        .catch(err => alert('Must enter a valid Pokemon!'))
    }
    
    const changeDex = (evt) => {
        evt.preventDefault()
        dexScreen.src = './pictures/dex_screen-on.png'
    }
    
    
    document.querySelector('.dex-req').addEventListener('submit',getPokemonSubmit)
    document.querySelector('.dex-req').addEventListener('submit',changeDex)

    