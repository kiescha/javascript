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
for ( let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height < 0.9){
    document.write(pokemonList[i].name +' (Height:'+ pokemonList[i].height+')');
  } else {
    document.write(pokemonList[i].name +' (Height:'+ pokemonList[i].height+')' + ' Wow that\'s big!');
  }
}
