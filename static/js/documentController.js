var {Player} = require('../../entities/player');
var {Card} = require('../../entities/card');
var file = require('../../cards.json');

class DocumentController {

    /***********************************************************************
     ***********************************************************************
     *****                     Player controllers                   ********
     ***********************************************************************
     ***********************************************************************
     */

    gainSheep(playerId, gameDocument){

        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.numOfSheep = newPlayer.numOfSheep + 1;
        gameDocument.submitOp([{p:['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer}]);
    }
    
    loseSheep(playerId, gameDocument){
    
        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.numOfSheep = newPlayer.numOfSheep - 1;
        gameDocument.submitOp([{p:['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer}]);
    }

    goBackward(playerId, gameDocument){
        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.position = newPlayer.position - 1;
        gameDocument.submitOp([{p:['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer}]);
    }
    goForward(playerId, gameDocument){
        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.position = newPlayer.position + 1;
        console.log(newPlayer);
        gameDocument.submitOp([{p:['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer}]);
    }
    getRelationSheep(playerId, gameDocument){
        
    }
    getWorSheep(playerId, gameDocument){
        
    }
    loseRelationSheep(playerId, gameDocument){
        
    }
    loseWorSheep(playerId, gameDocument){
    }

    /***********************************************************************
     ***********************************************************************
     *****                     Game controllers                     ********
     ***********************************************************************
     ***********************************************************************
     */

    selectedHigher(gameDocument){
        var result = 1 - gameDocument.data.button;
        gameDocument.submitOp([{p:['button'], na: result}]);
    }

    selectedLower(gameDocument){
        var result = 0 - gameDocument.data.button;
        gameDocument.submitOp([{p:['button'], na: result}]);
    }

    throwDie(gameDocument){

        var result = (Math.floor(Math.random() * 6) + 1) - gameDocument.data.prevDice;  // returns a random integer from 1 to 6
        gameDocument.submitOp([{p:['prevDice'], na: result}]);
    }

    shuffleDeck(gameDocument){
        var listOfCards = this.shuffle(file.cards);
        
        listOfCards.forEach(card => {
            var newCard = new Card(card.title, card.description);
            gameDocument.submitOp([{p:['cards', 0], li: newCard}]);    
        });

 
    }

    drawCard(gameDocument){

        if(gameDocument.data.cards.length == 0){
            this.shuffleDeck(gameDocument);
        }
        var card = new Card(gameDocument.data.cards[0]);
        gameDocument.submitOp([{p:['cards', 0], ld: card}]);    
    }
    

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
}

module.exports = {DocumentController}