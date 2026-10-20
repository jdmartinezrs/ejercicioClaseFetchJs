import { inspect } from "node:util";
import { obtenerPublicaciones, obtenerUsuario } from "./index.js";

const identificador = 8;

const obtenerUsuarioConComentarios = async (id) => {
    const usuario = await obtenerUsuario(id);
    const publicaciones = await obtenerPublicaciones(usuario.id);

    return {
        usuario,
        publicaciones
    };
};

try {
    const resultado = await obtenerUsuarioConComentarios(identificador);
    console.log(inspect(resultado, { depth: null, colors: true }));
} catch (error) {
    console.error("No se pudieron obtener los datos:", error.message);
    process.exitCode = 1;
}