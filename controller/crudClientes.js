const conexion = require('../database/db');



exports.save = (req, res) => {
    const Placa = req.body.Placa;
    const Marca = req.body.Marca;
    const Modelo = req.body.Modelo;
    const Color = req.body.Color;
    const cedulaPropietario = req.body.cedula;
    const Mensualidad = req.body.Mensualidad;
    console.log(cedulaPropietario);
    conexion.query('INSERT INTO vehiculo SET ?', { Placa: Placa, Marca: Marca, Modelo: Modelo, Color: Color, cedulaPropietario: cedulaPropietario, Mensualidad: Mensualidad }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/')
        }
    })
}

// exports.mostrar = (req, res) => {
//     connection.query('SELECT * FROM parqueadero', (error, res) => {

//         if (error) {
//             throw error
//         } else {
//             res.render('index', {
//                 results: res,

//             })
//         }
//     })
// }
