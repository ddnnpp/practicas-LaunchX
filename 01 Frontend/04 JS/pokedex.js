const pokeCard = document.querySelector("[js-pokeCard]")
const pokeName = document.querySelector("[js-pokeName]")
const pokeImgCont = document.querySelector("[js-pokeImgCont]")
const pokeImg = document.querySelector("[js-pokeImg]")
const pokeID = document.querySelector("[js-pokeID]")
const pokeTypes = document.querySelector("[js-poketypes]")
const pokeStats = document.querySelector("[js-pokeStats]")

const typeColors = {
    grass: "rgb(45, 158, 0)",
    electric: "rgb(255, 251, 0)",
    normal: "rgb(107, 107, 107)",
    rock: "rgb(175, 175, 175)",
    fire: "rgb(255, 0, 0)",
    water: "rgb(0, 174, 255)",
    ice: "rgb(113, 210, 255)",
    flying: "rgb(116, 244, 248)",
    psychic: "rgb(255, 82, 226)",
    ghost: "rgb(229, 231, 250)",
    bug: "rgb(0, 255, 149)",
    poison: "rgb(206, 252, 0)",
    ground: "rgb(244, 255, 196)",
    dragon: "rgb(226, 121, 0)",
    steel: "rgb(85, 85, 85)",
    fighting: "rgb(255, 168, 241)",
    default: "rgb(0, 0, 0)"
}

const fetchPokemon = event => {
    event.preventDefault()
    const {value} = event.target.pokemon
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default
    const {stats, types} = data

    pokeName.textContet = data.name
    pokeImg.setAttribute("src", sprite)
    pokeID.textContet = `No ${data.id}`
    setCardColor(types)
    renderPokemonTypes(types)
    renderPokemonStats(stats)
}

setCardColor = types => {
    const color1 = typeColors[types[0].type.name]
    const color2 = types[1] ? typeColors[types[1].type.name] : typeColors.default
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = ""
    types.forEach(type => {
        const typeTextElement = document.createElement("div")
        typeTextElement.style.color = typeColors[type.type.name]
        typeTextElement.textContent = type.type.name
        pokeTypes.appendChild(typeTextElement)
    })
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = ""
    stats.forEach(stat => {
        const statElement = document.createElement("div")
        const statElementName = document.createElement("div")
        const statElementAmount = document.createElement("div")
        statElementName.textContent = stat.stat.name
        statElementAmount.textContent = stat.base_stat
        statElement.appendChild(statElementName)
        statElement.appendChild(statElementAmount)
        pokeStats.appendChild(statElement)
    })
}

const renderNotFound = () => {
    pokeName.textContent = "Pokemon 404"
    pokeImg.setAttribute("src", "img/pokeSad.gif")
    pokeID.innerHTML = ""
    pokeTypes.innerHTML = ""
    pokeStats.innerHTML = ""
}

/* const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName")
    let pokeInput = pokeName.value.toLowerCase()
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res)
            pokeImag("img/pokeSad.gif")
        } else {
            return res.json()
        }
    }).then((datos) => {
        let pokeImg = datos.sprites.front_default
        pokeImag(pokeImg)
    })
}

fetchPokemon()

const pokeImag = (url) => {
    const pokeImg = document.getElementById("pokeImg")
    pokeImg.src = url
} */