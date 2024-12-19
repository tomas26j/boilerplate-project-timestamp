// index.js
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 })); // Habilitar CORS

// Endpoint principal
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html'); // Cambia esto si tienes un archivo HTML
});

// Endpoint para manejar fechas
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // Si no se proporciona fecha, usar la fecha actual
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // Si es un número, interpretarlo como un timestamp Unix
    date = new Date(parseInt(dateParam));
  } else {
    // Intentar crear una nueva fecha a partir de la cadena proporcionada
    date = new Date(dateParam);
  }

  // Comprobar si la fecha es válida
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Devolver el resultado en formato JSON
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Escuchar en el puerto especificado o en el puerto 3000 por defecto
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
