/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundscore, activePlayer, previousdice, gameplayStatus, targetScore

//This calling resets all the variables of the game 
init()

//dice = Math.floor(Math.random() * 6) + 1


//function to give dice rolling chance to the next player
function nextPlayer(){
	//Next Player
		activePlayer === 0 ? activePlayer = 1 : activePlayer=0
		roundscore = 0

		document.getElementById('current-0').textContent = '0'
		document.getElementById('current-1').textContent = '0'

		//Changing the player who is active view status
		document.querySelector('.player-0-panel').classList.toggle('active')
		document.querySelector('.player-1-panel').classList.toggle('active')
		
		document.querySelector('.dice-1').style.display = 'none'
		document.querySelector('.dice-2').style.display = 'none'


}

document.querySelector('.submit-button').addEventListener('click', function(){
	targetScore = document.getElementById('highscore-input').value

	if(targetScore > 500 || targetScore <= 10){
		return
	}
	else{
		document.getElementById('highscore-input').style.display = 'none'
		document.querySelector('.submit-button').style.display= 'none'
		gameplayStatus = true;
	}

})



//Event Listener 1: DICE ROLL ---> Handling event listener for the dice rolling !

document.querySelector('.btn-roll').addEventListener('click', function(){

	if(gameplayStatus){

	//Select dice number at random
	var dice_1 = Math.floor(Math. random() * 6) + 1;
	var dice_2 = Math.floor(Math. random() * 6) + 1;


	//Display the results
	var dice1DOM = document.querySelector('.dice-1')
	var dice2DOM = document.querySelector('.dice-2')
	
	dice1DOM.style.display = 'block'
	dice2DOM.style.display = 'block'
	
	dice1DOM.src = 'dice-'+dice_1+'.png'
	dice2DOM.src = 'dice-'+dice_2+'.png'

	//When you get two 6s in a row
	if((dice_1 == 6 || dice_2 == 6) && previousdice == 6){
		
		score[activePlayer] = Math.floor(score[activePlayer]*0.5)
		document.getElementById('score-'+activePlayer).textContent = score[activePlayer]
		nextPlayer()

	}

	//Update the score unless the dice score is 1
	if(dice_1 != 1 && dice_2 != 1){
		//Add score 
		roundscore += dice_1 + dice_2
		document.querySelector('#current-'+ activePlayer).textContent = roundscore
	}
	
	else
		nextPlayer()

	dice_1 == 6 ? previousdice = dice_1 : previousdice = dice_2


}		

})


//Event Listener 2: HOLD BUTTON  ---> Handling event listener for the hold button !

document.querySelector('.btn-hold').addEventListener('click', function(){

	if(gameplayStatus){

	//Adding the CURRENT score to GLOBAL score
	score[activePlayer] += roundscore

	//Update the UI
	document.querySelector('#score-'+activePlayer).textContent = score[activePlayer]	
	//nextPlayer()


	//Check if the player has won the game
	if(score[activePlayer] >= targetScore){
		document.getElementById('name-'+activePlayer).textContent = 'Winner !'
		document.querySelector('.dice-1').style.display = 'none'
		document.querySelector('.dice-2').style.display = 'none'
		document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active')
		document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
		gameplayStatus = false
	}

	else
		nextPlayer()
}	
	
})


//Event Listener 3: NEW GAME BUTTON  ---> Handling event listener for the new game !
//Initialization code is produced here

function init(){

	score = [0,0]
	roundscore = 0
	activePlayer = 0
	//gameplayStatus = true

	document.querySelector('.dice-1').style.display = 'none'
	document.querySelector('.dice-2').style.display= 'none'
	document.getElementById('score-0').textContent = '0'
	document.getElementById('score-1').textContent = '0'
	document.getElementById('current-0').textContent = '0'
	document.getElementById('current-1').textContent = '0'

	document.getElementById('name-0').textContent = 'Player 1'
	document.getElementById('name-1').textContent = 'Player 2'

	document.querySelector('.player-0-panel').classList.remove('winner')
	document.querySelector('.player-1-panel').classList.remove('winner')

	document.querySelector('.player-0-panel').classList.add('active')

	document.getElementById('highscore-input').style.display = 'block'
	document.getElementById('highscore-input').value = ''
	document.querySelector('.submit-button').style.display= 'block'

}

document.querySelector('.btn-new').addEventListener('click', init)



