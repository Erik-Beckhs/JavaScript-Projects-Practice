import { obtenerClientes, eliminarCliente }  from "./API.js";

//variables
const listado = document.querySelector('#listado-clientes');

document.addEventListener('DOMContentLoaded', ()=>{
    mostrarClientes();
    listado.addEventListener('click', confirmarEliminar);
});

//funciones

async function mostrarClientes(){
    const clientes = await obtenerClientes();

    clientes.forEach(element => {
        const { nombre, telefono, empresa, id, email } = element;
        let row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 text-center">
                <strong>${nombre}</strong>
                <p>${email}</p>
            </td>
            <td class="py-2 text-center">${telefono}</td>
            <td class="py-2 text-center">${empresa}</td>
            <td class="py-2 text-center">
                <a href="editar-cliente.html?id=${id}" class="bg-blue-400 px-3 py-1 text-white rounded">Modificar</a>
                <button data-cliente="${id}" class="eliminar bg-red-400 px-3 py-1 text-white rounded">Eliminar</button>
            </td>
        `;
        //console.log(row);
        listado.appendChild(row);
    });
}

function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const confirma = confirm('Esta seguro de eliminar?');
        if(confirma){
            eliminarCliente(e.target.dataset.cliente);
        }
    }
}



