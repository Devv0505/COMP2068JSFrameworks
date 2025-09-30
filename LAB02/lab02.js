// Importing the prompt package
const prompt = require('prompt');

// Starting the prompt
prompt.start();

//Asking the user for their selection
prompt.get(['userSelection'], function (err, result) {
    if (err) {
        console.log('Error:', err);
        return;
    }

    // Converting user input to uppercase to match options
    let userSel = result.userSel.toUpperCase();

    //Generating computer selection using Math.random()
    let randomNumber = Math.random();
    let compSel = '';

    if (randomNumber >= 0 && randomNumber <= 0.34) {
        compSel = 'PAPER';
    } else if (randomNumber > 0.34 && randomNumber <= 0.67) {
        compSel = 'SCISSORS';
    } else {
        compSel = 'ROCK';
    }

    //Displaying the selections
    console.log('User Selection:', userSel);
    console.log('Computer Selection:', compSel);

    //Determining the winner
    if (userSel === compSel) {
        console.log("It's a tie");
    } else if (
        (userSel === 'ROCK' && compSel === 'SCISSORS') ||
        (userSel === 'SCISSORS' && compSel === 'PAPER') ||
        (userSel === 'PAPER' && compSel === 'ROCK')
    ) {
        console.log("User Wins");
    } else if (
        (compSel === 'ROCK' && userSel === 'SCISSORS') ||
        (compSel === 'SCISSORS' && userSel === 'PAPER') ||
        (compSel === 'PAPER' && userSel === 'ROCK')
    ) {
        console.log("Computer Wins");
    } else {
        console.log("Invalid input! Please choose ROCK, PAPER, or SCISSORS.");
    }
});
