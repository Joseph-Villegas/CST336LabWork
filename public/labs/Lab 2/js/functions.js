var randomNumber = Math.floor(Math.random() * 99) + 1;
var guesses = document.querySelector('#guesses');
var lastResult = document.querySelector('#lastResult');
var lowOrHigh = document.querySelector(('#lowOrHigh'));

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;

var gamesWon = document.querySelector('#gamesWon');
var gamesLost = document.querySelector('#gamesLost');

var gWon = 0;
var gLost = 0;

var resetButton = document.querySelector('#reset');
// resetButton.style.display= 'none';
$('#reset').css('display', 'none');


guessField.focus();

function checkGuess() {
    var userGuess = Number(guessField.value);
    if (guessCount == 1) {
        guesses.innerHTML = 'Previous guesses: ';
        gamesWon.innerHTML = 'Games won: ' + gWon;
        gamesLost.innerHTML = 'Games lost: ' + gLost;
    }
    // guesses.innerHTML += userGuess + ' ';
    $('#guesses').append(userGuess + ' ');
    
    if (userGuess == randomNumber) {
        lastResult.innerHTML = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHigh.innerHTML = '';
        gWon++
        setGameOver();
    } else if (guessCount == 7) {
        lastResult.innerHTML = 'Sorry, you lost!';
        gLost++;
        setGameOver();
    } else {
        lastResult.innerHTML = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHigh.innerHTML = 'Last guess was to low!';
        } else if (userGuess > randomNumber) {
            if (userGuess > 99) {
                guessCount--;
            }
            lowOrHigh.innerHTML = 'Last guess was too high';
        }
    }
    
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

// guessSubmit.addEventListener('click', checkGuess);
$('#Submit-guess').on('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    // resetButton.style.display = 'inline';
    $('#reset').css('display', 'inline');
    // resetButton.addEventListener('click', resetGame);
    $('#reset').on('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    
    var resetParas =  document.querySelectorAll('.resultParas p');
    for(var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    
    // resetButton.style.display = 'none';
    $('#reset').css('display', 'none');
    
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    
    lastResult.style.backgroundColor = 'white';
    
    randomNumber = Math.floor(Math.random() * 99) + 1;
}
