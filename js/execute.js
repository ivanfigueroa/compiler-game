/*global codIntermedio
        IF
        WHI
        ITERATE
        JMP
        FLIP
        PUTCARD
        GETCARD
        CALLCUSTOM
        RET
        FINAL
        SMALLER
        BIGGER
        SMALLEREQ
        BIGGEREQ
        EQUAL
        NOTEQUAL
        ISNOTEMPTY
        ISEMPTY
        ISRED
        ISBLACK
        ISHEART
        ISCLUBS
        ISDIAMOND
        ISSPADES
        NOTRED
        NOTBLACK
        NOTHEART
        NOTCLUBS
        NOTDIAMOND
        NOTSPADES
        programa
*/

var currentCard;
var retStack;
var decks;
var isStarted=false;

function init(){
    //this.game.state.start("the_state_name");
    //playGame.prototype.restart();
    //game.state.restart();
    if(isStarted){game.state.add("Play", playGame)
    game.state.start("Play");}

    isStarted =true;
    currentCard = -1;
    retStack = new Array();
    decks = new Array();

    for(var i = 0; i < 52; i++){
        decks.push(new Array())
    }
    decks[0]= deckbueno;

    for(var i = 0; i < 52; i++){
        console.log(i + " "+ decks[0][i]);
    }
    console.log("size of deck: " + decks[0].length );

}


function getColor(card){
    if(card < 26){
        return "black";
    }else{
        return "red";
    }
}

function getType(card){
    if(card < 13){
        return "spades";
    } else if (card < 26){
        return "clubs";
    } else if(card < 39){
        return "diamonds";
    } else{
        return "hearts";
    }
}

function getValue(card){
    var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return values[card%13];
}

