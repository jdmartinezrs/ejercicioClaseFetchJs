import {solicitar} from "./solicitudes.js"

//let identificador = 8;

let usuario = await solicitar("https://jsonplaceholder.typicode.com/users/8")
let posts = await solicitar(  `https://jsonplaceholder.typicode.com/posts?userId=${usuario.id}`)
Promise.all([usuario, posts]).then((values) => {
  console.log(values);
});