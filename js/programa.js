const API_URL = "https://api.minerstat.com/v2/coins?list=ETH";      // <-- API de ETHEREUM

var recompensa_eur = document.getElementById("recompensa_eur");
var nombre_arquitectura = document.getElementById("nombre_arquitectura");  //<-- Cogemos los divs donde mostraremos los datos de la API
var hashrate_red = document.getElementById("hashrate_red");
var recompensa_bloque = document.getElementById("recompensa_bloque");
var dificultad = document.getElementById("dificultad");
var precio = document.getElementById("precio");



fetch(`${API_URL}`)             // <-- Hacemos un fetch link de la Api que tiene la info en JSON pero en texto
.then((response) => response.json())   // <-- Transformamos el texto JSON a JSON REAL
.then((cripto) => {             // <-- Recorremos el array
    cripto.forEach(data =>{

        let label0 = document.createElement("label");
        label0.setAttribute("id","id_recompensa_eur");
        let priceEur = ` ${data.price.toFixed(2)}` * 0.042;     // Precio de ETH en EUROS, pero solo de 1 grafica
        label0.appendChild(document.createTextNode(priceEur.toFixed(2) +` EUR`));
        recompensa_eur.appendChild(label0);

        let label1 = document.createElement("label");
        label1.setAttribute("id","id_precio");
        label1.appendChild(document.createTextNode(`${data.price.toFixed(2)}`));   // Precio de ETH actual con la api
        precio.appendChild(label1);

        let label2 = document.createElement("label");
        label2.setAttribute("id","id_dificultad");
        let diff = `${data.difficulty}`;
        diff = diff.substring(0,5) / 1000;
        label2.appendChild(document.createTextNode(diff + " P"));   // Dificultad de ETH actual con la api
        dificultad.appendChild(label2);

        let label3 = document.createElement("label");
        label3.setAttribute("id","id_hash");
        let nethash = `${data.network_hashrate}`;
        nethash = nethash.substring(0,6) / 1000;
        label3.appendChild(document.createTextNode(nethash + " TH/s"));   // Network hashrate de ETH con la api
        hashrate_red.appendChild(label3);

        let label4 = document.createElement("label");
        label4.setAttribute("id","id_recompensa");
        label4.appendChild(document.createTextNode(` ${data.reward_block.toFixed(4)} ETH`));    // Recompensa por bloque de ETH con la api
        recompensa_bloque.appendChild(label4);
    })
    
});


// Esto muestra los botones de SUMAR o RESTAR graficas

var sumar_restar = document.getElementById("sumar_restar");
sumar_restar.innerHTML=`           
    <button onclick="this.nextElementSibling.stepDown();;calcular()" class="btnInputLeft">-</button>
    <input type="number" id="graficas" min="1" value="1" onkeyup="calcular()">
    <button onclick="this.previousElementSibling.stepUp();calcular()" class="btnInputRight">+</button>`;


// Esto ponia el puntito de mil en el precio total de las graficas, creo

var formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
});



// Cuando el usuario clica al boton de añadir o restar graficas pasa lo siguiente. 
window.calcular = function calcular() {

    var id_precio = document.getElementById("id_precio");       // <-- Vuelve a coger todas las variables de los elementos que hemos creado a partir de la API
    var id_recompensa = document.getElementById("id_recompensa");       //
    var hash = document.getElementById("id_hash");          //
    var id_dificultad = document.getElementById("id_dificultad");       //

    var resultados = document.getElementById("resultados"); // <-- Este es el DIV donde vamos a meter toda la NUEVA INFORMACION
    var graficas = document.getElementById("graficas");
    var precio = graficas.value * 3667;
    var precioETH = graficas.value * 0.042;
    var precioEUR = precioETH * id_precio.textContent;     //<-- Pasamos la recompensa en ethereum de las graficas seleccionadas y lo pasamos a EUROS
    resultados.innerHTML = `
        
    <div class='text-center'>       
        <h2 id='precio'><b>` + formatter.format(precio) + `</b><br>
        <span style='color:#8188a6!important;font-size:12px;position:relative;top:-5px;'>+ IVA</span></h2>
    </div>
    <div class='ms-5 mt-5'>
            <p>Potencia: <b>`+ graficas.value * 120 + ` MH/s</b></p>        
            <p> ETH recompensa: <b>` + precioETH.toFixed(3) + ` ETH</b></p>
            <p> EUR recompensa: <b>` + precioEUR.toFixed(2) + ` EUR</b></p>

            <hr>
                    <img src="imgs/ethereum_logo.png" width="40"> <b>Ethereum</b> <span style='color:#8188a6!important;font-size:16px;' >Ethash</span><p>

                    <p>Precio
                    <b><span id="id_precio">` +id_precio.textContent +`</span></b></p>

                    <p>Dificultad
                    <b><span id="id_dificultad">`+ id_dificultad.textContent +`</span></b></p>

                    <p>Hashrate red
                    <b><span id="id_hash">` + hash.textContent + `</span></b></p>

                    <p>Recompensa / bloque
                    <b><span id="id_recompensa">`+id_recompensa.textContent+ `</span></b></p>
    </div>`;
}



        




