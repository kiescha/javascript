//alert('Watch out! Pokedex Incoming!')
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name:'Balbasaur',
      height: 0.7,
      type:['grass','poison']
    },
    {
      name:'Metapod',
      height: 0.7,
      type:'bug'
    },
    {
      name:'Beedrill',
      height:1,
      type:['bug', 'poison']
    }
  ];
  pokemonList.forEach(function(pokemon) {
    document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-style');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  });
