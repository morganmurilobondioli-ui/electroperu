// controllers/tiendasController.js
const db = require('../config/db');

exports.getAllTiendas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tiendas ORDER BY tienda');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las tiendas' });
  }
};