function loop (i){
    if(codIntermedio[i] != FINAL){
        setTimeout(function(){
                switch (codIntermedio[i]) {
                case IF:
                case WHI:
                    i++;

                    if(codIntermedio[i] <= NOTEQUAL || codIntermedio[i] >= ISRED){
                        if(currentCard != -1){
                             switch(codIntermedio[i]){
                                case SMALLER:
                                    if(getValue(currentCard) < codIntermedio[i + 1]){
                                        i = i + 4;
                                    } else{
                                        i = i + 2;
                                    }
                                    break;

                                case BIGGER:
                                    if(getValue(currentCard) > codIntermedio[i + 1]){
                                        i = i + 4;
                                    } else{
                                        i = i + 2;
                                    }
                                    break;

                                case SMALLEREQ:
                                    if(getValue(currentCard) <= codIntermedio[i + 1]){
                                        i = i + 4;
                                    } else{
                                        i = i + 2;
                                    }
                                    break;

                                case BIGGEREQ:
                                    if(getValue(currentCard) >= codIntermedio[i + 1]){
                                        i = i + 4;
                                    } else{
                                        i = i + 2;
                                    }
                                    break;

                                case EQUAL:
                                    if(getValue(currentCard) == codIntermedio[i + 1]){
                                        i = i + 4;
                                    } else{
                                        i = i + 2;
                                    }
                                    break;

                                case NOTEQUAL:
                                    if(getValue(currentCard) != codIntermedio[i + 1]){
                                        i = i + 4;
                                    } else{
                                        i = i + 2;
                                    }
                                    break;

                                case ISRED:
                                    if(getColor(currentCard) === "red"){
                                        i = i + 3;
                                    }else{
                                        i = i + 1;
                                    }
                                    break;

                                case ISBLACK:
                                    if(getColor(currentCard) === "black"){
                                        i = i + 3;
                                    }else{
                                        i = i + 1;
                                    }
                                    break;

                                case ISHEART:
                                    if(getType(currentCard) === "hearts"){
                                        i = i + 3;
                                    } else{
                                        i = i + 1;
                                    }
                                    break;

                                case ISCLUBS:
                                     if(getType(currentCard) === "clubs"){
                                        i = i + 3;
                                    } else{
                                        i = i + 1;
                                    }
                                    break;

                                case ISDIAMOND:
                                     if(getType(currentCard) === "diamonds"){
                                        i = i + 3;
                                    } else{
                                        i = i + 1;
                                    }
                                    break;

                                case ISSPADES:
                                     if(getType(currentCard) === "spades"){
                                        i = i + 3;
                                    } else{
                                        i = i + 1;
                                    }
                                    break;

                                case NOTRED:
                                    if(getColor(currentCard) === "black"){
                                        i = i + 3;
                                    }else{
                                        i = i + 1;
                                    }
                                    break;

                                case NOTBLACK:
                                    if(getColor(currentCard) === "red"){
                                        i = i + 3;
                                    }else{
                                        i = i + 1;
                                    }
                                    break;

                                case NOTHEART:
                                    if(getType(currentCard) !== "hearts"){
                                        i = i + 3;
                                    }else{
                                        i = i + 1;
                                    }
                                    break;

                                case NOTCLUBS:
                                     if(getType(currentCard) !== "clubs"){
                                        i = i + 3;
                                    }else{
                                        i = i + 1;
                                    }
                                    break;

                                case NOTDIAMOND:
                                     if(getType(currentCard) !== "diamonds"){
                                        i = i + 3;
                                    }else{
                                        i = i + 1;
                                    }
                                    break;

                                case NOTSPADES:
                                     if(getType(currentCard) !== "spades"){
                                        i = i + 3;
                                    }else{
                                        i = i + 1;
                                    }
                                    break;

                            }
                        } else{
                            alert("You need to get a card first");
                            i = codIntermedio.length - 1;
                        }
                    } else{
                        switch(codIntermedio[i]){
                            case ISNOTEMPTY:
                                if(decks[codIntermedio[i + 1]].length > 0){
                                    i = i + 4;
                                }else{
                                    i = i + 2;
                                }
                                break;

                            case ISEMPTY:
                                if(decks[codIntermedio[i + 1]].length == 0){
                                     i = i + 4;
                                }else{
                                    i = i + 2;
                                }
                                break;
                        }
                    }

                    break;


                case ITERATE:
                    i++;
                    if(codIntermedio[i] > 0){
                        codIntermedio[i] = codIntermedio[i] - 1;
                        i = i + 3;
                    } else{
                        i = i + 1;
                    }

                    break;

                case JMP:
                    i = codIntermedio[i + 1];
                    break;

                case FLIP:
                    if(currentCard != -1){
                    playGame.prototype.flipCardAnimationRemote(currentCard);
                    i++;
                    }
                    else {
                        alert("You need to get a card first");
                        i = codIntermedio.length-1;
                    }
                    break;

                case GETCARD:
                    if(decks[codIntermedio[++i]].length != 0 && currentCard == -1){
                        currentCard = decks[codIntermedio[i++]].pop();
                        playGame.prototype.getCardAnimationRemote(currentCard);
                        //Animación de tomar carta.
                    }else {
                        alert("The deck is empty or you already have a card");
                        i = codIntermedio.length - 1;
                    }
                    break;

                case PUTCARD:
                    if(currentCard != -1){
                        decks[codIntermedio[++i]].push(currentCard);
                        playGame.prototype.putCardAnimationRemote(currentCard,codIntermedio[i]);
                        currentCard = -1;
                        i++;
                        //Animación de dejar carta;
                    }else{
                        alert("You need to get a card first");
                        i = codIntermedio.length - 1;
                    }
                    break;

                case CALLCUSTOM:
                    retStack.push(i + 2);
                    i = codIntermedio[i + 1];
                    break;

                case RET:
                    i = retStack.pop();
                    break;

            }
            loop (i);
        },100)

    }else {
        return;
    }
}

function execute(needsProgram){
    var i = 0;
    if(needsProgram)programa(false);
    //if(isStarted)game.state.start("PlayGame");
    init();
    loop(i);

}
