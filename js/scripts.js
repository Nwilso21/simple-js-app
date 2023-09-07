
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function add(pokemon) {
      pokemonList.push(pokemon)
    }
  
    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon){
      let pokemonList =document.querySelector('.list-group');
      let listItem = document.createElement('li');
      let button = document.createElement("btn");
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target', '#exampleModal');
      button.innerText=pokemon.name;
      button.classList.add("btn","btn-block");
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
    }

    function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
        showModal(pokemon);
      });
    }

    function loadlist() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name : item.name,
            detailsUrl : item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item){
      let url= item.detailsUrl;
      return fetch(url).then(function (response){
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      })
    }

    

    function showModal(item) {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      modalTitle.empty();
      modalBody.empty();
        let nameElement = $("<h1>" + item.name + "</h1>");
      let imageElement = $('<img class="modal-img" style="width:50%">');
      imageElement.attr("src", item.imageUrl);
      let heightElement = $("<p>" + "height : " + item.height + "</p>");
      let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
      let typesElement = $(`<p>Type(s): ${item.types.map(Types).join(', ')}</p>`);
      function Types (item){
        console.log(item.type.name)
        return [item.type.name];
      }
  
      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
    }



  window.addEventListener('keydown', (e) =>{
    let modalContainer =document.querySelector('#modal');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });



    return {
      add: add,
      getAll: getAll,
      addListItem : addListItem,
      loadlist : loadlist,
      loadDetails : loadDetails,
      showModal : showModal
    };
  })();

  
  pokemonRepository.loadlist().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });






