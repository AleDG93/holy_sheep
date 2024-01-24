import { Card } from "@adalgobbo/commons/src/models/card";
import { Heaven } from "@adalgobbo/commons/src/models/heaven";

var file = require('../../cards.json');

export class DocumentController {

    /***********************************************************************
     ***********************************************************************
     *****                     Player controllers                   ********
     ***********************************************************************
     ***********************************************************************
     */

    gainSheep(playerId: any, gameDocument: any) {

        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.numOfSheep = newPlayer.numOfSheep + 1;
        gameDocument.submitOp([{ p: ['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer }]);
    }

    loseSheep(playerId: any, gameDocument: any) {

        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.numOfSheep = newPlayer.numOfSheep - 1;
        gameDocument.submitOp([{ p: ['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer }]);
    }

    goBackward(playerId: any, gameDocument: any) {
        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.position = newPlayer.position - 1;
        gameDocument.submitOp([{ p: ['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer }]);
    }
    goForward(playerId: any, gameDocument: any) {
        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.position = newPlayer.position + 1;
        gameDocument.submitOp([{ p: ['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer }]);
    }
    getRelationSheep(playerId: any, gameDocument: any) {
        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.gadget.push('relation');
        gameDocument.submitOp([{ p: ['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer }]);

    }
    getWorSheep(playerId: any, gameDocument: any) {

        var newPlayer = gameDocument.data.players[playerId];
        newPlayer.gadget.push('worsheep');
        gameDocument.submitOp([{ p: ['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer }]);
    }

    loseRelationSheep(playerId: any, gameDocument: any) {

        var newPlayer = gameDocument.data.players[playerId];
        var newGadgets = newPlayer.gadget.filter((e: any) => e !== 'relation');
        newPlayer.gadget = newGadgets;
        gameDocument.submitOp([{ p: ['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer }]);
    }

    loseWorSheep(playerId: any, gameDocument: any) {

        var newPlayer = gameDocument.data.players[playerId];
        var newGadgets = newPlayer.gadget.filter((e: any) => e !== 'worsheep');
        newPlayer.gadget = newGadgets;
        gameDocument.submitOp([{ p: ['players', playerId], ld: gameDocument.data.players[playerId], li: newPlayer }]);

    }

    /***********************************************************************
     ***********************************************************************
     *****                     Game controllers                     ********
     ***********************************************************************
     ***********************************************************************
     */

    selectedHigher(gameDocument: any) {
        var result = 1 - gameDocument.data.button;
        gameDocument.submitOp([{ p: ['button'], na: result }]);
    }

    selectedLower(gameDocument: any) {
        var result = 0 - gameDocument.data.button;
        gameDocument.submitOp([{ p: ['button'], na: result }]);
    }

    throwDie(gameDocument: any) {

        var result = (Math.floor(Math.random() * 6) + 1) - gameDocument.data.prevDice;  // returns a random integer from 1 to 6
        gameDocument.submitOp([{ p: ['prevDice'], na: result }]);
    }

    throwDice(playerId: any, gameDocument: any) {



        var result1 = (Math.floor(Math.random() * 6) + 1);  // returns a random integer from 1 to 6
        var result2 = (Math.floor(Math.random() * 6) + 1);  // returns a random integer from 1 to 6

        var newHeaven = new Heaven(result1, result2, gameDocument.data.heaven[0].players);
        newHeaven.players[playerId] = (result1 + result2);
        gameDocument.submitOp([{ p: ['heaven', 0], ld: gameDocument.data.heaven[0], li: newHeaven }]);
    }

    shuffleDeck(gameDocument: any) {
        var listOfCards = this.shuffle(file.cards);

        listOfCards.forEach((card: any) => {
            var newCard = new Card(card.title, card.description);
            gameDocument.submitOp([{ p: ['cards', 0], li: newCard }]);
        });
    }

    drawCard(gameDocument: any) {

        if (gameDocument.data.cards.length == 0) {
            this.shuffleDeck(gameDocument);
        }
        var card = new Card(gameDocument.data.cards[0].title, gameDocument.data.cards[0].description);
        gameDocument.submitOp([{ p: ['cards', 0], ld: card }]);
    }


    shuffle(array: any) {
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