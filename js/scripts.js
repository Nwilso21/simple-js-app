
let pokemonList = [
    {Name: 'Cloyster', Height: 1.5, Type: 'Water'},
    {Name: 'Rhydon', Height: 1.9, Type: 'Ground'},
    {Name: 'Wooper', Height: .4, Type: 'Water'},
];

for(i =0; i< pokemonList.length; i++){
    document.write(pokemonList[i].Name);
    document.write(pokemonList[i].Height);
    document.write(pokemonList[i].Type);
}