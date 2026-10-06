import {solicitar} from "./solicitudes.js"

let identificador = 8;

let usuario = await solicitar("https://jsonplaceholder.typicode.com/users", identificador)
let posts = await solicitar("https://jsonplaceholder.typicode.com/posts?userId=", usuario.id)

console.log(usuario.name);
console.log(posts);