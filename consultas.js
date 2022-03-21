const axios = require('axios');

//Requerimiento 3
async function indicadoresEc() {
    const { data } = await axios.get("https://mindicador.cl/api");
    const dolar = data.dolar.valor;
    const euro = data.euro.valor;
    const uf = data.uf.valor;
    const utm = data.utm.valor;
    
    return {dolar, euro, uf, utm};

}

module.exports = indicadoresEc;