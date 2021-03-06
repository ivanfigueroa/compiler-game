/*global getInput*/
/*global tokensArray*/
var index = 0;
var isCorrect=true;

//exigir
function exigir(x){
    return tokensArray[index++] === x;
}

//verificar
function verificar(x){
    if(tokensArray[index] === x){
        return true;
    }else{
        return false
    }
}

//<program> ::= "class" "program" "{" <functions> <main function> "}"
function program(){
    getInput();
    index = 0;
    if ( exigir("class") ) {
        if ( exigir("program") ) {
    	  if ( exigir("{") ) {
    	    if ( verificar( "void" ) ) {
    			functions();
    		}
    		main_function();
    		if ( !exigir("}") ) {
    		  alert("} is missing");
              isCorrect=false;

    		}
    	  }
    	  else {
    	    alert("{ is missing");
            isCorrect=false;
    	  }
    	}
    	else {
    	  alert("program is missing");
          isCorrect=false;
    	}
  }
  else {
     alert("class is missing");
     isCorrect=false;
  }

  if(isCorrect)
  alert("No hay errores");
}

//<functions> ::= <function> <functions alpha> | LAMBDA
function functions()
{
	single_function();
	functions_alpha();
}

//<functions alpha>  ::= <function> <functions alpha> | LAMBDA
function functions_alpha() {
  if ( verificar( "void" ) ) {
	single_function();
	functions_alpha();
  }
}

//<main function> ::= "program" "(" ")" "{" <body> "}"
function main_function(){
    if(exigir("program")){
       if(exigir("(")){
          if(exigir(")")){
              if(exigir("{")){
                  body();
                  if ( !exigir( "}" ) ) {
		            alert("} is missing");
                    isCorrect=false;
		          }
              } else{
                 alert("{ missing")
                 isCorrect=false;
              }
          } else{
              alert(") missing");
              isCorrect=false;
          }
       } else{
           alert("( missing");
           isCorrect=false;
       }
    }else{
        alert("program missing");
        isCorrect=false;
    }
}

//<function> := "void" <name function> "("   ")" "{" <body> "}"
function single_function() {
  if ( exigir( "void" ) ) {
	name_function();
	if ( exigir( "(" ) ) {
	  if ( exigir ( ")" ) ) {
	    if ( exigir ( "{"  ) ) {
	      body();
	      if ( !exigir( "}" ) ) {
		   alert("} is missing");
           isCorrect=false;
		  }
		} else {
		  alert("{ is missing");
          isCorrect=false;
		}
	  } else {
	   alert(") is missing")
       isCorrect=false;
	  }
	} else {
	  alert("( is missing")
      isCorrect=false;
	}
  } else {
   alert("void is missing");
   isCorrect=false;
  }
}

//<body> ::= <expression> <body alpha>
function body(){
    expression();
    body_alpha()
}

//<body alpha> ::= <expression> <body alpha> | LAMBDA
function body_alpha(){
    var expressions = ["if", "while", "iterate", "flip", "getCard", "putCard"];
    if(expressions.indexOf(tokensArray[index]) != -1 || terminales.indexOf(tokensArray[index]) == -1){
        expression();
        body_alpha();
    }

}

// <expression> ::= <call function> |<if expression> |<while expression> |<iterate expression>
function expression(){
    if(verificar("if")){
        if_expression();
    }else if(verificar("while")){
        while_expression();
    }else if(verificar("iterate")){
        iterate_expression()
    }else{
        call_function();
    }
}

// <call function> ::= <name of function>
function call_function(){
    name_function();
}

// <name of function> ::= <official function> | <customer function>
function name_function(){
    if((verificar("flip") || verificar("getCard") )|| verificar("putCard")){
        official_function();
    } else{
        customer_function();
    }
}

// <official function> ::=
//     "flip" |
//     "getCard" "(" <number of deck> ")" |
//     "putCard" "(" <number of deck> ")"
function official_function(){
    if(verificar("flip")){
        exigir("flip");
    } else if (verificar("getCard")){
        exigir("getCard");
        if(exigir("(")){
            number_of_deck();
            if(!exigir(")")){
                alert(") is missing");
                isCorrect=false;
            }
        }else{
            alert("( is missing");
            isCorrect=false;
        }
    } else if(verificar("putCard")){
        exigir("putCard");
        if(exigir("(")){
           number_of_deck();
           if(!exigir(")")){
                alert(") is missing");
                isCorrect=false;
            }
        }else{
            alert("( is missing");
            isCorrect=false;
        }
    }
}

// <customer function> ::= is a string with only letters that was defined in a <function> previously.
//cualquier string que no es una palabra resevada
function customer_function(){
     if(terminales.indexOf(tokensArray[index]) != -1){
         alert("Not a valid name");
         isCorrect=false;
     }
     index++;
}

// <if expression> ::= "if" ( <conditional> ) "{" <body> "}"  <elseif>
function if_expression(){
    if(exigir("if")){
        if(exigir("(")){
            conditional();
            if(exigir(")")){
                if(exigir("{")){
                    body();
                    if (exigir( "}" ) ) {
            		   elseif();
            		}else{
            		    alert("} is missing");
                        isCorrect=false;
            		}
                }else{
                    alert("{ is missing");
                    isCorrect=false;
                }
            }else{
                alert(") is missing");
                isCorrect=false;
            }
        }else{
            alert("( is missing");
            isCorrect=false;
        }
    }else{
        alert("if is missing");
        isCorrect=false;
    }
}

// <elseif> ::= "else" "{" <body> "}" | LAMBDA
function elseif(){
    if(verificar("else")){
        (exigir("else"));
        if(exigir("{")){
            body();
            if ( !exigir( "}" ) ) {
		        alert("} is missing");
                isCorrect=false;
		    }
        }else{
            alert("{ is missing");
            isCorrect=false;
        }
    }
}

// <while expression> ::= "while" "(" <conditional> ")" "{" <body> "}"
function while_expression(){
   if(exigir("while")){
       if(exigir("(")){
           conditional();
           if(exigir(")")){
               if(exigir("{")){
                   body();
                   if ( !exigir( "}" ) ) {
		               alert("} is missing");
                       isCorrect=false;
		           }
               }else{
                   alert("{ is missing");
                   isCorrect=false;
               }
           }else{
               alert(") is missing");
               isCorrect=false;
           }
       }else{
            alert("( is missing");
            isCorrect=false;
       }
   }else{
       alert("while is missing");
       isCorrect=false;
   }
}


// <iterate expression> ::= "iterate" "(" <number> ")" "{" <body> "}"
function iterate_expression(){
    if(exigir("iterate")){
        if(exigir("(")){
            number();
            if(exigir(")")){
                if(exigir("{")){
                    body();
                    if ( !exigir( "}" ) ) {
		               alert("} is missing");
                       isCorrect=false;
		           }
                }else{
                    alert("{ is missing");
                    isCorrect=false;
                }
            }else{
                alert(") is missing");
                isCorrect=false;
            }
        }else{
            alert("( is missing");
            isCorrect=false;
        }
    }else{
        alert("iterate is missing");
        isCorrect=false;
    }
}

// <conditional> ::= <card simple condition> | <card composed condition> | <deck simple condition>
function conditional(){
    if(verificar("VALUE")){
        card_compose_condition();
    }
    else if(verificar("isEmpty") || verificar("isNotEmpty")){
        deck_simple_condition();
    }
    else {
        card_simple_condition();
    }
}

// <number> ::= is a natural number between 1 - 13
function number(){
    var i
    for(i = 1; i <= 13; i++){
        if(verificar(i+"")){
            break;
        }
    }
    if(i > 13){
        alert("number is not between 1 - 13");
        isCorrect=false;
    }
    exigir(i);
}

// <number of deck> ::=  is a number between 0 to 52 ( inclusive )
function number_of_deck(){
    var i;
     for(i = 0; i <= 52; i++){
        if(verificar(i+"")){
            break;
        }
    }
    if(i > 52){
        alert("number of deck is not between 0 - 52");
        isCorrect=false;
    }
    exigir(i);
}


// <card composed condition> ::= "VALUE" <operator> <number>
function card_compose_condition(){
    if(exigir("VALUE")){
        operator();
        number();
    }else{
        alert("VALUE is missing");
        isCorrect=false;
    }
}

// <operator> ::=
//     "<"
//     | ">"
//     | "<="
//     | ">="
//     | "=="
//     | "!="
function operator(){
    var operators = ["<",">","<=",">=","==","!="];
    var isError= true;
    var i;
    for(i = 0; i < operators.length; i++){
        if(verificar(operators[i])){
            isError=false;
            break;
        }
    }
    if(isError){
        alert("operator is not valid");
        isCorrect=false;
    }
    exigir(operators[i]);
}


/*<card simple condition> ::=
  "isRed"
  | "isBlack"
  | "isHeart"
  | "isClubs"
  | "isDiamond"
  | "isSpades"
  | "isNotRed"
  | "isNotBlack"
  | "isNotHeart"
  | "isNotClubs"
  | "isNotDiamond"
  | "isNotSpades"*/
function card_simple_condition(){
    var simpleConditions = ["isRed","isBlack","isHeart","isClubs","isDiamond",
                            "isSpades","isNotRed","isNotBlack","isNotHeart",
                            "isNotClubs","isNotDiamond","isNotSpades"];
    var isError= true;
    var i;
    for(i = 0; i < simpleConditions.length; i++){
        if(verificar(simpleConditions[i])){
            isError = false;
            break;
        }
    }
    if(isError){
        alert("simple condition is not valid");
        isCorrect=false;
    }
    exigir(simpleConditions[i]);
}



// <deck simple condition> ::= isEmpty "(" <number of deck> ")" | isNotEmpty "(" <number of deck> ")"
function deck_simple_condition(){
    if(verificar("isEmpty") || verificar("isNotEmpty")){
        if(verificar("isEmpty"))
            exigir("isEmpty");
        if(verificar("isNotEmpty"))
            exigir("isNotEmpty");
        if(exigir("(")){
            number_of_deck();
            if(!exigir(")")){
                alert(") is missing");
                isCorrect=false;
            }
        }
        else{
            alert("(  is missing");
            isCorrect=false;
        }
    }
    else{
        alert("deck simple condition is missing");
        isCorrect=false;
    }
}
