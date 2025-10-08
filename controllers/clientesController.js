// Acceso a la BD mysql/promise
const db = require('../config/db');

// Crear cliente
exports.crearCliente = async (req, res) => {
  const { apellidos, nombres, dni, telefono, direccion, tienda_id } = req.body;

  // Validación
  if (!apellidos || !nombres || !dni || !tienda_id) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios (apellidos, nombres, dni, tienda_id)' });
  }

  const sql = `
    INSERT INTO clientes (apellidos, nombres, dni, telefono, direccion, tienda_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(sql, [apellidos, nombres, dni, telefono, direccion, tienda_id]);
    res.status(201).json({
      id: result.insertId,
      mensaje: 'Cliente registrado correctamente',
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, t.tienda AS nombre_tienda
      FROM clientes c
      LEFT JOIN tiendas t ON c.tienda_id = t.id
      ORDER BY c.apellidos
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

// Obtener cliente por ID
exports.obtenerClientePorId = async (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT c.id, c.apellidos, c.nombres, c.dni, c.telefono, c.direccion,
           t.tienda AS nombre_tienda
    FROM clientes c
    LEFT JOIN tiendas t ON c.tienda_id = t.id
    WHERE c.id = ?
  `;

  try {
    const [cliente] = await db.query(sql, [id]);

    if (cliente.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el cliente' });
    }

    res.status(200).json(cliente[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar cliente
exports.actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { apellidos, nombres, dni, telefono, direccion, tienda_id } = req.body;

  let sqlParts = [];
  let values = [];

  if (apellidos) {
    sqlParts.push('apellidos = ?');
    values.push(apellidos);
  }

  if (nombres) {
    sqlParts.push('nombres = ?');
    values.push(nombres);
  }

  if (dni) {
    sqlParts.push('dni = ?');
    values.push(dni);
  }

  if (telefono) {
    sqlParts.push('telefono = ?');
    values.push(telefono);
  }

  if (direccion) {
    sqlParts.push('direccion = ?');
    values.push(direccion);
  }

  if (tienda_id) {
    sqlParts.push('tienda_id = ?');
    values.push(tienda_id);
  }

  if (sqlParts.length === 0) {
    return res.status(400).json({ mensaje: 'No hay datos por actualizar' });
  }

  const sql = `UPDATE clientes SET ${sqlParts.join(', ')} WHERE id = ?`;
  values.push(id);

  try {
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el cliente con ese ID' });
    }

    res.status(200).json({ mensaje: 'Cliente actualizado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM clientes WHERE id = ?';

  try {
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el cliente' });
    }

    res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};