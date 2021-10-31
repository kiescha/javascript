let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector('#searchbar');

  // This code will check if pokemon is a object.
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      document.write('not a pokemon')
    };
  }
  function getAll() {
    return pokemonList;
  };
  // This code will create li and button for the pokemonList.
  function addListItem(pokemon) {
    let poList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-success');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#poModal');
    listItem.classList.add('list-group-item');

    listItem.appendChild(button);
    poList.appendChild(listItem);
  };

  // This code will display info about pokemons in modal.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon)
      console.log(pokemon);
    });
  }
  // This code will fetch info from json.
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  };
  // This code will fetch details about pokemons like: img, height, type, weight.
  // i should consider to brig out types as well to modal, atm types is useless.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // item.imageUrl = details.sprites.front_default;
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  };
  // All modal Code for Pokedex

  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');
    let theMap = pokemon.types;
    let map = theMap.map(function(x){
      return x.type.name;
    });
    
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    let title = document.createElement('h5');
    title.innerHTML = pokemon.name;

    let poHeight = document.createElement('p');
    poHeight.innerHTML = 'Height: ' + pokemon.height;

    let poTypes = document.createElement('p');
    poTypes.innerHTML = 'Type: ' + map;

    let poWeight = document.createElement('p');
    poWeight.innerHTML = 'Weight: ' + pokemon.weight;

    let poPic = document.createElement('img');
    poPic.src = pokemon.imageUrl;

    modalTitle.append(title);
    modalBody.append(poPic);
    modalBody.append(poHeight);
    modalBody.append(poWeight);
    modalBody.append(poTypes);
  }
  //search bar
    searchInput.addEventListener("input", function() {
      let listPokemon = document.querySelectorAll("li");
      let value = searchInput.value.toUpperCase();

      listPokemon.forEach(function(pokemon) {
        if (pokemon.innerText.toUpperCase().indexOf(value) < 0) {
          pokemon.style.display = "none";
        } else {
          pokemon.style.display = "";
        }        
      });
    });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
