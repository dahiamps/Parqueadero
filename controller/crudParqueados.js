const conexion = require('../database/db');



exports.calcular = (req, res) => {
    // const cuposTotales = req.body.cuposTotales;
    // const cuposDisponibles = req.body.cuposDisponibles;
    // const Placa = req.body.Placa;
    // const fechaIngreso = req.body.fechaIngreso;
    // let suma = cuposDisponibles;
    //console.log(parseInt(suma) + 1);
   // let disp = parseInt(suma);
    alert()
    res.redirect('/parqueados')
    // conexion.query('INSERT INTO vehiculoparqueadero SET ?', { codigoParqueadero: 1, Placa: Placa, fechaIngreso: fechaIngreso }, (error, results) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         res.redirect('/parqueados')
    //     }
    // })


}

function alert(disponibles) {
    alert("Texto a mostrar");

}
