/*global getInput*/
/*global tokensArray*/
/*global terminales*/

var index       = 0,
    INICIO_PROG = 10001,
    IF          = 10002,
    WHI         = 10003,
    ITERATE     = 10004,
    RETURN      = 10005,  
    JMP         = 10006,
    FIN         = 10007,
    FLIP        = 10008,
    GETCARD     = 10009,
    PUTCARD     = 10010;
    
var printValue = ["INICIO_PROG", "IF", "WHILE", "ITERATE", "RETURN", "JMP", "FIN", "FLIP", "GETCARD", "PUTCARD" ];
    

var stack = new Array();
var codIntermedio = new Array(); 
var k = 0; //index for codIntermedio Array

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
function programa(){
    getInput();
    stack = new Array();
    codIntermedio = new Array(); 
    k = 0;
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
    		}
    	  }
    	  else {
    	    alert("{ is missing");
    	  }
    	}
    	else {
    	  alert("program is missing");
    	}
  }
  else {
     alert("class is missing");
  }
  var message = "Lo que tiene el stack: \n";
  var codeToPrint;
  for(var i = 0 ; i< codIntermedio.length ; i++){
      codeToPrint=codIntermedio[i];
      if(codeToPrint>10000)  codeToPrint= printValue[codeToPrint-10001];
      else if(codeToPrint==200) codeToPrint= "Conditional";
      //else if(codeToPrint==201) codeToPrint= "Conditional";
      message+=(i + "**"+codeToPrint+"**\n");
  }
  alert(message);
  
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
		          }
              } else{
                 alert("{ missing")
              }
          } else{
              alert(") missing");
          }
       } else{
           alert("( missing");
       }
    }else{
        alert("program missing");
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
		  }
		} else {
		  alert("{ is missing");
		}
	  } else {
	   alert(") is missing")
	  }
	} else {
	  alert("( is missing")
	}
  } else {
   alert("void is missing");
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
        codIntermedio.push(FLIP);
        k++;
    } else if (verificar("getCard")){
        exigir("getCard");
        codIntermedio.push(GETCARD);
        k++;
        if(exigir("(")){
            number_of_deck();
            codIntermedio.push(tokensArray[index-1]);
            k++;
            if(!exigir(")")){
                alert(") is missing");
            }
        }else{
            alert("( is missing");
        }
    } else if(verificar("putCard")){
        exigir("putCard");
        codIntermedio.push(PUTCARD);
        k++;
        if(exigir("(")){
           number_of_deck();
           codIntermedio.push(tokensArray[index-1]);
            k++;
           if(!exigir(")")){
                alert(") is missing");
            }
        }else{
            alert("( is missing");
        }
    }
}

// <customer function> ::= is a string with only letters that was defined in a <function> previously.
//cualquier string que no es una palabra resevada
function customer_function(){
     if(terminales.indexOf(tokensArray[index]) != -1){
         alert("Not a valid name");
     }
     index++;
     //corrections?
     //agragar el string a nuestra tabla de simbolos y asignarle valor
     //
    codIntermedio.push(404);
    k++;
}

// <if expression> ::= "if" ( <conditional> ) "{" <body> "}"  <elseif>
function if_expression(){
    if(exigir("if")){
        codIntermedio.push(IF);
        k++;
        if(exigir("(")){
            conditional();
            codIntermedio.push(200);
            k++;
            if(exigir(")")){
                if(exigir("{")){
                    codIntermedio.push(JMP);
                    k++;
                    codIntermedio.push(-1);
                    stack.push(k++);
                    body();
                    if (exigir( "}" ) ) {
            		   elseif();
            		}else{
            		    alert("} is missing");
            		}
                }else{
                    alert("{ is missing");
                }
            }else{
                alert(") is missing");
            }
        }else{
            alert("( is missing");
        }
    }else{
        alert("if is missing");
    }
}

// <elseif> ::= "else" "{" <body> "}" | LAMBDA
function elseif(){
    if(verificar("else")){
        (exigir("else"));
        if(exigir("{")){
            codIntermedio[stack.pop()] = k + 2;
            codIntermedio.push(JMP);
            k++;
            codIntermedio.push(-1);
            stack.push(k++);
            body();
            if ( !exigir( "}" ) ) {
		        alert("} is missing");
		    }
		    codIntermedio[stack.pop()] = k;
        }else{
            alert("{ is missing");
        }
    }else{
        codIntermedio[stack.pop()] = k;
    }
}

// <while expression> ::= "while" "(" <conditional> ")" "{" <body> "}"
function while_expression(){
   if(exigir("while")){
       stack.push(k);
       codIntermedio.push(WHI);
       k++;
       if(exigir("(")){
           conditional();
           codIntermedio.push(200);
           k++;
           if(exigir(")")){
               if(exigir("{")){
                   codIntermedio.push(JMP);
                   k++;
                   codIntermedio.push(-1);
                   stack.push(k++);
                   body();
                   codIntermedio.push(JMP);
                   k++;
                   codIntermedio[stack.pop()] = k + 1;
                   codIntermedio.push(stack.pop());
                   k++;
                  
                   if ( !exigir( "}" ) ) {
		               alert("} is missing");
		           }
               }else{
                   alert("{ is missing");
               }
           }else{
               alert(") is missing");
           }
       }else{
            alert("( is missing");
       }
   }else{
       alert("while is missing");
   }
}


// <iterate expression> ::= "iterate" "(" <number> ")" "{" <body> "}"
function iterate_expression(){
    if(exigir("iterate")){
        stack.push(k);
        codIntermedio.push(ITERATE);
        k++;
        if(exigir("(")){
            number();
            codIntermedio.push(201);
            k++;
            if(exigir(")")){
                if(exigir("{")){
                    codIntermedio.push(JMP);
                    k++;
                    codIntermedio.push(-1);
                    stack.push(k++);
                    body();
                    codIntermedio.push(JMP);
                    k++;
                    codIntermedio[stack.pop()] = k + 1;
                    codIntermedio.push(stack.pop());
                    k++;
                    if ( !exigir( "}" ) ) {
		               alert("} is missing");
		           }
                }else{
                    alert("{ is missing");
                }
            }else{
                alert(") is missing");
            }
        }else{
            alert("( is missing");
        }
    }else{
        alert("iterate is missing");
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
            }
        }
        else{
            alert("(  is missing");
        }
    }
    else{
        alert("deck simple condition is missing");
    }
}


