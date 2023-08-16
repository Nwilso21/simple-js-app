
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

    function addListItem(pokemon){
      let pokemonList =document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement("button");
      button.innerText = "placeholder";
      button.classList.add("button-class");
      button.addEventListener('click',showDetails(pokemon));
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
    }

    function showDetails(pokemon){
      console.log(pokemon);
    }

    return {
      add: add,
      getAll: getAll,
      addListItem : addListItem
    };
  })();

  
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});
