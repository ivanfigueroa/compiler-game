var game;
var flags = [];
var gameOptions = {
    gameWidth: 800 ,
    gameHeight: 800,
    cardSheetWidth: 334,
    cardSheetHeight: 440,
    cardScale: 0.2
}
var deck,
    deckXPosition,
    deckYPosition,
    cardsInGame,
    nextCardIndex,
    deckIndex,
    delay=1;

var deckbueno = [];


window.onload = function() {

    game = function() {
        this._construct();
    }

    /*game.prototype = {    _game,
         _construct: function(){
             this._game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, "phaser-cards");
         },
         phaserFunction: function(){       //do the thing    }}var game = new Game();//Now you can do this anywhere you want.game.phaserFunction();*/

    game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, "phaser-cards");

    game.state.add("PlayGame", playGame)
    game.state.start("PlayGame");
}
var playGame = function(game) {}
playGame.prototype = {
    preload: function() {
        game.load.spritesheet("cards", "assets/deck.png", gameOptions.cardSheetWidth, gameOptions.cardSheetHeight);
        game.load.image("back" , "assets/back.png");
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    create: function() {
        game.stage.backgroundColor = "#477148";
        deck = Phaser.ArrayUtils.numberArray(0, 51); //create array
        Phaser.ArrayUtils.shuffle(deck);    //randomize order
        deckXPosition = this.makeXcoordinates(7);
        deckYPosition = this.makeYcoordinates(8);
        cardsInGame = this.makeCards();    // initialize 2 cards?
        nextCardIndex = 51;
        deckIndex = 1;
        game.input.onDown.add(this.beginSwipe, this);
    },
    makeCards: function() {
        var cards = [];
        for (var i = 0; i < 52; i++) {
            cards[i]  = this.makeCard(i,deckXPosition[0],deckYPosition[0]);
        }
        return cards;
    },
    makeCard: function(cardIndex, x, y) {
        var card;
        //if(cardIndex>-1){
        //card = game.add.sprite(gameOptions.cardSheetWidth * gameOptions.cardScale / -2, game.height / 2, "cards");
        card = game.add.sprite(x, y, "cards");
        //}
        card.anchor.set(0.5);
        card.scale.set(gameOptions.cardScale);
        //card.frame = deck[cardIndex];
        card.inputEnabled = true;
        card.input.enableDrag(true);
        deckbueno[cardIndex] = deck[cardIndex];
        card.frame = 52;
        return card;
    },
    makeXcoordinates: function(x) {
        var pos = []
        var xWidth = (gameOptions.gameWidth/x);
        var xCord = xWidth -(xWidth/2) - (xWidth/18) ;
        for (var i = 0; i < x; i++) {
             pos[i] = xCord;
             xCord+= xWidth;
        }
        var xArrayPositions = []
        for (var i = 0; i < 53; i++) {
            xArrayPositions[i] = pos[i%x];
        }
        return xArrayPositions;
    },
    makeYcoordinates: function(y) {
        var pos = []
        var yWidth = (gameOptions.gameHeight/y);
        var yCord = yWidth -(yWidth/2);
        for (var i = 0; i < y; i++) {
             pos[i] = yCord;
             yCord+= yWidth;
        }
        var yArrayPositions = []
        var yposIndex = 0;
        var counter=y;
        for (var i = 0; i < 53; i++) {
            yArrayPositions[i] = pos[yposIndex];
            counter--;
            if(counter==1){
                yposIndex ++;
                counter=y;
            }


        }
        return yArrayPositions;
    },
    beginSwipe: function(e) {
        game.input.onDown.remove(this.beginSwipe, this);
        game.input.onUp.add(this.endSwipe, this);
    },
    endSwipe: function(e) {
        game.input.onUp.remove(this.endSwipe, this);
        var swipeTime = e.timeUp - e.timeDown;
        var swipeDistance = Phaser.Point.subtract(e.position, e.positionDown);
        var swipeMagnitude = swipeDistance.getMagnitude();
        var swipeNormal = Phaser.Point.normalize(swipeDistance);
        if(swipeMagnitude > 20 && swipeTime < 1000 && Math.abs(swipeNormal.y) > 0.8) {
                this.handleSwipe(-1);
        } else {
            game.input.onDown.add(this.beginSwipe, this);
        }
    },
    handleSwipe: function(dir) {
        /*this.cardsInGame[this.nextCardIndex].frame = this.deck[this.nextCardIndex];
        game.world.bringToTop(this.cardsInGame[this.nextCardIndex]);
        var tween = game.add.tween(this.cardsInGame[this.nextCardIndex]).to({
            x: [500, this.deckXPosition[this.deckIndex]], y: [250, this.deckYPosition[this.deckIndex]]
        }, 500, Phaser.Easing.Cubic.Out, true);
        tween.onComplete.add(function() {
            game.input.onDown.add(this.beginSwipe, this);
            this.nextCardIndex--;
            this.deckIndex++;
        }, this)*/
        var j = 0;
        this.moveToDeckAnimation(j);
        for (var i = 0; i < 52; i++) {

            //
            this.doSetTimeOut(1000).then(() => {

            //j++;
            /*setTimeout(function(){
                console.log("hola" + j);
                this.doSetTimeOut(3000).then(() => {

                var indexOfCard = this.nextCardIndex;
                var indexOfDeck = j;
                game.world.bringToTop(this.cardsInGame[indexOfCard]);
                this.cardsInGame[indexOfCard].frame = this.deck[indexOfCard];
                var tween = game.add.tween(this.cardsInGame[indexOfCard]).to({
                    x: [this.deckXPosition[indexOfDeck]], y: [this.deckYPosition[indexOfDeck]]
                }, 1000, Phaser.Easing.Cubic.Out, true);
                tween.onStart.add(function() {
                    this.cardsInGame[indexOfCard].scale.set(gameOptions.cardScale*1.8);
                }, this);
                tween.onComplete.add(function() {
                    this.cardsInGame[indexOfCard].scale.set(gameOptions.cardScale);
                }, this);
                this.nextCardIndex--;
                this.deckIndex++;
                j++;
                    });

            }.call(this) , i*5000);*/

            });



        }
        /*for (var i = 0; i < 52; i++) {
        //    setTimeout(function(){
                //function_parameterized = this.moveToDeck(this.nextCardIndex, i);
                //setTimeout(function_parameterized , 200000000);
                this.nextCardIndex--;
                this.deckIndex++;

            //}, 200);
        }*/
        game.input.onDown.add(this.beginSwipe, this);
    },
    doSetTimeOut: function (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    },
    moveToDeckAnimation: function (j) {
        setTimeout(function() {
            console.log("hola" + j);
            var indexOfCard = nextCardIndex;
            var indexOfDeck = j
            game.world.bringToTop(cardsInGame[indexOfCard]);
            cardsInGame[indexOfCard].frame = deck[indexOfCard];
            var tween = game.add.tween(cardsInGame[indexOfCard]).to({
                x: [deckXPosition[indexOfDeck]], y: [deckYPosition[indexOfDeck]]
            }, 100/(j+1), Phaser.Easing.Cubic.Out, true);
            tween.onStart.add(function() {
                //this.doSetTimeOut(j*100).then(() => {
                cardsInGame[indexOfCard].scale.set(gameOptions.cardScale*1.1);
            //});
            }, this);
            tween.onComplete.add(function() {
                cardsInGame[indexOfCard].scale.set(gameOptions.cardScale)
                nextCardIndex--;
                var jnew = j+1;
                if(jnew<52) this.moveToDeckAnimation(jnew);
            }, this);

        }.call(this), j * 10 );
    },
    moveToDeckAnimationRemote: function (indexOfCard, indexOfDeck) {
        this.moveToDeckAnimation(0)
    },
    flipCardAnimationRemote: function (indexOfCard) {
        cardsInGame[deck.indexOf(indexOfCard)].frame = deck[deck.indexOf(indexOfCard)];
    },
    getCardAnimationRemote: function (indexOfCard) {
        game.world.bringToTop(cardsInGame[deck.indexOf(indexOfCard)]);
        cardsInGame[deck.indexOf(indexOfCard)].scale.set(gameOptions.cardScale*1.2);
    },
    putCardAnimationRemote: function (indexOfCard, indexOfDeck) {
        var tween = game.add.tween(cardsInGame[deck.indexOf(indexOfCard)]).to({
            x: [deckXPosition[indexOfDeck]], y: [deckYPosition[indexOfDeck]]
        }, 100, Phaser.Easing.Cubic.Out, true);
        tween.onComplete.add(function() {
            cardsInGame[deck.indexOf(indexOfCard)].scale.set(gameOptions.cardScale)

        },this);
        delay++;
    },

    moveToDeck: function(indexOfCard, indexOfDeck) {
        game.world.bringToTop(this.cardsInGame[indexOfCard]);
        this.cardsInGame[indexOfCard].frame = this.deck[indexOfCard];
        var tween = game.add.tween(this.cardsInGame[indexOfCard]).to({
            x: [this.deckXPosition[indexOfDeck]], y: [this.deckYPosition[indexOfDeck]]
        }, 500, Phaser.Easing.Cubic.Out, true);
        tween.onStart.add(function() {
            this.cardsInGame[indexOfCard].scale.set(gameOptions.cardScale*1.8);
        }, this);
        //tween.onComplete.add(this.completed(indexOfCard), this);
        tween.onComplete.add(function() {
            this.cardsInGame[indexOfCard].scale.set(gameOptions.cardScale);
        }, this);
    },
    moveCards: function() {
        var cardToMove = this.nextCardIndex % 2;
        var moveOutTween = game.add.tween(this.cardsInGame[cardToMove]).to({
            x: game.width + gameOptions.cardSheetWidth * gameOptions.cardScale
        }, 500, Phaser.Easing.Cubic.Out, true);
        cardToMove = (this.nextCardIndex + 1) % 2
        var moveDownTween = game.add.tween(this.cardsInGame[cardToMove]).to({
            y: game.height / 2
        }, 500, Phaser.Easing.Cubic.Out, true);
        moveDownTween.onComplete.add(function() {
            var cardToMove = this.nextCardIndex % 2
            this.cardsInGame[cardToMove].frame = this.deck[this.nextCardIndex];
            this.nextCardIndex = (this.nextCardIndex + 1) % 52;
            this.cardsInGame[cardToMove].x = gameOptions.cardSheetWidth * gameOptions.cardScale / -2;
            game.input.onDown.add(this.beginSwipe, this);
        }, this)
    },
    removeAllCards: function () {
        for (var i = 0; i < cardsInGame.length; i++) {
            cardsInGame[i].x = -200;
            cardsInGame[i].y = -200;
        }
    },
    restart: function () {
        alert("restarting");
        deck = Phaser.ArrayUtils.numberArray(0, 51); //create array
        Phaser.ArrayUtils.shuffle(deck);    //randomize order
        this.removeAllCards();
        cardsInGame = this.makeCards();    // initialize 2 cards?
        nextCardIndex = 51;
        deckIndex = 1;
    }

}
