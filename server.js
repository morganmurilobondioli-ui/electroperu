const express = require('express');
const productoRoutes = require('./routes/productoRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000; // puerto de la app

// Comunicación se realizará en JSON
app.use(express.json());

// Rutas
app.use('/api/productos', productoRoutes); 

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
