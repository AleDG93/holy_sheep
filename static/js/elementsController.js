class ElementsController {


    drawCard(){

    }

    rewriteMap(data){

        

        /**
         * Roll and set results to die
         */
        this.rollDie(data.prevDice);


        /**
         * Apply changes to cards text area
         */

        var cardTitle = document.getElementById('card-title');
        var cardDescription = document.getElementById('card-description');
 
        if(data.cards[0] != null){
            cardTitle.innerHTML = data.cards[0].title;
            cardDescription.innerHTML = data.cards[0].description;
        }
        /**
         * Apply change to "Higher" or "Lower"
         */

        var higherButton = document.getElementById('higher-button');
        var lowerButton = document.getElementById('lower-button');
        if(data.button == 1){
            higherButton.setAttribute('class', 'btn btn-primary higher-lower');
            lowerButton.setAttribute('class', 'btn btn-outline-secondary higher-lower');
        } else if(data.button == 0){
            higherButton.setAttribute('class', 'btn btn-outline-secondary higher-lower');
            lowerButton.setAttribute('class', 'btn btn-primary higher-lower');
        }

        /**
         * Apply changes to the map
         */

        var mapDiv = document.getElementById('map-div');
        mapDiv.innerHTML = '';
        var colspan = Math.floor(12 / data.players.length);
        
        data.players.forEach(player => {
            console.log(player)
            var colDiv = document.createElement('div');
            colDiv.setAttribute('class', 'col-' + colspan);
            colDiv.setAttribute('id', player.id);

            // Create first row with button
            var rowDiv1 = document.createElement('div');
            rowDiv1.setAttribute('class', 'row');
            // Create button
            var labelPlayer = document.createElement('label');
            labelPlayer.setAttribute('id', player.id);
            labelPlayer.setAttribute('class', 'label-player');
            labelPlayer.innerHTML = player.name;

            // Append button to first row
            rowDiv1.appendChild(labelPlayer);

            // Create second row with map
            var rowDiv2 = document.createElement('div');
            rowDiv2.setAttribute('class', 'row');
            
            // Create large dive
            var largDiv = document.createElement('div');
            largDiv.setAttribute('class', 'large-8 large-centered');

            // Create map wrapper
            var wrapperDiv = document.createElement('div');
            wrapperDiv.setAttribute('class', 'map-wrapper');

            // Create map
            for(var i = 0; i < 10; i++){

                // Create player "pawn"
                var circleDiv = document.createElement('div');
                circleDiv.setAttribute('class', 'map-circle');
                var mapText = document.createElement('h5');
                mapText.setAttribute('class', 'map-text');
                if(i == player.position){
                    mapText.innerHTML = player.numOfSheep;
                }
                var verticalDiv = document.createElement('div');
                verticalDiv.setAttribute('class', 'vertical-line');

                // Append player "pawn" to map wrapper
                circleDiv.appendChild(mapText);
                wrapperDiv.appendChild(circleDiv);
                wrapperDiv.appendChild(verticalDiv);
            }


            // Create vertical hr
            var verticalHr = document.createElement('hr');
            verticalHr.setAttribute('class', 'vertical map-hr');

            // Append wrapper to large div
            largDiv.appendChild(wrapperDiv);
            
            // Append large div and vertical hr to row
            rowDiv2.appendChild(largDiv);
            rowDiv2.appendChild(verticalHr);

            // Append rows to col-1
            colDiv.appendChild(rowDiv1);
            colDiv.appendChild(rowDiv2);


            // Append colDiv to map-div
            mapDiv.insertBefore(colDiv, mapDiv.firstChild);
        });
    }

    rollDie(num) {
        const die = document.getElementById("die-1");
        this.toggleClasses(die);
        die.dataset.roll = num;
    }
      
    toggleClasses(die) {
        die.classList.toggle("odd-roll");
        die.classList.toggle("even-roll");
    }
}

module.exports = {ElementsController};