var matrix = [];
var tokensArray;
var terminales = ["class", "program", "{", "}", "(", ")", "void", "if", "while", "iterate", "flip", "getCard", "putCard", "else", "isRed", "isBlack", "isHeart", "isClubs", 
                "isDiamond", "isSpades", "isNotRed", "isNotBlack", "isNotHeart", "isNotClubs", "isNotDiamond", "isNotSpades", "VALUE", "<", ">", "<=", ">=", 
                "==", "!=", "isEmpty", "isNotEmpty"]; 
                
var feedback = document.getElementById("feedbackText");
feedback.style.display ="none";


function getInput(){
    matrix=[];
    var tokens = document.getElementById('textarea1').value.split('\n');
    //tokensArray = document.getElementById('textarea1').value.split(/[^\s]+/g);
    tokensArray = document.getElementById('textarea1').value.replace( /\n/g, " " ).split(/\s+/g);
    
    
    //var tokens = document.getElementById('textarea1').innerHTML.split('\n');
    
    
    
    var counter= 0;
    for(var i = 0; i < tokens.length; i++){
        matrix[i] = tokens[i].split(/\s+/g);
    }
    /*
    for(var i = 0; i < matrix.length; i++){
        for(var j = 0; j < matrix[i].length; j++){
            console.log("**"+matrix[i][j]+"**");
            counter++;
        }
    }
    alert(counter);*/
   /* console.log(tokensArray.length);
    for(var i = 0; i < tokensArray.length; i++){
            console.log("**"+tokensArray[i]+"**");
            counter++;
    }
    console.log("tienes :" + counter);
    */
}

function analyze(){
    getInput();
    feedback.style.display = "block";
    var htmlText = document.getElementById('textarea1').value.replace(/\n/g,"<br>");
    feedback.innerHTML = htmlText;
    var instance = new Mark(document.querySelector(".context"));

    var err = '';
    for(var i = 0; i < matrix.length; i++){
        for(var j = 0; j < matrix[i].length; j++){
            if(terminales.indexOf(matrix[i][j]) == -1){
                if(isNaN(matrix[i][j])){
                    if(!/^[a-zA-Z]+$/.test(matrix[i][j])){
                        err+= "Error en la linea: " + (i+1) + " palabra: "+ (j+1) + '\n';
                        instance.mark(matrix[i][j]);
                    }
                }
            }
        }
    }
    
    if(err == ''){
        err = "No hay errores."
        feedback.style.display ="none";
    }
    showErrors(err);
}

function showErrors(err){
    alert(err);
}