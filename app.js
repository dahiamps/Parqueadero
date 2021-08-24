var moment = require('moment');

//1- invocamos express
const express = require('express');
const app = express();

//2 - seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

//4 - setear directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));


//pido el modulo creado routes

app.use('/', require('./routes'));

//5 - Establecemos el motor de plantillas
app.set('view engine', 'ejs');


const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


// 8 - Invocamos a la conexion de la DB
const connection = require('./database/db');
const { render } = require('ejs');


//9 - establecemos las rutas

app.get(`/vehiculos`, (req, res) => {


    connection.query('SELECT * FROM vehiculo', (error, results) => {

        if (error) {
            throw error
        } else {
            res.render('index', {
                results: results,

            })
        }
    })
})
app.get(`/historial`, (req, res) => {


    connection.query('SELECT * FROM salidas', (error, results) => {

        if (error) {
            throw error
        } else {
            res.render('historial', {
                results: results,

            })
        }
    })
})
app.get(`/parqueadero`, (req, res) => {


    //console.log(hoy.format('dddd Do MMMM YYYY, h:mm:ss a'));
    connection.query('SELECT * FROM parqueadero', (error, results) => {

        if (error) {
            throw error
        } else {

            let hoy = moment();
            //hoy.format('dddd Do MMMM YYYY, h:mm:ss a')
            let ingreso = hoy.format('YYYY-MM-DD  H:mm')

            res.render('parqueadero', {
                results: results,
                ingreso

            })
        }
    })
})
app.get(`/propietarios`, (req, res) => {


    connection.query('SELECT * FROM propietario', (error, results) => {

        if (error) {
            throw error
        } else {
            res.render('propietario', {
                results: results,

            })
        }
    })
})


app.get(`/`, (req, res) => {


    connection.query('SELECT * FROM vehiculoparqueadero,parqueadero', (error, results) => {

        if (error) {
            throw error
        } else {




            res.render('vehiculosparqueados', {
                results: results,
                cupos: results

            })
        }
    })
})
app.get('/edit/:Placa/:fechaIngreso', (req, res) => {
    const Placa = req.params.Placa;
    const fechaIngreso = req.params.fechaIngreso;
    let hoy = moment();
    var horasalida = hoy.format('YYYY-MM-DD  H:mm')
    // console.log("hola " + fechaIngreso);
    var a = new Date(fechaIngreso)
    var f = moment(a).format('llll')
    // console.log("hola 2" + fechaIngreso);
    //console.log(before);
    //let hola = Date.parse(fechaIngreso)
    //var a = fechaIngreso
    //     // //console.log(before);
    //     // // before.diff(horasalida, 'minutes')
    //console.log(a);
    // var starts = moment(a);
    // var ends = moment('2021-08-18 12:53');

    // console.log(a);
    // console.log(f);
    // console.log(ends);

    
//    console.log(hola);

    var Ingreso = new Date(f);
    var salida = new Date(horasalida);
    // var diff = Math.abs(new Date(fechaIngreso) - new Date(horasalida));
    var diffMs = (Ingreso - salida)
    // var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    var number = Math.abs(diffMs / (1000 * 60));
    //let dateOne = new Date("2020-07-10 12:53");
    //let dateTwo = new Date("2020-07-10 12:55");

    let msDifference = salida - Ingreso;
    let minutes = Math.floor(msDifference / 1000 / 60);
    console.log("Minutes between two dates =", minutes);
    console.log(number);
    if (minutes == 0) {
        var precio = 100;
    } else {
        var precio = number * 100;
    }
    connection.query('SELECT * FROM vehiculoparqueadero,parqueadero  WHERE Placa=?', [Placa], (error, results) => {
        if (error) {
            throw error
        } else {
            let hoy = moment();
console.log(results);
            res.render('salida', {
                vehiculo: results[0],
                horasalida,
                minutes,
                precio
            })
        }
    })
})


app.listen(3000, (req, res) => {
    console.log("Server running in http://localhost:3000");
})



app.get('/prueba', async (req, res) => {

    connection.query('SELECT * FROM cliente ,parqueadero ', async (error, results, fields) => {
        if (results.length == 0) {
            console.log("Error");

            //Mensaje simple y poco vistoso
            //res.send('Incorrect Username and/or Password!');				
        } else {
            //creamos una var de session y le asignamos true si INICIO SESSION       
            req.session.cupo = results[0].cuposDisponibles
            //results.cuposDisponibles;
            console.log(results[0].cuposDisponibles - 1);
            let data = results[0].cuposDisponibles;
            res.send(results)
        }
        res.end();
    });

});
