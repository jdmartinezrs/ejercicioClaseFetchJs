import { URL } from "../config/env.js";
import { formatearComentarios } from "../utils/formateador.js";
import { solicitar } from "../api/solicitudes.js";

export const obtenerPublicaciones = async (usuarioId) => {
    const publicaciones = await solicitar(`${URL}/posts?userId=${usuarioId}`);

    return Promise.all(
        publicaciones.map(async (publicacion) => {
            const comentarios = await solicitar(
                `${URL}/comments?postId=${publicacion.id}`
            );

            return {
                id: publicacion.id,
                titulo: publicacion.title,
                cuerpo: publicacion.body,
                comentarios: formatearComentarios(comentarios)
            };
        })
    );
};