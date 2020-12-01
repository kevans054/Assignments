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
Cookies.get('scoreCookie');
Cookies.get('myScore');
Cookies.get('cpuScore');
Cookies.get('mygameWins');
Cookies.get('cpugameWins');
Cookies.get('mygameLosses');
Cookies.get('cpugameLosses');

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


let cpuDamage = 0;
let playerDamage = 0;
let winner;
let thewinner;
let gameCount = 0;
let mygameWins = 0;
let mygameLosses =0;
let cpugameLosses = 0;
let cpugameWins = 0;

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
let scoreboard = document.createElement('h1');
let scoreboardNode = document.createTextNode('Current Score:');
scoreboard.appendChild(scoreboardNode);
let scoreboardElement = document.querySelector('div');
scoreboardElement.appendChild(scoreboard);

// Cookies.get('scoreCookie', scoreCookie);

function upDateScoreBoard(thewinner) {
 console.log('scoreboard');
 console.log(Cookies.get('cpugameWins'));
    if (thewinner = 'player') {
        
        if (Number(Cookies.get('cpugameWins')) &&  Number(Cookies.get('mygameWins'))){
        scoreboard.innerText = 'Current Score: ' + myPokemonName + ':   ' + Cookies.get('mygameWins') + '             ' + cpuPokemonName + ':   ' + Cookies.get('cpugameWins');
        console.log('scoreboard if');
        }
    }else {
        if (thewinner == 'cpu'){
            console.log('scoreboard else');
        Number(Cookies.set('cpugameWins', '1')) && Number(Cookies.get('mygameWins', '0'))
        scoreCookie = scoreboard.innerText = 'Current Score: ' + myPokemonName + ':   ' + Cookies.get('mygameWins') + '             ' + cpuPokemonName + ':   ' + Cookies.get('cpugameWins');
        } else {
            Number(Cookies.set('cpugameWins', '0')) && Number(Cookies.get('mygameWins', '1'))
        scoreCookie = scoreboard.innerText = 'Current Score: ' + myPokemonName + ':   ' + Cookies.get('mygameWins') + '             ' + cpuPokemonName + ':   ' + Cookies.get('cpugameWins');
        }
    };
};

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
        Battlelog(cpuPokemonName, cpuDamage, myPokemonName, playerDamage);

    } else if (myPokemonHP != 0 && cpuPokemonHP == 0) {
        console.log('first else if');
            let playerWinMsg = document.createElement('h1');
            let playerWinNode = document.createTextNode("Winner");
            playerWinMsg.appendChild(playerWinNode);
            let playerWinElement = document.getElementById('player');
            playerWinElement.appendChild(playerWinMsg);
            winner = 'player';
            Battles(winner);

        } else if (myPokemonHP == 0 && cpuPokemonHP != 0) {
            console.log('second else if');
            let cpuWinMsg = document.createElement('h1');
            let cpuWinNode = document.createTextNode("Winner");
            cpuWinMsg.appendChild(cpuWinNode);
            let cpuWinElement = document.getElementById('cpu');
            cpuWinElement.appendChild(cpuWinMsg);
            winner = 'cpu';
            Battles(winner);
        }
        else {
            console.log('draw');
            winner = 'draw';
            Battles(winner);
            upDateScoreBoard(winner);
        }
    });

    function Battlelog(cpuPokemonName, cpuDamage, myPokemonName, playerDamage) {
        
       
        let index;
        let attacks = [

            'index:',
            cpuPokemonName[index],
            cpuDamage,
            myPokemonName,
            playerDamage
        ];
        index++;
        // console.log(attacks[index]);
    }


function Battles(winner) {
    
    thewinner = winner;

    if (thewinner == 'player') {
        if (Number(Cookies.get('mygameWins')) && Number(Cookies.get('mygameLosses'))){
        mygameWins++;
        
        myScore = (mygameWins - mygameLosses);
        cpuScore = (cpugameWins - cpugameLosses);
        Cookies.set('myScore', myScore);
        cpugameLosses--;
        upDateScoreBoard(thewinner);

        console.log(winner);
        console.log(myScore);
        console.log(cpuScore);
        }else {
            Number(Cookies.set('mygameWins', '0')) && Number(Cookies.set('mygameLosses', '0'))
            mygameWins++;
        
        myScore = (mygameWins - mygameLosses);
        cpuScore = (cpugameWins - cpugameLosses);
        Cookies.set('myScore', myScore);
        cpugameLosses--;
        upDateScoreBoard(thewinner);
        }
    

    } else if (thewinner == 'cpu'){
        if (Number(Cookies.get('cpugameWins')) && Number(Cookies.get('cpugameLosses'))){
    
        cpugameWins++;
        mygameLosses++;
        cpuScore = (cpugameWins - cpugameLosses);
        console.log(cpuScore);

        myScore = mygameWins - mygameLosses;
        console.log(myScore);

        Cookies.set('myScore', myScore);
        Cookies.set('cpuScore', cpuScore);
        Cookies.set('mygameWins', mygameWins);
        Cookies.set('cpugameWins', cpugameWins);
        upDateScoreBoard(thewinner);

        console.log(winner);
        }else if (Number(Cookies.set('cpugameWins','0')) && Number(Cookies.set('cpugameLosses','0')));
        
    }else{
        thewinner = "draw";
        console.log('its a draw');
        upDateScoreBoard(thewinner);
    }

    console.log(winner);
    // console.log(myScore);
    // console.log(cpuScore);
};




// add button and event listener to reset the pokemon health and battle again
let newBattleButton = document.createElement('button');
let newBattleNode = document.createTextNode('New Battle');
newBattleButton.appendChild(newBattleNode);
let newBattleElement = document.querySelector('footer');
newBattleElement.appendChild(newBattleButton);

newBattleButton.addEventListener('click', function () {
    // Cookies.set('myScore', myScore);
    // Cookies.set('cpuScore', cpuScore);
    // Cookies.set('mygameWins', mygameWins);
    // Cookies.set('cpugameWins', cpugameWins);
        location.reload();
        // upDateScoreBoard();
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







