function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

function init() {
    currentScore = [0, 0];
    totalScore = [0, 0];
    activePlayer = 0;

    document.querySelector('.container-top-left').classList.add('active-player-top');
    document.querySelector('.container-top-right').classList.remove('active-player-top');

    document.querySelector('.container--left').classList.add('active-player');
    document.querySelector('.container--right').classList.remove('active-player');

    document.querySelector('.p0-winner').style.display = 'none';
    document.querySelector('.p1-winner').style.display = 'none';

    document.querySelector('.p0-current-score').textContent = '0';
    document.querySelector('.p0-total-score').textContent = '0';
    document.querySelector('.p1-current-score').textContent = '0';
    document.querySelector('.p1-total-score').textContent = '0';

    for (var i = 1; i <= 6; i++) {
        document.querySelector('.dice--' + i).style.display = 'none';
    }
};

function playerToggle() {
    document.querySelector('.container-top-left').classList.toggle('active-player-top');
    document.querySelector('.container-top-right').classList.toggle('active-player-top');
    document.querySelector('.container--left').classList.toggle('active-player');
    document.querySelector('.container--right').classList.toggle('active-player');

    currentScore = [0, 0];
    
    document.querySelector('.p0-current-score').textContent = '0';
    document.querySelector('.p1-current-score').textContent = '0';

    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
};

var currentScore = [0, 0], totalScore = [0, 0], activePlayer = 0, roll = 1;

init();

document.getElementById('btn-roll').addEventListener('click', function() {
    document.querySelector('.dice--' + roll).style.display = 'none';    // to hide the die after it has been shown once
    roll = getRndInteger(1, 6);
    if (totalScore[activePlayer] >= 20) {    // to make sure the game hasn't already been won
        init();
    } else {
        if (roll === 1) {
            currentScore[activePlayer] = 0;
            totalScore[activePlayer] = 0;
            document.querySelector('.p' + activePlayer + '-current-score').textContent = '0';
            document.querySelector('.p' + activePlayer + '-total-score').textContent = '0';
            document.querySelector('.dice--1').style.display = 'block';
            playerToggle();
        } else {
            currentScore[activePlayer] += roll;
            totalScore[activePlayer] += roll;
            document.querySelector('.p' + activePlayer + '-current-score').textContent = currentScore[activePlayer];
            document.querySelector('.p' + activePlayer + '-total-score').textContent = totalScore[activePlayer];
            document.querySelector('.dice--' + roll).style.display = 'block';
            if (totalScore[activePlayer] >= 20) {    // to show the game WINNER
                document.querySelector('.p' + activePlayer + '-winner').style.display = 'block';
            }
        }
    }
});

document.getElementById('btn-hold').addEventListener('click', function() {
    if (totalScore[activePlayer] >= 20) {   // making sure that the game would reset if a player clicks 'Hold' button after a game has been won
        init();
    } else {    // otherwise just switch to the other player
        playerToggle();
    }
});

document.getElementById('btn-reset').addEventListener('click', init);   // start-over

document.querySelector('.instructions').style.display = 'none';

document.querySelector('.how-to').addEventListener('click', () => {
    document.querySelector('.instructions').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.instructions').style.display = 'none';
});