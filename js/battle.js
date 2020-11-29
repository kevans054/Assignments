/*
    Start by collecting your game data from your cookie(s) and assigning it to variable(s)...
    keep in mind that cookie data is stored as a string - be sure to use Number() if passing integers
    and JSON.parse if passing JSON as cookie data.
*/
/*
    - Use selectors to target and fill in the img, .name, and .health elements on battle.html
    - Display the .battlelog contents
    - If the battle is over, present the user with a button to go back to index.html to start a new round
      and also wipe the cookies. 
    - Otherwise, present the user with a button to refresh the page and complete the next battle sequence.
*/

let cpuPokemon = JSON.parse(Cookies.get('cpuPokemon'));

let cpuPokemonName = cpuPokemon['name'];
let cpuPokemonHP = cpuPokemon['hp'];
let cpuPokemonAttack = cpuPokemon['attack'];
let cpuPokemonImage = cpuPokemon['image'];

// computers pokemon
let cpuImage = document.querySelector('.cpu img').src = cpuPokemonImage;
console.log(cpuImage);

let cpuName = document.querySelector('.cpu h3');
cpuName.innerHTML = cpuPokemonName;
console.log(cpuName);

let cpuHP = document.querySelector('.cpu .health');
cpuHP.innerHTML = cpuPokemonHP;
console.log(cpuHP);
// players pokemon

let myPokemon = JSON.parse(Cookies.get('myPokemon'));

let myPokemonName = myPokemon['name'];
let myPokemonHP = myPokemon['hp'];
let myPokemonAttack = myPokemon['attack'];
let myPokemonImage = myPokemon['image'];

let myImage = document.querySelector('.player img').src = myPokemonImage;

console.log(myImage);

let myName = document.querySelector('.player h3');
myName.innerHTML = myPokemonName;
console.log(myName);

let myHP = document.querySelector('.player .health');
myHP.innerHTML = myPokemonHP;
console.log(myHP);

// let myPokemon = Cookies.get(myPokemon);
console.log(myPokemon['name']);
console.log(myPokemon);

/*    
    Deal with your "battle sequence" by:
        - Subtracting player attack damage from the CPU's health.
        - Record this action in your "battlelog" (tip: an array works well for the battlelog)
        - Subtracting CPU attack damage from the Player's health.
        - Record this action in your "battlelog"
        - Determining if there has been a win, loss, or draw.
        - Record the result in your "battlelog"
        - Save the updated game state (ie. player/cpu pokemon and health) to a cookie(s)
*/




   

