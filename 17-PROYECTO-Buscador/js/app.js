//variables
const resultado = document.querySelector('#resultado');
const selectYear = document.querySelector('#year');
const marca = document.querySelector('#marca');
const puertas = document.querySelector('#puertas');
const maximoSelect = document.querySelector('#maximo');
const minimoSelect = document.querySelector('#minimo');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const datos = {
    marca:'',
    puertas:'',
    year:'', 
    minimo:'',
    maximo:'',
    transmision:'',
    color:''
}

const year = new Date().getFullYear();
const maximo = year;
const minimo = year - 10;

//eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos);
    llenarYear();
})

marca.addEventListener('change', (e)=>{
    datos.marca = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change', (e)=>{
    datos.puertas = parseInt(e.target.value);
})

selectYear.addEventListener('change', (e)=>{
    datos.year = parseInt(e.target.value);
    filtrarAuto();
})

maximoSelect.addEventListener('change', (e)=>{
    datos.maximo = e.target.value;
    filtrarAuto();
})

minimoSelect.addEventListener('change', (e)=>{
    datos.minimo = parseInt(e.target.value);
    filtrarAuto();
})

transmision.addEventListener('change', (e)=>{
    datos.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', (e)=>{
    datos.color = e.target.value;
    filtrarAuto();
})

//funciones

function mostrarAutos(autos){
    limpiarAutos();
    autos.forEach(auto =>{
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        let autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year}
            Puertas :  ${puertas} - Color : ${color} -
            Transmision : ${transmision} - Precio: ${precio}
        `;

        resultado.appendChild(autoHTML);
    })
}

function limpiarAutos(){

    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
    //funciona igual
    //resultado.textContent = '';
}

function llenarYear(){
    for(let i = maximo; i > minimo; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent=i;

        selectYear.appendChild(opcion);
    }
}

function filtrarAuto(){
    const result = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuerta).filter(filtrarTransmision).filter(filtrarColor);
    //console.log(resultado);
    if(result.length === 0){
        //mesnaje
        limpiarAutos();
        var mensaje = document.createElement('div');
        mensaje.classList.add('alerta', 'error');
        mensaje.textContent = 'No se encontraron resultados';
        //resultado.textContent='No ;
        resultado.appendChild(mensaje);
    }
    else{
        mostrarAutos(result);
    }
}

function filtrarMarca(auto){
    //console.log(auto);
    const {marca} = datos;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
    //igual funciona lo de aqui abajo
    // return auto;
//     if(marca != '' && auto.marca === marca){
//         return auto;
//     }
}

function filtrarYear(auto){
    const {year} = datos;
    if(year){
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datos;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datos;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuerta(auto){
    const {puertas} = datos;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datos;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datos;
    if(color){
        return auto.color === color;
    }
    return auto;
}