const enviar = require('./mailer');
const indicadoresEc = require('./consultas');
const http = require('http');
const url = require('url');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let indicador = '';

indicadoresEc().then((res) => {
    indicador = `El valor del dolar el dia de hoy es: ${res.dolar}
    \nEl valor del euro el dia de hoy es: ${res.euro}
    \nEl valor de la uf el dia de hoy es: ${res.uf}
    \nEl valor de la utm el dia de hoy es: ${res.utm}
    `;
})

http.createServer((req, res) => {
    let { correos, asunto, contenido } = url.parse(req.url, true).query;
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('index.html', 'UTF8', (error, html) => {
            res.end(html);
        });
    }    

    if (req.url.startsWith('/mailing')) {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        enviar(correos.split(','), asunto, contenido)
        .then((response) => {
            console.log('correo enviado');

            let id = uuidv4().slice(0, 6);

            let template = `Correos: ${correos} 
            \nAsunto: ${asunto}
            \nContenido: ${contenido.substring(3, contenido.length-8)}
            \n${indicador}
            `;
            //Requerimiento 4
            let alertMsj = `<div class="container w-25 m-auto text-center">
            <div class="alert alert-success" role="alert">
                Correo enviado con exito
            </div>
            </div>`

            fs.readFile('index.html', 'UTF8', (error, html) => {
                html += alertMsj;
                res.end(html);
            })

            fs.writeFile(`./correos/correo-${id}.txt`, template, (err) => {
                if (err) {
                    console.log('No se pudo crear el archivo');
                    res.end();
                } else {
                    console.log('Archivo creado con exito');
                    res.end();
                }
            });           

        }).catch((response) => {
            console.log('correo no enviado');
            
            let alertMsj = `<div class="container w-25 m-auto text-center">
            <div class="alert alert-danger" role="alert">
                Correo no enviado
            </div>
            </div>`

            fs.readFile('index.html', 'UTF8', (error, html) => {
                html += alertMsj;
                res.end(html);
            })
        });                        
    }    

}).listen(3000, () => console.log('Servidor Levantado'));