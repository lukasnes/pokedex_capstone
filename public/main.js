const menuBtn = document.querySelector('[data-menu-btn]')
const sidebar = document.querySelector('[data-sidebar]')

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open')
})

const getPokemon = (evt) => {
    evt.preventDefault()
    let pokemon = document.querySelector('#dex-input').value
    pokemon = pokemon.toLowerCase().trim()
    console.log(pokemon)
    axios
        .get(`http://localhost:4000/api/${pokemon}`)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
}


document.querySelector('.dex-req').addEventListener('submit',getPokemon)