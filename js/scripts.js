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
  function add(pokemon) {
      if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      document.write('not a pokemon')};
  }
    function getAll() {
      return pokemonList;
    };
  function addListItem(pokemon){
    let poList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add('button-style');
    listItem.appendChild(button);
    poList.appendChild(listItem);
  };
  function showDetails(pokemon){
    console.log(pokemon);
  }
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
