//Declaración Variables
const input = document.querySelector("input");
const btn = document.querySelector("button"); 

const inicio = document.getElementById("contenedor");
const error = document.getElementById("contenedor1");
const correcto = document.getElementById("contenedor2");

const btnagain = document.getElementsByClassName("btntryagain");
const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");


initialForm()


//Agregar un espacio automatico en el Input con Jquery (Habilitar Delete y Suprimir)
$(document).ready(Principal);
    function Principal(){
        var flag1 = true;

        $(document).on('keydown','[id=cardinput]',function(e){
            flag1 = true;

          if (e.keyCode == 8 || e.keyCode == 46) {
              flag1 = false;
          }
          
            if($(this).val().length == 4 && flag1) {
                $(this).val($(this).val()+" ");
            }
          
          if($(this).val().length == 9 && flag1) {
                $(this).val($(this).val()+" ");
            }
          
          if($(this).val().length == 14 && flag1) {
                $(this).val($(this).val()+" ");
            }
        });
    }



//Eliminar demás formularios    
function initialForm() {
    error.classList.add("desaparecer");
    correcto.classList.add("desaparecer");
}



//Limitar la cantidad de digitos ingresados permitidos
input.addEventListener('input',function(){
    
    if (input.value.length > 14) {
        input.value = input.value.slice(0,19); 
        input.setCustomValidity("");
        
    } else if (input.value.length > 0) {
        input.setCustomValidity("Please enter valid values");
    }
  })


//Función eliminar Espacios Array
Array.prototype.clean = function( deleteValue ) {
    for ( let i = 0, j = this.length ; i < j; i++ ) {
      if ( this[ i ] == deleteValue ) {
        this.splice( i, 1 );
        i--;
      }
    }
    return this;
  };


  
function validar() {
    
    let pattern = /[0-9, ]{15,}/;

    if (input.value == 0) {
        input.setCustomValidity("Please complete the field");

    } else{
        if (pattern.test(input.value)) {
            
            btn.setAttribute("type", "button");

            //Obtener Array y eliminar espacios.
            let arraycard = Array.from(input.value);
            arraycard.clean(" ");

            //Convertir Array en Númerico
            arraycard = Array.from(arraycard, Number).reverse()

            //Obtener los digitos ingresados para mostrarlos posteriormente.
            let numeros = Array.from(input.value);
            

            for (let i = 1; i < arraycard.length; i+=2) {
                let impar = arraycard[i]
                arraycard[i]=impar*2;

                if (arraycard[i]>=10) {
                    let num = String(arraycard[i])
                    let suma = 0;
                    
                    //Suma de Dígitos de los Números mayores a 10.
                    num = num.split('').forEach(num => suma += parseInt(num));
                    arraycard[i]=suma;
                }
                
            }

            //Suma de todos los elementos del Array
            let suma2 = 0;
            arraycard.forEach (function(sumarraycard){
                suma2 += sumarraycard;
            });


            let cardnumber = "";

            //Mostrar los numeros de la tarjeta censurados
            for (let i = 0; i < numeros.length; i++) {
                if(numeros.length<17 && i>2 && i<14 && (i+1)%4===0) {
                    cardnumber = cardnumber+ "#" + " ";
                } else if (numeros.length>18 && i>13) {
                    cardnumber = cardnumber+numeros[i]
                } else if (numeros.length>17 && numeros.length<19 && i>13) {
                    cardnumber = cardnumber+numeros[i]
                } else if (numeros.length>15 && numeros.length<18 && i>11) {
                    cardnumber = cardnumber+numeros[i]
                } else if (numeros.length>14 && numeros.length<16 && i>10) {
                    cardnumber = cardnumber+numeros[i]
                } else if(numeros[i]===" "){
                    cardnumber = cardnumber + " "
                } else {
                    cardnumber = cardnumber + "#";
                };
            }

            //Condición para saber que pantalla mostrar
            if (suma2%10==0) {
                inicio.classList.add("desaparecer")
                error.classList.add("desaparecer")
                correcto.classList.remove("desaparecer")
                correcto.children[0].children[0].children[0].children[0].classList.add("animacion")

                message2.innerText = cardnumber;

            } else {
                inicio.classList.add("desaparecer")
                correcto.classList.add("desaparecer")
                error.classList.remove("desaparecer")
                error.children[0].children[0].children[0].children[0].classList.add("animacion")

                message1.innerText = cardnumber;
            }
        } else {
            input.setCustomValidity("Please enter valid values");
        }
    }
}

//Boton Volver a Intentar
function again() {
    input.value="";
    inicio.classList.remove("desaparecer")
    correcto.classList.add("desaparecer")
    error.classList.add("desaparecer")
    btn.setAttribute("type", "submit");    
}