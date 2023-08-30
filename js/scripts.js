
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function add(pokemon) {
      if(
        typeof pokemon === "object" &&
        "name" in pokemon 
      ){
        pokemonList.push(pokemon);
      }else{
        console.log("pokemon is not correct");
      }
    }
  
    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon){
      let pokemonList =document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
    }

    function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
        showModal(pokemon.name, 'Height: ' +pokemon.height, pokemon.imageUrl);
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
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      })
    }

    

    function showModal(title, text, img) {
      let modalContainer = document.querySelector('#modal-container');
    
      // Clear all existing modal content
      modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'x';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement=document.createElement('p');
    contentElement.innerText = text;

    let myimage = document.createElement('img');
    myimage.src=img;


    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(myimage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal(){
    let modalContainer=document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }


  window.addEventListener('keydown', (e) =>{
    let modalContainer =document.querySelector('#modal-container');
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
      showModal : showModal,
      hideModal : hideModal
    };
  })();

  
  pokemonRepository.loadlist().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });






