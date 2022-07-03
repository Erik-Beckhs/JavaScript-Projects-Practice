import { obtenerCliente, editarCliente } from "./API.js";
import { validar, mostrarAlerta } from "./funciones.js"

const nombreInput = document.querySelector('#nombre');
const emailInput = document.querySelector('#email');
const telefonoInput = document.querySelector('#telefono');
const empresaInput = document.querySelector('#empresa');
const idInput = document.querySelector('#id');
const formulario = document.querySelector('#formulario');


document.addEventListener('DOMContentLoaded',async ()=>{
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parseInt(parametrosURL.get('id'));

    const cliente =await obtenerCliente(idCliente);
    mostrarCliente(cliente);

    formulario.addEventListener('submit', validarFormulario);
})

function mostrarCliente(cliente){
    const {id, nombre, email, telefono, empresa} = cliente;
    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
    idInput.value = id;
}

function validarFormulario(e){
    e.preventDefault();

    const cliente = {
        nombre:nombreInput.value, 
        email:emailInput.value,
        telefono:telefonoInput.value,
        empresa:empresaInput.value,
        id:idInput.value
    }

    if(validar(cliente)){
        mostrarAlerta('Los campos son obligatorios');
        return;
    }

    editarCliente(cliente);
}