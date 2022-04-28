//variables
var tweets = [];
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');
//const msg = document.querySelector('#tweet');

//funciones
function agregar(e){
   e.preventDefault();
   tweet = document.querySelector('#tweet').value;
   if(tweet){
       element = {
           id:Date.now(),
           mensaje:tweet
       };
       //tambien sirve
       //tweets = [...tweets, tweet];
       tweets.push(element);
   }
   //let msg = document.querySelector('#tweet');
   console.log(tweets);
   mostrarTweets(tweets);
   formulario.reset();
}

function limpiarTweets(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
}

function guardarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function mostrarTweets(tweets){
    limpiarTweets();
    const listado = document.createElement('ul');
    tweets.forEach(tweet=>{
        const {id, mensaje} = tweet;
        const elemento = document.createElement('li');
        const boton = document.createElement('a');
        boton.classList.add('borrar-tweet');
        boton.textContent = 'X';
        boton.onclick = ()=>{ //lo realizamos de esta manera por que vamos a pasar parametro
            eliminar(id);
        }
        elemento.textContent = mensaje;
        lista.appendChild(elemento);
        elemento.appendChild(boton);
    })
    lista.appendChild(listado);

    guardarStorage(tweets);
}

function eliminar(id){
    //console.log('id:'+id);
    //tweets.slice(1);
    //mostrarTweets()
    //console.log(tweets.slice(1, id));
    tweets = tweets.filter(tweet => tweet.id != id);
    mostrarTweets(tweets);
}

function quitar(id){
    var a = [];
    tweets.forEach(tweet => {
        if(tweet.id != id){
            a.push(tweet);
        }
    })
    return a;
}


function loadTweets(){
    var tweetsStorage = localStorage.getItem('tweets');
    if(tweetsStorage != null){
        objeto = JSON.parse(tweetsStorage);
        tweets = objeto;
        mostrarTweets(tweets);
    }
}
//eventos
document.addEventListener('DOMContentLoaded', ()=>{
    //console.log('se cargo el dom');
    loadTweets();
    formulario.addEventListener('submit', agregar);
})