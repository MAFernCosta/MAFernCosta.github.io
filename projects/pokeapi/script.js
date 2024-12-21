const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const randomBtn = document.getElementById("random-button")
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const typesEl = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const pokemonImage = document.getElementById("pokemon-image");

const randomPokemon = () =>{
    searchInput.value = "";
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon`)
    .then((res) => res.json())
    .then((data)=> {
        //console.log(data); //DEBUG
        const randomIndex = Math.floor(Math.random() * data.count);
        //console.log(data.results[randomIndex]); //DEBUG
        loadPokemon(data.results[randomIndex].id);
    })
    .catch((er) => {
        console.error(er);
        return;
    });
}

const loadPokemon = (nameOrId) => {
    let pokemon = {};
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`)
    .then((res) => res.json())
    .then((data)=> {
        populatePokeApi(data);
    })
    .catch((er) => {
        console.error(er);
        alert("Pokémon not found")
        return;
    });
    
}

const getPokemonImg = (imagesUrl, pokemonName) => {
    return `<img id="sprite" alt="${pokemonName}" class="image" src="${imagesUrl.front_default}">`;
};

const getPokemonTypes = (types) => {
    let divWithTypes = "";
    types.forEach((type) => divWithTypes += `<div class="type ${type.type.name}">${type.type.name.toUpperCase()}</div>`);
    //console.log(divWithTypes);  //DEBUG
    return divWithTypes;
};

const populatePokeApi = (pokemon) => {
    //console.log(pokemon); //DEBUG
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonId.textContent = `#${pokemon.id}`;
    weight.textContent = pokemon.weight;
    height.textContent = pokemon.height;
    pokemonImage.innerHTML = getPokemonImg(pokemon.sprites, pokemon.name);
    typesEl.innerHTML = getPokemonTypes(pokemon.types);
    hp.textContent = pokemon.stats[0].base_stat;
    attack.textContent = pokemon.stats[1].base_stat;
    defense.textContent = pokemon.stats[2].base_stat;
    spAttack.textContent = pokemon.stats[3].base_stat;
    spDefense.textContent = pokemon.stats[4].base_stat;
    speed.textContent = pokemon.stats[5].base_stat;
}

searchBtn.addEventListener("click", ()=>{
    const input = searchInput.value;
    if(input){
        loadPokemon(input.toLowerCase());
    }
});

searchInput.addEventListener("keypress",function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click();
    }
  });

randomBtn.addEventListener("click", randomPokemon);
