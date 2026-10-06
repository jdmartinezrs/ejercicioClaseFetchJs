export const solicitar = async (url, id) =>{
    console.log(`${url}/${id}`);

    let respuesta = await fetch(`${url}/${id}`)
    let data = await respuesta.json()
    return data;
}

