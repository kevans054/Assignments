/*
    Start by collecting your game data from your cookie(s) and assigning it to variable(s)...
    keep in mind that cookie data is stored as a string - be sure to use Number() if passing integers
    and JSON.parse if passing JSON as cookie data.
*/


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


/*
    - Use selectors to target and fill in the img, .name, and .health elements on battle.html
    - Display the .battlelog contents
    - If the battle is over, present the user with a button to go back to index.html to start a new round
      and also wipe the cookies. 
    - Otherwise, present the user with a button to refresh the page and complete the next battle sequence.
*/


function playRound(guess) {
    var possibilities = guess;
    gameCount++;
    console.log('Number of games is ' + gameCount);
    // Math.floor rounds any decimal number down to the whole number
    // Math.random() returns a floating-point, pseudo-random number in the range 0 to less than 1 (inclusive of 0, but not 1) 
    // Math.round method rounds a number to the nearest integer.
    var cointoss = Math.round(Math.random())
    var resultString = 'The coin came up ' + possibilities[cointoss];
    resultText.innerText = resultString;
}