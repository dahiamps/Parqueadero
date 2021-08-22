const conexion = require('../database/db');



exports.salida = (req, res) => {
    const cuposDisponibles = req.body.cuposDisponibles;
    const Placa = req.body.Placa;
    const fechaIngreso = req.body.fechaIngreso;
    const minutos = req.body.minutos;
    const valor = req.body.valor;
    const fechaSalida = req.body.fechaSalida;
    let suma = cuposDisponibles;
    //console.log(parseInt(suma) + 1);
    let disp = parseInt(suma);
    console.log(disp);
    modify(disp)
    guardarSalida(Placa,fechaIngreso,minutos,valor,fechaSalida)
   
    conexion.query('DELETE FROM vehiculoparqueadero WHERE Placa =?', [Placa], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Eliminado");
            res.redirect('/')
        }
    })
}

function modify(disponibles) {
    conexion.query('UPDATE parqueadero SET ? ', [{ cuposTotales: 30, cuposDisponibles: disponibles + 1 }], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log("hecho");
        }
    })

}

function guardarSalida(Placa, fechaIngreso, minutos, valor, fechaSalida) {
    conexion.query('INSERT INTO salidas SET ?', { Placa: Placa, fechaIngreso: fechaIngreso, minutos: minutos, valor: valor, fechaSalida: fechaSalida}, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Salida Registrada");
        }
    })
}