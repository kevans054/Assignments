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


// cpu's pokemon
let cpuPokemon = JSON.parse(Cookies.get('cpuPokemon'));
let cpuPokemonName = cpuPokemon['name'];
let cpuPokemonHP = cpuPokemon['hp'];
let cpuPokemonAttack = cpuPokemon['attack'];
let cpuPokemonImage = cpuPokemon['image'];

let cpuImage = document.querySelector('.cpu img').src = cpuPokemonImage;

let cpuName = document.querySelector('.cpu h3');
cpuName.innerHTML = cpuPokemonName;

let cpuHP = document.querySelector('.cpu .health');
cpuHP.innerHTML = cpuPokemonHP;


// players pokemon
let myPokemon = JSON.parse(Cookies.get('myPokemon'));
let myPokemonName = myPokemon['name'];
let myPokemonHP = myPokemon['hp'];
let myPokemonAttack = myPokemon['attack'];
let myPokemonImage = myPokemon['image'];

let myImage = document.querySelector('.player img').src = myPokemonImage;

let myName = document.querySelector('.player h3');
myName.innerHTML = myPokemonName;

let myHP = document.querySelector('.player .health');
myHP.innerHTML = myPokemonHP;


let mygameWins = 0;
let cpugameWins = 0;
let cpuDamage = 0;
let playerDamage = 0;
let cpuScore = 0;
let myScore = 0;
let winner;
let thewinner;
let gameCount = 0;

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


// Battle

let title = document.createElement('header');
let titleElement = document.querySelector('body');
titleElement.prepend(title);
titleElement.classList.add("logo");

// create status bar


// Add listener to battle button
let battleBtn = document.querySelector('.game-button').innerHTML = 'Battle';
battleBtn = document.querySelector('.game-button').addEventListener('click', function () {



    if (cpuPokemonHP > 0 && myPokemonHP > 0) {


        cpuDamage = (cpuPokemonHP - myPokemonAttack);
        console.log(cpuDamage);
        cpuPokemonHP = cpuDamage;
        cpuHP.innerHTML = cpuDamage;


        playerDamage = (myPokemonHP - cpuPokemonAttack);
        console.log(playerDamage);
        myPokemonHP = playerDamage;
        myHP.innerHTML = playerDamage;

        gameCount++;

    } else if (myPokemonHP != 0 && cpuPokemonHP == 0) {
        console.log('first else if');
            let playerWinMsg = document.createElement('h1');
            let playerWinNode = document.createTextNode("Winner");
            playerWinMsg.appendChild(playerWinNode);
            let playerWinElement = document.getElementById('player');
            playerWinElement.appendChild(playerWinMsg);
            winner = 'player';
            Battlelog(winner);

        } else if (myPokemonHP == 0 && cpuPokemonHP != 0) {
            console.log('second else if');
            let cpuWinMsg = document.createElement('h1');
            let cpuWinNode = document.createTextNode("Winner");
            cpuWinMsg.appendChild(cpuWinNode);
            let cpuWinElement = document.getElementById('cpu');
            cpuWinElement.appendChild(cpuWinMsg);
            winner = 'cpu';
            Battlelog(winner);
        }
        else {
            console.log('draw');
            winner = 'draw';
            Battlelog(winner);
        }
    });



function Battlelog(winner) {
    let mygameLosses = 0;
    let cpugameLosses = 0;
    thewinner = winner;

    if (thewinner == 'player') {

        mygameWins++;
        cpugameLosses--;
        myScore = (mygameWins - mygameLosses);
        cpuScore = (cpugameWins - cpugameLosses);
        Cookies.set('myScore', myScore);
        Cookies.set('cpuScore', cpuScore);

        console.log(winner);
        console.log(myScore);
        console.log(cpuScore);

    } else if (thewinner == 'cpu'){

        cpugameWins++;
        mygameLosses--;
        cpuScore = (cpugameWins - cpugameLosses);
        console.log(cpuScore);

        myScore = mygameWins - mygameLosses;
        console.log(myScore);

        Cookies.set('myScore', myScore);
        Cookies.set('cpuScore', cpuScore);

        console.log(winner);
        
    }else{

        console.log('its a draw');
    }

    Cookies.set('myScore', myScore);
    Cookies.set('cpuScore', cpuScore);

    console.log(winner);
    console.log(myScore);
    console.log(cpuScore);
};

// add button and event listener to reset the game to 0

let resetButton = document.createElement('button');
let resetNode = document.createTextNode('New Game');
resetButton.appendChild(resetNode);
let resetElement = document.querySelector('footer');
resetElement.appendChild(resetButton);
resetButton.addEventListener('click', function () {
        Cookies.remove('cpuScore');
        Cookies.remove('myScore');
        location.reload();
    //     upDateScoreBoard();
    // console.log("new score");
})







