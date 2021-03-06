//Pokemon Battle
//Karen Evans
//November 28, 2020

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
// let scoreCookie = Cookies.get('scoreCookie');
let cpuScore = Cookies.get('cpuScore');
let mygameWins = Cookies.get('mygameWins') || 0;
let cpugameWins = Cookies.get('cpugameWins') || 0;
let mygameLosses = Cookies.get('mygameLosses');
let cpugameLosses = Cookies.get('cpugameLosses');
let gameCookie = Cookies.get('gameData');

let cpuDamage = 0;
let playerDamage = 0;
let thewinner;
let gameCount = 0;


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
cpuHP.innerText = cpuPokemonHP;

let cpuAttack = document.getElementById('cpuAttack');
cpuAttack.innerText = 'Atk: ' + cpuPokemonAttack;


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

let myAttack = document.getElementById('playerAttack');
myAttack.innerText = 'Atk: ' + myPokemonAttack;


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


//Logo

let title = document.createElement('header');
let titleElement = document.querySelector('body');
titleElement.prepend(title);
titleElement.classList.add("logo");

// create status bar
let statusbarElement = document.createElement('h1');
let statusbarNode = document.createTextNode('Current Score:  ' + 'Player:' + '   ' + mygameWins + '        ' + 'Computer:' + '   ' + cpugameWins + '   ');
statusbarElement.appendChild(statusbarNode);
let scoreboardElement = document.querySelector('div');
scoreboardElement.appendChild(statusbarElement);


// scoreboard
function upDateScoreBoard(thewinner) {
    if (thewinner == 'player') {
        statusbarElement.innerText = ('Current Score:  ' + 'Player:' + '   ' + mygameWins + '        ' + 'Computer:' + '   ' + cpugameWins + '   ');
    } else if (thewinner == 'cpu') {
        statusbarElement.innerText = ('Current Score:  ' + 'Player:' + '   ' + mygameWins + '        ' + 'Computer:' + '   ' + cpugameWins + '   ');
    } else {
        statusbarElement.innerText = 'Current Score: Its a draw!';
    }
};

// Add listener to battle button
let battleBtn = document.querySelector('.game-button').innerHTML = 'Battle';
battleBtn = document.querySelector('.game-button').addEventListener('click', function () {

    if (cpuPokemonHP > 0 && myPokemonHP > 0) {
        cpuDamage = (cpuPokemonHP - myPokemonAttack);
        cpuPokemonHP = cpuDamage;
        cpuHP.innerHTML = cpuDamage;


        playerDamage = (myPokemonHP - cpuPokemonAttack);
        myPokemonHP = playerDamage;
        myHP.innerHTML = playerDamage;

        gameCount++;
        Battlelog(cpuPokemonName, cpuDamage, cpuPokemonAttack, myPokemonName, playerDamage, myPokemonAttack);

    } else if (myPokemonHP != 0 && cpuPokemonHP == 0) {
        let playerWinMsg = document.createElement('h1');
        let playerWinNode = document.createTextNode("Winner");
        playerWinMsg.appendChild(playerWinNode);
        let playerWinElement = document.getElementById('player');
        playerWinElement.appendChild(playerWinMsg);
        winner = 'player';
        Battles(winner);

    } else if (myPokemonHP == 0 && cpuPokemonHP != 0) {
        let cpuWinMsg = document.createElement('h1');
        let cpuWinNode = document.createTextNode("Winner");
        cpuWinMsg.appendChild(cpuWinNode);
        let cpuWinElement = document.getElementById('cpu');
        cpuWinElement.appendChild(cpuWinMsg);
        winner = 'cpu';
        Battles(winner);
    }
    else {
        winner = 'draw';
        Battles(winner);
        upDateScoreBoard(winner);
    }
});


function Battlelog(cpuPokemonName, cpuDamage, cpuAttack, myPokemonName, playerDamage, myPokemonAttack) {
    let index = 0;
    const attack = [];
    attack[index] = {
        cpuPokemon: cpuPokemonName,
        cpuHealth: cpuDamage,
        CpuAttack: cpuAttack,
        myPokemon: myPokemonName,
        myHealth: playerDamage,
        myAttack: myPokemonAttack
    }
    index++;

    for (let i = 0; i < attack.length; i++) {

        let listItem = document.createElement('li');
        let battleNode = document.querySelector('.battlelog');
        battleNode.appendChild(listItem);
        listItem.innerText = (attack[i].cpuPokemon + ' attack: ' + attack[i].CpuAttack + ' Damage to: ' + attack[i].myPokemon + ': ' + "" + attack[i].myHealth + '\n'
            + attack[i].myPokemon + ' attack: ' + attack[i].myAttack + ' Damage to: ' + attack[i].cpuPokemon + ': ' + attack[i].cpuHealth);
    }
}


function Battles(winner) {

    thewinner = winner;

    if (thewinner == 'player') {

        mygameWins++;
        Cookies.set('mygameWins', mygameWins);
        cpugameLosses++;
        Cookies.set('cpugameLosses', cpugameLosses);
        upDateScoreBoard(thewinner);


    } else if (thewinner == 'cpu') {

        cpugameWins++;
        Cookies.set('cpugameWins', cpugameWins);
        mygameLosses++;
        Cookies.set('mygameLosses', mygameLosses);
        upDateScoreBoard(thewinner);
    } else {

        upDateScoreBoard(thewinner);
    }
};


// add button and event listener to reset the pokemon health and battle again
let newBattleButton = document.createElement('button');
let newBattleNode = document.createTextNode('New Battle');
newBattleButton.appendChild(newBattleNode);
let newBattleElement = document.querySelector('footer');
newBattleElement.appendChild(newBattleButton);

newBattleButton.addEventListener('click', function () {

    location.reload();
    Cookies.get('mygameWins');
    Cookies.get('cpugameWins');
});

// select a new pokemon
let selectNewBtn = document.createElement('button');
let selectNode = document.createTextNode('Get New Pokemon');
selectNewBtn.appendChild(selectNode);
let selectElement = document.querySelector('footer');
selectElement.appendChild(selectNewBtn);

selectNewBtn.addEventListener('click', function () {
    Cookies.remove('myPokemon');
    window.location.href = 'index.html';

});

//create reset button
let resetButton = document.createElement('button');
let footer = document.querySelector('footer');
footer.appendChild(resetButton);
resetButton.innerText = 'Reset Game';
resetButton.addEventListener('click', function () {

    Cookies.remove('losses');
    window.location.href = 'index.html';
    Cookies.remove('mygameWins');
    Cookies.remove('mygameLosses');
    Cookies.remove('cpugameWins');
    Cookies.remove('cpugameLosses');
    console.log('removed cookies.');

    upDateScoreBoard();
});







