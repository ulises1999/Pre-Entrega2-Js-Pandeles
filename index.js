let vehiculos = {};
let precioSeleccionado = 0;
let cuotasSeleccionadas = 0;
let sorteoRealizado = false; // Nueva variable para controlar si se realizó el sorteo

// Cargar los datos de vehículos desde vehiculos.json
fetch('./data/vehiculos.json')
    .then(response => response.json())
    .then(data => {
        vehiculos = data;
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al cargar los datos. Intente nuevamente más tarde.',
        });
    });


function guardarEnLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerDeLocalStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

document.getElementById('vehiculo').addEventListener('change', function() {
    const vehiculoSeleccionado = this.value;
    guardarEnLocalStorage('vehiculoSeleccionado', vehiculoSeleccionado);

    const modeloSelect = document.getElementById('modelo');
    const imagenesContainer = document.getElementById('imagenes');

    // Limpiar las opciones de modelos e imágenes
    modeloSelect.innerHTML = '<option value="">--Seleccionar--</option>';
    imagenesContainer.innerHTML = '';

    // Verificar si el vehículo seleccionado tiene modelos disponibles
    if (vehiculos[vehiculoSeleccionado]) {
        vehiculos[vehiculoSeleccionado].modelos.forEach((modelo, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = modelo;
            modeloSelect.appendChild(option);
        });

        // Habilitar el select de modelos
        modeloSelect.disabled = false;
    } else {
        // Deshabilitar el select de modelos si no hay vehículos cargados
        modeloSelect.disabled = true;
    }
});

document.getElementById('modelo').addEventListener('change', function() {
    const vehiculoSeleccionado = obtenerDeLocalStorage('vehiculoSeleccionado');
    const modeloSeleccionado = this.value;
    guardarEnLocalStorage('modeloSeleccionado', modeloSeleccionado);

    const imagenesContainer = document.getElementById('imagenes');
    const planCuotas = document.getElementById('planCuotas');

    // Limpiar el contenedor de imágenes
    imagenesContainer.innerHTML = '';

    if (vehiculos[vehiculoSeleccionado]) {
        // Cargar la imagen correspondiente al modelo seleccionado
        const img = document.createElement('img');
        img.src = vehiculos[vehiculoSeleccionado].imagenes[modeloSeleccionado];
        imagenesContainer.appendChild(img);

        // Guardar el precio del modelo seleccionado
        precioSeleccionado = vehiculos[vehiculoSeleccionado].precios[modeloSeleccionado];
        guardarEnLocalStorage('precioSeleccionado', precioSeleccionado);

        // Mostrar el plan de cuotas
        planCuotas.style.display = 'block';
    }
});

document.getElementById('cuotas').addEventListener('change', function() {
    cuotasSeleccionadas = parseInt(this.value);
    guardarEnLocalStorage('cuotasSeleccionadas', cuotasSeleccionadas);

    let interes = 0;
    switch(cuotasSeleccionadas) {
        case 3:
            interes = 0.05;
            break;
        case 6:
            interes = 0.1;
            break;
        case 12:
            interes = 0.2;
            break;
    }

    // Calcular el valor de la cuota
    const valorCuota = (precioSeleccionado * (1 + interes)) / cuotasSeleccionadas;
    guardarEnLocalStorage(`valorCuota`, valorCuota);
    document.getElementById('valorCuotaSpan').textContent = `$${valorCuota.toFixed(2)}`;
    document.getElementById('valorCuota').style.display = 'block';
    document.getElementById('confirmarCompra').style.display = 'block';

    // Fetch para la conversión de divisas
    const apiKey = `647e5bf889d543109a14fef0901ef31e`;
    fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const tasaARS = data.rates['ARS'];
            const valorCuotaEnUSD = valorCuota / tasaARS;
            document.getElementById('valorCuotaUSD').textContent = `Valor de la cuota en USD: $${valorCuotaEnUSD.toFixed(2)}`;
        })
        .catch(error => console.error('Error al obtener tasa de cambio:', error));
});

document.getElementById('confirmarCompra').addEventListener('click', function() {
    if (sorteoRealizado) {
        // Mostrar imagen del auto seleccionado y texto con cuotas restantes
        const vehiculoSeleccionado = obtenerDeLocalStorage('vehiculoSeleccionado');
        const modeloSeleccionado = obtenerDeLocalStorage('modeloSeleccionado');
        const imagenesContainer = document.getElementById('imagenes');
        const numeroSorteo= obtenerDeLocalStorage(`numeroSorteo`);
        const numerosElegidos= obtenerDeLocalStorage(`numerosElegidos`);
        const valorCuota=obtenerDeLocalStorage(`valorCuota`);
        
        imagenesContainer.innerHTML = ''; // Limpiar el div

        // Mostrar la imagen del auto
        const img = document.createElement('img');
        img.src = vehiculos[vehiculoSeleccionado].imagenes[modeloSeleccionado];
        imagenesContainer.appendChild(img);

        // Mostrar el texto de cuotas restantes
        cuotasRestantes=``;
        if(numeroSorteo===numerosElegidos){
            cuotasRestantes = cuotasSeleccionadas - obtenerDeLocalStorage('cuotasPagadas');
         } else { 
            cuotasRestantes = cuotasSeleccionadas;
        };
        
        const montoCuota = valorCuota.toFixed(2);
        const textoCuotas = document.createElement('p');
        textoCuotas.textContent = `Te restan ${cuotasRestantes} cuotas de $${montoCuota} cada una.`;
        imagenesContainer.appendChild(textoCuotas);
    } else {
        const sorteoDiv = document.getElementById('sorteo');
        sorteoDiv.style.display = 'block';
    }
});

document.getElementById('participarSorteo').addEventListener('click', function() {
    const numerosElegidos = [];
    document.querySelectorAll('.numeroSorteo').forEach(input => {
        const numero = parseInt(input.value);
        if (!isNaN(numero) && numero >= 0 && numero <= 100) {
            numerosElegidos.push(numero);
        }
    });

    if (numerosElegidos.length === 5) {
        guardarEnLocalStorage('numerosElegidos', numerosElegidos);

        const numeroSorteo = Math.floor(Math.random() * 500);
        guardarEnLocalStorage(`numeroSorteo`, numeroSorteo);
        const imagenesContainer = document.getElementById('imagenes');
        imagenesContainer.innerHTML = `<p>El número sorteado es: ${numeroSorteo}</p>`;

        const aciertos = numerosElegidos.filter(numero => numero === numeroSorteo).length;
        let mensaje = aciertos > 0 ? `¡Felicidades! Has acertado ${aciertos} número(s) en el sorteo.` : "No has acertado ningún número, pero gracias por participar.";

        let cuotasPagadas = 0;
        switch(cuotasSeleccionadas) {
            case 3:
                cuotasPagadas = 1;
                break;
            case 6:
                cuotasPagadas = 2;
                break;
            case 12:
                cuotasPagadas = 4;
                break;
        }

        const cuotasRestantes = cuotasSeleccionadas - cuotasPagadas;
        const montoCuota = (precioSeleccionado / cuotasSeleccionadas).toFixed(2);

        if (aciertos > 0) {
            mensaje += `<br>Por lo tanto, ya cuentas con ${cuotasPagadas} cuota(s) pagada(s). Te restan ${cuotasRestantes} cuotas de $${montoCuota} cada una.`;
        }

        imagenesContainer.innerHTML += `<p>${mensaje}</p>`;

        // Guardar en LocalStorage cuántas cuotas ya fueron pagadas
        guardarEnLocalStorage('cuotasPagadas', cuotasPagadas);
        
        sorteoRealizado = true; // Actualizar la variable para indicar que se realizó el sorteo
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Números inválidos',
            text: 'Debes ingresar exactamente 5 números válidos.',
        });
    }
});

// Cargar datos del LocalStorage al cargar la página
window.addEventListener('load', function() {
    const vehiculoSeleccionado = obtenerDeLocalStorage('vehiculoSeleccionado');
    if (vehiculoSeleccionado) {
        document.getElementById('vehiculo').value = vehiculoSeleccionado;
        document.getElementById('vehiculo').dispatchEvent(new Event('change'));

        const modeloSeleccionado = obtenerDeLocalStorage('modeloSeleccionado');
        if (modeloSeleccionado) {
            document.getElementById('modelo').value = modeloSeleccionado;
        }
    }});
