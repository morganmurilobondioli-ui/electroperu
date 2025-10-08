const express = require('express');

//Actualización para despegar el front-end
const cors = require('cors') //Permisos sobre el contenido a desplegar
const path = require('path') //Express servir el frontend

const productoRoutes = require('./routes/productoRoutes'); 
const clientesRoutes = require('./routes/clientesRoutes');

const app = express();
const PORT = process.env.PORT || 3000; // puerto de la app

//Actualización - Permisos cors
app.use(cors({
  origin: '*',
  methods: 'GET,POST,HEAD,PUT,PATCH,DELETE',
  credentials: true
}))

//Actualización Servir los documentos HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')))

//http://localhost:300 -> public>index.html
app.get('/',(req, res)=> {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))

})

// Comunicación se realizará en JSON
app.use(express.json());

// Rutas
app.use('/api/productos', productoRoutes); 
app.use('/api/clientes', clientesRoutes); 

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
