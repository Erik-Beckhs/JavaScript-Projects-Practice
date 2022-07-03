const url = 'http://localhost:3000/clientes';

//crear clientes
export const crearCliente = async (cliente)=>{
    try{
        await fetch(url, {
            method:'post',
            body:JSON.stringify(cliente),
            headers:{
                 'Content-Type':'application/json'
             }
        });
        window.location.href = 'index.html';
    }
    catch(error){
        console.log(error);
    }
}

//obtener clientes
export const obtenerClientes = async () => {
    try{
        const resultado = await fetch(url);
        const clientes = await resultado.json();
        return clientes;
    }
    catch(error){
        console.log(error);
    }
}

//eliminar clientes
export const eliminarCliente = async (id)=>{
    await fetch(`${url}/${id}`, {
        method:'DELETE'
    });
}

export async function obtenerCliente(idCliente){
    try{
        const resultado = await fetch(`${url}/${idCliente}`);
        const respuesta = await resultado.json();
        return respuesta; 
    }
    catch(error){
        console.log(error)
    }
}

export async function editarCliente(cliente){
    try{
       await fetch(`${url}/${cliente.id}`, {
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        window.location.href='index.html';
    }
    catch(error){
        console.log(error);
    }
}
