const input = document.querySelector("input");
const btn = document.querySelector("button"); 

const inicio = document.getElementById("contenedor");
const error = document.getElementById("contenedor1");
const correcto = document.getElementById("contenedor2");

const btnagain = document.querySelectorAll("#btntryagain");
const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");


//Habilitar teclas especiales, space, delete, suprimir
input.addEventListener("keydown", function(e){
    let code = e.which || e.keyCode,
    allowedKeys = [8, 9, 13, 27, 35, 36, 37, 38, 39, 46, 110, 190, 32, 17, 86];

    if(allowedKeys.indexOf(code) > -1) {return;}
    if((e.shiftKey || (code < 48 || code > 57)) && (code < 96 || code > 105)) {
      e.preventDefault();
    }

    let length = input.value.length
    if((length === 4 || length === 9 || length === 14) && length>1 && e.keyCode !== 8 && e.keyCode !== 46){
        input.value = input.value + " "
    }
})

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
function cleanArray(array){
    for (let i = 0; i < array.length; i++) {
        if(array[i] === " "){
            array.splice(i, 1)
        }
    }
}

btn.addEventListener("click", function(){
    validar()
})
  
function validar() {
    let pattern = /[0-9, ]{15,}/;

    if (input.value === 0) {
        input.setCustomValidity("Please complete the field");

    } else{
        if (pattern.test(input.value)) {
            btn.setAttribute("type", "button");

            //Obtener Array, eliminar espacios y convertir a numérico.
            let arraycard = Array.from(input.value);
            cleanArray(arraycard);
            arraycard = Array.from(arraycard, Number).reverse()

            //Obtener los digitos ingresados para mostrarlos posteriormente.
            let numeros = Array.from(input.value);
            cleanArray(numeros)
            

            for (let i = 1; i < arraycard.length; i+=2) {
                arraycard[i] *= 2;
                console.log("hola")

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
            arraycard.forEach(sumarraycard =>{
                suma2 += sumarraycard;
            });

            let cardnumber = "";

            //Mostrar los numeros de la tarjeta censurados
            for (let i = 0; i < numeros.length; i++) {
                if(i < 12){
                    cardnumber += "#"
                }else{
                    cardnumber += numeros[i]
                }
                if((i+1)% 4 === 0 && i > 0){
                    cardnumber += " "
                }
            }

            //Condición para saber que pantalla mostrar
            inicio.classList.add("desaparecer")
            if (suma2%10==0) {
                error.classList.add("desaparecer")
                correcto.classList.remove("desaparecer")
                correcto.children[0].children[0].children[0].children[0].classList.add("animacion")
                message2.innerText = "Congrats! Your card " + cardnumber + " is valid. Do you want to try again?";

            } else {
                correcto.classList.add("desaparecer")
                error.classList.remove("desaparecer")
                error.children[0].children[0].children[0].children[0].classList.add("animacion")
                message1.innerText = "Your card: " + cardnumber + " is not valid. Please try again with other card number or verify that you entered it correctly.";
            }
        } else {
            input.setCustomValidity("Please enter valid values");
        }
    }
}

//Botones regresar.
btnagain[0].addEventListener("click", function(){
    again();
})
btnagain[1].addEventListener("click", function(){
    again();
})

function again() {
    input.value="";
    inicio.classList.remove("desaparecer")
    correcto.classList.add("desaparecer")
    error.classList.add("desaparecer")
    btn.setAttribute("type", "submit");    
}