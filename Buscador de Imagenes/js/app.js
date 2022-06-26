// variables
const resultado = document.querySelector('#resultado');
const paginacion = document.querySelector('#paginacion');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const cantidadPorPaginas = 10;
var totalPaginas;
let iterador;
let paginaActual = 1;

window.onload=()=>{
    formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e){
    e.preventDefault();
    const aux = formulario.querySelector('.text-red-700');

    let termino = document.querySelector('#termino').value;

    if(!aux){
        if(termino == ''){
            mostrarAlert('El término de búsqueda es obligatorio');
        }
    }
    buscarImagen();
    
}

function buscarImagen(){
    let termino = document.querySelector('#termino').value;

    const key = '28192121-af6d21833c6ad216714585189';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${cantidadPorPaginas}&page=${paginaActual}`;

    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        const {hits, totalHits} = data;
        totalPaginas = calculaTotal(totalHits);
        mostrarImagenes(hits);
        //console.log(totalPaginas);
    })
}

function mostrarImagenes(imagenes){
    if(imagenes.length === 0){
        mostrarAlert('No se encontraron resultados, intente con otra palabra');
    }

    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    imagenes.forEach(imagen => {
        const {previewURL, likes, views, largeImageURL} = imagen;
        resultado.innerHTML += `
        <div class='p-3 w-1/2 md:w-1/3 lg:w-1/4 mb-4 rounded'>
            <div class="bg-white">
                 <img class="w-full" src='${previewURL}'>
                 <div class="p-3">
                   <p><span class="font-bold">${likes}</span><span class="ml-2 font-light">Me gusta</span></p>
                   <p><span class="font-bold">${views}</span><span class="ml-2 font-light">Veces vista</span></p>
                   <a rel="noopener noreferrer" href="${largeImageURL}"target="_blank" class="mt-3 p-3 block text-white bg-blue-700 hover:bg-blue-400 w-full text-center uppercase">Ver Más</a>
                 </div>
            </div>
        </div>
        `;
    })
    imprimirPaginador();
} 

function mostrarAlert(mensaje){
    const alert = document.createElement('p');
            alert.classList.add('mx-auto','mt-4', 'p-3','max-w-lg', 'text-center','rounded', 'bg-red-100', 'border-red-100', 'text-red-700');
            alert.innerHTML = `
                <h6>Error!</h6>
                <span>${mensaje}</span>
            `;
            formulario.appendChild(alert);

            setTimeout(() => {
                alert.remove();
            }, 3000);
}

function calculaTotal(total){
    return parseInt(Math.ceil(total/cantidadPorPaginas));
}

function *generadorPaginas(total){
   for(let i=1; i<=total; i++){
     yield i;
   }
}

function imprimirPaginador(){
    iterador = generadorPaginas(totalPaginas);

    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }

    while(true){
        const {done, value} = iterador.next();
        if(done){
            return;
        }

        let boton = document.createElement('a');
        boton.dataset.pagina = value;
        boton.href="#";
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-3', 'mx-1', 'mb-3', 'hover:bg-yellow-600', 'rounded');
        boton.onclick = () => {
            //e.preventDefault();
            paginaActual = value;
            buscarImagen();
        }
        paginacionDiv.classList.add('flex', 'flex-wrap', 'justify-center');
        paginacionDiv.appendChild(boton);
    }
}