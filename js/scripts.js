//alert('Watch out! Pokedex Incoming!')
let pokemonList=[
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
  if (pokemon.height < 0.9) {
    document.write('<p>'+ pokemon.name +' (Height:'+ pokemon.height+')' + '</p>')
  } else {
    document.write('<p>' + pokemon.name +' (Height:'+ pokemon.height+')' + ' Wow that\'s big!'+'</p>');
  }
});
