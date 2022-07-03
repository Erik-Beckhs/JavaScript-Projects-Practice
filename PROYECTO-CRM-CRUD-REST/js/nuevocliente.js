import { mostrarAlerta, validar } from "./funciones.js";
import { crearCliente } from "./API.js";

//variables
const formulario = document.querySelector('#formulario');

//eventos
document.addEventListener('DOMContentLoaded',()=>{
    formulario.addEventListener('submit', validarFormulario);
})

function validarFormulario(e){
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    const cliente = {
        nombre, 
        email,
        telefono,
        empresa
    }

    if(validar(cliente)){
        mostrarAlerta('Los campos son obligatorios');
        return;
    }

    crearCliente(cliente);
    //console.log(!Object.values(cliente).every(item=>item!==''));
}