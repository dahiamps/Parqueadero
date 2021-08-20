const conexion = require('../database/db');



exports.savePropietario = (req, res) => {
    const cedulaPropietario = req.body.cedulaPropietario;
    const nombrePropietario = req.body.nombrePropietario;
    const telefonoPropietario = req.body.telefonoPropietario;
    
    conexion.query('INSERT INTO propietario SET ?', { cedulaPropietario: cedulaPropietario, nombrePropietario: nombrePropietario, telefonoPropietario: telefonoPropietario}, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/propietarios')
        }
    })
}

