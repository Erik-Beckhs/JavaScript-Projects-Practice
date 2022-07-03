export function mostrarAlerta(mensaje){
    const alert = document.querySelector('.bg-red-100');
    if(!alert){
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'text-center', 'rounded', 'py-3', 'mx-4', 'text-red-700', 'border-red-700', 'mx-auto', 'max-width-700', 'mt-3');
        alerta.innerHTML = `
            <span class="font-bold">Error!</span>
            <span>${mensaje}</span>
        `;
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

export function validar(obj){
    return !Object.values(obj).every(item=>item!=='');
}