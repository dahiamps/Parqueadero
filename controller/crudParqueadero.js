
const conexion = require('../database/db');
 


exports.saveParqueadero = (req, res) => {
    const cuposTotales = req.body.cuposTotales	;
    const cuposDisponibles = req.body.cuposDisponibles;
    const Placa = req.body.Placa;
    const fechaIngreso = req.body.fechaIngreso;
   let suma = cuposDisponibles;
    //console.log(parseInt(suma) + 1);
    let disp = parseInt(suma);
    modify(disp)
    conexion.query('INSERT INTO vehiculoparqueadero SET ?', { codigoParqueadero: 1, Placa: Placa, fechaIngreso: fechaIngreso }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/parqueados')
        }
    })


}

function modify(disponibles) {
    conexion.query('UPDATE parqueadero SET ? ', [{ cuposTotales: 30, cuposDisponibles: disponibles-1}], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log("hecho");
        }
    })

}