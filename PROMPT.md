# Prompt para generar el programa

## Rol

Actúa como un desarrollador de software senior especializado en backend con JavaScript y Node.js. Escribe código claro, modular y fiel a los requisitos descritos. No agregues funcionalidades que no se solicitan.

## Objetivo

Genera un programa de consola en JavaScript que consulte JSONPlaceholder para obtener un usuario, las publicaciones de ese usuario y los comentarios asociados a cada publicación. El programa debe reunir los datos en un solo objeto e imprimirlo completo mediante un solo `console.log` de éxito, sin usar `JSON.stringify`.

## Contexto

- El programa usa módulos ES (`import` y `export`) y se ejecuta con Node.js.
- El código fuente se organiza dentro de `src/` con esta estructura:

  ```text
  src/
    app.js
    index.js
    api/
      solicitudes.js
    config/
      env.js
    services/
      publicaciones.js
      usuario.js
    utils/
      formateador.js
  ```
- La URL base es `https://jsonplaceholder.typicode.com`.
- El identificador inicial del usuario es `8`.
- Las rutas son `/users/{id}`, `/posts?userId={id}` y `/comments?postId={id}`.
- Usa `fetch` nativo y promesas con `async`/`await`.
- El usuario se obtiene primero. Su `id` se usa para obtener publicaciones.
- Para cada publicación, se obtiene su lista de comentarios. Las solicitudes de comentarios deben ejecutarse concurrentemente usando `Promise.all` sobre el resultado de `map`.
- El archivo `index.js` funciona como barril y reexporta `obtenerUsuario`, `obtenerPublicaciones`, `solicitar` y `formatearComentarios`.
- `src/app.js` debe importar `obtenerUsuario` y `obtenerPublicaciones` desde `./index.js`, no directamente desde los módulos de `services/`.

## Formato de salida

El objeto que se imprime debe tener esta estructura:

```js
{
  usuario: {
    // Objeto completo recibido desde /users/{id}
  },
  publicaciones: [
    {
      id: 71,
      titulo: "Título recibido de la API",
      cuerpo: "Contenido recibido de la API",
      comentarios: [
        {
          name: "Nombre recibido de la API",
          email: "correo recibido de la API",
          body: "Comentario recibido de la API"
        }
      ]
    }
  ]
}
```

Imprime el objeto completo, incluyendo todos los niveles de los comentarios y con colores, mediante `console.log(inspect(resultado, { depth: null, colors: true }))`. Importa `inspect` desde `node:util`. No conviertas el resultado a JSON ni uses `console.dir`. La representación de `inspect` es la salida de consola esperada; no tiene que ser JSON parseable.

## Restricciones

- Conserva la estructura modular y crea estos archivos:
  - `src/app.js`: importa `obtenerUsuario` y `obtenerPublicaciones` desde `./index.js`; define el identificador, coordina las llamadas, arma el resultado y lo imprime.
  - `src/config/env.js`: exporta la URL base como `URL`.
  - `src/api/solicitudes.js`: exporta `solicitar(url)`, realiza `fetch`, valida la respuesta y devuelve el JSON.
  - `src/services/usuario.js`: exporta `obtenerUsuario(id)`.
  - `src/services/publicaciones.js`: exporta `obtenerPublicaciones(usuarioId)`, obtiene los posts y sus comentarios, y devuelve un arreglo de objetos.
  - `src/utils/formateador.js`: exporta `formatearComentarios(comentarios)` y conserva de cada comentario solo `name`, `email` y `body`.
  - `src/index.js`: reexporta las cuatro funciones públicas indicadas en Contexto. No debe importar ni ejecutar `src/app.js`.
- En cada publicación incluye `id`, `titulo` (mapeado desde `title`), `cuerpo` (mapeado desde `body`) y `comentarios` como arreglo.
- No reemplaces la API por datos locales ni añadas una base de datos, servidor web, framework o dependencias externas.
- Mantén una sola llamada de éxito a `console.log` y no cambies el formato solicitado.
- Configura el proyecto como módulo ES y permite ejecutarlo con `npm run dev` usando `node src/app.js`.

## Advertencias

- `fetch` puede fallar por problemas de red. Además, una respuesta HTTP no exitosa debe convertirse en un error comprobando `respuesta.ok`; `fetch` no rechaza automáticamente por estados como 404.
- Si una solicitud falla, propaga el error hasta el `try/catch` de `app.js`. Imprime `No se pudieron obtener los datos:` junto con `error.message` y asigna `process.exitCode = 1`.
- `Promise.all` rechaza si falla cualquiera de las solicitudes de comentarios. No ocultes ese error ni devuelvas publicaciones parcialmente completas.
- No uses `JSON.stringify`: ocultaría el objetivo de mostrar el objeto mediante `inspect`, con `depth: null` y `colors: true`.
- El coloreado de `inspect` requiere una terminal que admita códigos ANSI.

## Ejemplo de ejecución

El comando de ejecución es:

```sh
npm run dev
```

La salida exitosa empieza con un objeto que contiene `usuario` y `publicaciones`. Cada elemento de `publicaciones` incluye su `id`, `titulo`, `cuerpo` y un arreglo `comentarios` con objetos que solo tienen `name`, `email` y `body`. Los valores concretos dependen de la respuesta de JSONPlaceholder.