export const solicitar = async (url) =>{
    //console.log(`${url}/${id}`);

    let respuesta = await fetch(url)
    return await respuesta.json()
    //return data;
}

