/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

additional rules
- allow user to set winning score
- 2nd dice in the game
- autoplay
*/
var scores, roundScore, activePlayer, dice1, dice2, gamePlaying, winningScore;

init();

function diceThrow(){ //random number between 1-6
    return Math.floor(Math.random() *6) + 1;
}

function rollEvent(){
    if(gamePlaying){
        dice1 = diceThrow();
        dice2 = diceThrow()
        var diceDom = document.querySelector('.dice');
        var dice2Dom = document.querySelector('.dice2');
    
        diceDom.style.display = 'block'; //make it visible again
        dice2Dom.style.display = 'block'; //make it visible again
        diceDom.src = 'dice-'+dice1+'.png';
        dice2Dom.src = 'dice-'+dice2+'.png';
    
        document.getElementById('action-'+activePlayer).textContent = 'Roll';
        
        if(dice1 !== 1 && dice2 !==1){
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-'+activePlayer).textContent = roundScore; 
        }else{
            //next player
            //document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            switchPlayer();
            
        }
    }
}

document.querySelector('.btn-roll').addEventListener('click', rollEvent);

function holdEvent(){
    if(gamePlaying){
        //update score
        scores[activePlayer] += roundScore;

        // udpate ui
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
        document.getElementById('action-'+activePlayer).textContent = 'Hold';

        // check winner
        if(scores[activePlayer] >= winningScore){
            document.getElementById('name-'+activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        }else{
                switchPlayer(); 
        }
    }
}

document.querySelector('.btn-hold').addEventListener('click', holdEvent);

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-random').addEventListener('click', function(){
    setInterval('rollOrHold()',1000);
});

function isRandonRoll(){
    var random = Math.floor(Math.random()*2);
    if(random == 0){
        //console.log('random roll ' + random);
        return true;
    }else{
        //console.log('random hold ' + random);
        return false;
    }
}

function rollOrHold(){
    if(gamePlaying){        
        if(roundScore != 0){
            isRandonRoll() ? rollEvent() : holdEvent();
        }else{
            rollEvent();
        }
    }
}

function switchPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //document.querySelector('.player-'+ activePlayer + '-panel').classList.add('active');
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';    

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

/*     document.getElementById('action-0').textContent = '';
    document.getElementById('action-1').textContent = ''; */
}

function isEmpty(value){
    return value === null || value === undefined || value == "";
}

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    winningScore = 100;
    
    var socre_input = document.getElementById('winning-score').value;    
    if(!isEmpty(socre_input)){
        console.log('not empty');
        winningScore = socre_input;
    }

    document.querySelector('.dice').style.display = 'none'; //accessing css to make it invisible
    document.querySelector('.dice2').style.display = 'none'; //accessing css to make it invisible
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('action-0').textContent = '';
    document.getElementById('action-1').textContent = '';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}


