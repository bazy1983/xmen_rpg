
    var character = [
    {
        name: "Wolverine",
        health: 150,
        attack: 6,
        counterAttack: 5
    },
    {
        name: "Cyclops",
        health: 120,
        attack: 9,
        counterAttack: 10
    },
    {
        name: "Phenox",
        health: 130,
        attack: 10,
        counterAttack: 15
    },
    {
        name: "Storm",
        health: 110,
        attack: 8,
        counterAttack: 20
    },
    ],
    isEmpty = true, //detect if the player drop box is empty
    isEmpty1 = true, // detect if the defender box is empty
    dragged, // temporarily storing the dragged item
    player = 0, //stores the player
    defender = 0, // stores the defender
    exp = 1, //incrementer for player attack value
    playerCharacter = 0, // store player character object
    defenderCharacter = 0, // store defender character object
    playerLifeFactor,
    defenderLifeFactor; // this is the visual representation of HP


$(document).ready (function(){
//when attack button clicked
    $("#attack").on("click", function(){
        //console.log (defenderCharacter[0].health);

        // Game logic ######
        if (playerCharacter[0].health > 0) {
            if (defenderCharacter[0].health > 0){
                defenderCharacter[0].health -= (playerCharacter[0].attack * exp);
                //console.log ("defender health:" + defenderCharacter[0].health + " attack: " + (playerCharacter[0].attack* exp))
                playerCharacter[0].health -= defenderCharacter[0].counterAttack;
                

                //passing values to the document
                $("#playerHP").text(playerCharacter[0].health)
                        .height(playerCharacter[0].health/playerLifeFactor + "%");

                $("#defenderHP").text(defenderCharacter[0].health)
                                .height(defenderCharacter[0].health/defenderLifeFactor + "%");

                //when defender dies
                if (defenderCharacter[0].health <= 0){
                    $("#opponent").empty().toggleClass("glow")
                                .html("<p>Drag your opponent characher and drop it here</p>");
                    isEmpty1 = true; //this will make the defender box droppable again
                }
                exp++;
                if (playerCharacter[0].health <=0) {// when the player character dies
                    $("#player").empty().toggleClass("glow")
                                .html("<p>Your Character died!</p>");
                    $("#opponent").empty().toggleClass("glow")
                                  .html("<p>GAME OVER!</p>");
                    isEmpty1 = false;
                };
                //console.log ("exp: "+ exp)
            };
            
        };
        
        




        
    });




});
    



// DRAG AND DROP functionality start #####################
function allowDrop(ev) {

    ev.preventDefault();
};

//storing img element values
function drag(cardNumber) {

    dragged = $(cardNumber);    
    //console.log ("player: " + player + " Defender: " + defender) 
}


function drop(ev) {
    
    if (isEmpty){
        ev.preventDefault();
        $("#player").empty().toggleClass("glow");
        //console.log (player.attr("alt"));
        $("#player").append(dragged);
        player = dragged;
        isEmpty = false; 
        var audio = new Audio('./media/mount.mp3');
        audio.play();
        if (!isEmpty && !isEmpty1) {
            $("#attack").fadeIn();
            linkCharToObj();
        }
    };
}

function drop1(ev) {
    
    if (isEmpty1){ // prevent drpping more that one item
        ev.preventDefault();
        $("#opponent").empty().toggleClass("glow");
        $("#opponent").append(dragged);
        defender = dragged;
        //console.log (defender);
        isEmpty1 = false;
        var audio = new Audio('./media/mount.mp3');
        audio.play();

        if (!isEmpty && !isEmpty1) {
            $("#attack").fadeIn();
            linkCharToObj();
        }
    };
}
    // drag and drop functionality ends ###################


    
    function linkCharToObj () {
    var x = player.attr("alt"), //storing text value from alt attr
        y = defender.attr("alt"); //storing text value from alt attr

        // linking object to the character using the text and name property
        var playerCharacter = $.grep(character, function(e){  // player
            return e.name == x;
        });
        //console.log ("Player Character object: " + playerCharacter);


        var defenderCharacter = $.grep(character, function(e){  //defender
            return e.name == y;
        });
        //console.log("defender Character object: " + defenderCharacter);
        playerLifeFactor = playerCharacter[0].health/100;
        defenderLifeFactor = defenderCharacter[0].health/100;
        $("#playerHP").text(playerCharacter[0].health)
                      .height(playerCharacter[0].health/playerLifeFactor + "%");

        $("#defenderHP").text(defenderCharacter[0].health)
                        .height(defenderCharacter[0].health/defenderLifeFactor + "%");


        //convert the scope of variables to global
        window.playerCharacter = playerCharacter;
        window.defenderCharacter = defenderCharacter;
        window.playerLifeFactor = playerLifeFactor;
        window.defenderLifeFactor = defenderLifeFactor;
        
    };