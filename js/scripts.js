//alert('Watch out! Pokedex Incoming!')
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
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
  function addListItem(pokemon) {
    let poList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add('button-style');
    listItem.appendChild(button);
    poList.appendChild(listItem);
  };
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.imageUrl, pokemon.height, pokemon.weight)
      console.log(pokemon);
    });
  }
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
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  };
  let modalContainer = document.querySelector('#modal-container');
  function showModal(name, img, height, weight) {

    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal)

    let titleElement = document.createElement('h1');
    titleElement.innerText = name;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = img;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight: '+ weight;

    let contentHeight = document.createElement('p');
    contentHeight.innerText = 'Height: ' + height;



    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(pokemonImage);
    modal.appendChild(contentHeight);
    modal.appendChild(pokemonWeight);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }
  function hideModal() {
    modalContainer.classList.remove('is-visible');
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal()
      }
    })
  };
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    };
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
