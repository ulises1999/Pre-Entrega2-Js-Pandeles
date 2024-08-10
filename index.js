let vehiculos = ["Sandero", "Koleos", "Kardian", "Megane"];
let koleos = "Koleos";
let koleosPrecio = 52450000;
let megane = "Megane";
let meganePrecio = 71000000;
let sandero = ["life 1.6", "itens 1.6", "itens 1.6 CVT"];
let sanderPrecio = ["23100000", "25050000", "25700000"];
let kardian = ["Evolution 150 MT", "Evolution 200 EDC", "Techno 200 EDC", "Premiere Edition 200 EDC"];
let kardianprecios = ["25800000", "28000000", "29200000", "29950000"];

function generarPlanesDePago(precio, cuotas, interes) {
    const plan = (precio + (precio * interes)) / cuotas;
    alert(`El plan elegido es de ${cuotas} cuotas de $${plan.toFixed(2)} cada una con un interés del ${(interes * 100).toFixed(2)}%.`);
    console.log(`El plan elegido es de ${cuotas} cuotas de $${plan.toFixed(2)} cada una con un interés del ${(interes * 100).toFixed(2)}%.`);
}

alert("Bienvenidos a concesionarias ODIN");
alert("Tenemos estos vehículos: Sandero, Koleos, Kardian, Megane");
let vehiculoElegido = prompt("Ingrese el vehículo elegido").trim();

// Variables para almacenar la elección del usuario
let modeloElegido = "";
let precio = 0;

while (true) {
    if (vehiculoElegido === vehiculos[0]) { // Sandero
        while (true) {
            alert(`Contamos con los siguientes modelos: ${sandero}`);
            let modelosandero = prompt(`¿Cuál es el modelo que te interesa?`).trim();
            if (modelosandero === sandero[0]) {
                modeloElegido = sandero[0];
                precio = parseInt(sanderPrecio[0]);
                alert(`El precio es $ ${sanderPrecio[0]}`);
                if (confirm(`¿Desea comprarlo?`)) break;
            } else if (modelosandero === sandero[1]) {
                modeloElegido = sandero[1];
                precio = parseInt(sanderPrecio[1]);
                alert(`El precio es $ ${sanderPrecio[1]}`);
                if (confirm(`¿Desea comprarlo?`)) break;
            } else if (modelosandero === sandero[2]) {
                modeloElegido = sandero[2];
                precio = parseInt(sanderPrecio[2]);
                alert(`El precio es $ ${sanderPrecio[2]}`);
                if (confirm(`¿Desea comprarlo?`)) break;
            } else {
                alert(`Por favor ingrese un modelo válido.`);
            }
        }
        break;
    } else if (vehiculoElegido === vehiculos[1]) { // Koleos
        modeloElegido = koleos;
        precio = koleosPrecio;
        alert(`El valor de este vehículo es: $${koleosPrecio}`);
        if (confirm(`¿Desea comprarlo?`)) break;
    } else if (vehiculoElegido === vehiculos[2]) { // Kardian
        while (true) {
            alert(`Contamos con los siguientes modelos: ${kardian}`);
            let modeloKardian = prompt(`¿Cuál es el modelo que te interesa?`).trim();
            if (modeloKardian === kardian[0]) {
                modeloElegido = kardian[0];
                precio = parseInt(kardianprecios[0]);
                alert(`El precio es: $ ${kardianprecios[0]}`);
                if (confirm(`¿Desea comprarlo?`)) break;
            } else if (modeloKardian === kardian[1]) {
                modeloElegido = kardian[1];
                precio = parseInt(kardianprecios[1]);
                alert(`El precio es: $ ${kardianprecios[1]}`);
                if (confirm(`¿Desea comprarlo?`)) break;
            } else if (modeloKardian === kardian[2]) {
                modeloElegido = kardian[2];
                precio = parseInt(kardianprecios[2]);
                alert(`El precio es: $ ${kardianprecios[2]}`);
                if (confirm(`¿Desea comprarlo?`)) break;
            } else if (modeloKardian === kardian[3]) {
                modeloElegido = kardian[3];
                precio = parseInt(kardianprecios[3]);
                alert(`El precio es: $ ${kardianprecios[3]}`);
                if (confirm(`¿Desea comprarlo?`)) break;
            } else {
                alert(`Por favor ingrese un modelo válido.`);
            }
        }
        break;
    } else if (vehiculoElegido === vehiculos[3]) { // Megane
        modeloElegido = megane;
        precio = meganePrecio;
        alert(`El precio del Megane es: $${meganePrecio}`);
        if (confirm(`¿Desea comprarlo?`)) break;
    } else {
        alert(`Por favor ingrese un vehículo disponible y recuerde escribirlo tal cual está.`);
        vehiculoElegido = prompt("Ingrese el vehículo elegido").trim();
    }
}

// Si el usuario confirma la compra, se le permite elegir las cuotas
if (precio > 0) {
    let cuotas = parseInt(prompt("Ingrese la cantidad de cuotas: 3, 6, o 12"));

    let interes = 0;
    if (cuotas === 3) {
        interes = 0.05; // 5% de interés para 3 cuotas
    } else if (cuotas === 6) {
        interes = 0.1; // 10% de interés para 6 cuotas
    } else if (cuotas === 12) {
        interes = 0.2; // 20% de interés para 12 cuotas
    } else {
        alert("Cantidad de cuotas no válida. Se seleccionará 3 cuotas por defecto.");
        cuotas = 3;
        interes = 0.05;
    }
    generarPlanesDePago(precio, cuotas, interes);
    console.log("El vehiculo elegido es:"+ vehiculoElegido);
    console.log("El modelo elegido es:"+ modeloElegido);
    console.log(`la cantidad de cuotas elegidas es:${cuotas}`);
}
