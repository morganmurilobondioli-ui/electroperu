const db = require('../config/db'); // conexión mysql2


// Obtener todos los clientes
exports.getAllClientes = (req, res) => {
  const sql = `
    SELECT c.*, t.tienda 
    FROM clientes c
    LEFT JOIN tiendas t ON c.tienda_id = t.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener cliente por ID
exports.getClienteById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(result[0]);
  });
};

// Crear nuevo cliente
exports.createCliente = (req, res) => {
  const { apellidos, nombres, dni, telefono, direccion, tienda_id } = req.body;
  const sql = `
    INSERT INTO clientes (apellidos, nombres, dni, telefono, direccion, tienda_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [apellidos, nombres, dni, telefono, direccion, tienda_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente creado', id: result.insertId });
  });
};

// Actualizar cliente
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { apellidos, nombres, dni, telefono, direccion, tienda_id } = req.body;
  const sql = `
    UPDATE clientes 
    SET apellidos = ?, nombres = ?, dni = ?, telefono = ?, direccion = ?, tienda_id = ?
    WHERE id = ?
  `;
  db.query(sql, [apellidos, nombres, dni, telefono, direccion, tienda_id, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente actualizado' });
  });
};

// Eliminar cliente
exports.deleteCliente = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente eliminado' });
  });
};
