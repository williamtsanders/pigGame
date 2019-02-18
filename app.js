

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying, previousScore, input, winningScore, dice, diceSum;

init()

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        dice = [roll(), roll()];
        diceSum = dice[0] + dice[1];
        console.log(dice);
        console.log(activePlayer);

        doubleSixCheck();
        
        var dice0DOM = document.querySelector('.dice0');
        dice0DOM.style.display = 'block';
        dice0DOM.src = 'dice-' + dice[0] + '.png';

        var dice1DOM = document.querySelector('.dice1');
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice[1] + '.png';
    
        if (dice.includes(1) === false) {
            roundScore += diceSum;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        input = document.querySelector('.winningScore').value;

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice0').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            // activePlayer wins
        } else {
            nextPlayer();
        }
    }  
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice0').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


};

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice') === 'none';
};


function roll() {
   return Math.floor(Math.random() * 6) + 1;
}

function doubleSixCheck() {
    if (dice[0] === 6 && dice[1] === 6) {
        previousScore = 0;
        nextPlayer();
        //checks
    } else if (dice.includes(6) === false) {
        previousScore = 0;
        //checks
    } else if (dice.includes(6) && previousScore !== 6) {
        previousScore = 6;
        //checks
    } else  if (dice.includes(6) && previousScore === 6) {
        nextPlayer();
        previousScore = 0;       
    }
}
// dice = Math.floor(Math.random() * 6) + 1;

// document.querySelector('#current-' + activePlayer).textContent = dice;

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'