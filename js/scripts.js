
let pokemonRepository = (function () {
    let pokemonList = [
        {Name: 'Cloyster', Height: 1.5, Type: 'Water'},
        {Name: 'Rhydon', Height: 1.9, Type: 'Ground'},
        {Name: 'Wooper', Height: .4, Type: 'Water'},
    ];
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();

  
pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.Name + ' (' + pokemon.Height + ')');
    if(pokemon.Height>1.0){
        document.write(' - Wow that is big!');
    }
    document.write("\n");
});
