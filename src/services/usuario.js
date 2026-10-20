import { URL } from "../config/env.js";
import { solicitar } from "../api/solicitudes.js";

export const obtenerUsuario = (id) => solicitar(`${URL}/users/${id}`);