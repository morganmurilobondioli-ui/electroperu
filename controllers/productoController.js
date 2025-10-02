//Acceso a la BD mysql/promise
const db = require('../config/db'); 

//Métodos exportados
//req require (solicitud)
//res response (respuesta)

//Crear
exports.crearProducto = async (req, res) => {
  //1. Recepcionar los datos
  const{descripcion, garantia, precio} = req.body

  //Validaciión de backend
  if(!descripcion || garantia == undefined || !precio){
      return res.status(400).json({mensaje: 'Falta completar los campos'})
  }

  //3. Estrcutura la consulta ... ? = comodin (tienen un indice similar a un array)
  const sql = "INSERT INTO productos (descripcion, garantia, precio) VALUES (?,?,?)"

  //4. Transacción 
  try{
    //Ejecutamos la consulta
    const [result] = await db.query(sql, [descripcion, garantia, precio])

    //6. Entregar un resultado (PK)
    res.status(201).json({
      id: result.insertId,
      mensaje: 'Registrado Correctamente'
    })
  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno del servidor'})
  }
}

//Buscar
exports.obtenerProductos = async (req, res) => {
  //1. Preparar consulta
  const sql = "SELECT id, descripcion, garantia, precio FROM productos";

  //2. Transacción
  try {
    //Deserialización - PRIMER VALOR DEL ARREGLO
    const [productos] = await db.query(sql);
    //4. Enviamos los resultados
    res.status(200).json(productos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

//Buscar por ID
exports.obtenerProductosPorId = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, descripcion, garantia, precio FROM productos WHERE id = ?";

  try {
    const [productos] = await db.query(sql, [id]);

    if (productos.length === 0) {
      return res.status(404).json({ mensaje: 'No encontramos el producto' });
    }

    // Enviar el primer (único) producto como objeto
    res.status(200).json(productos[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

//Actualizar 
exports.actualizarProducto = async (req, res) => {
  //Necesitamos parámetro
  const{id} = req.params

  //Leer un JSON Body
  const{descripcion,garantia,precio}=req.body

  //Validación
  if(!descripcion && garantia && undefined && !precio){
      return res.status(400).json({mensaje: 'Falta completar los campos'})
  }

  //Algoritmo eficiente de actualización
  //NO SE HARÁ => UPDATE productos SET descripcion = ?, garantia = ?, precio =? WHERE id = ?
  //SE DESAROLLARÁ => UPDATE productos SER precio = ? WHERE id = ?
  let sqlParts = []//campos que sufrirán actualización
  let values = []//valores para los campos

  if (descripcion){
    sqlParts.push('descripcion = ?')
    values.push(descripcion)
  }

  if (garantia != undefined){
    sqlParts.push('garantia = ?')
    values.push(garantia)
  }

  if(precio){
    sqlParts.push('precio = ?')
    values.push(precio)
  }

  if(sqlParts.length == 0){
    return res.status(400).json({mensaje: 'No hay datos por actualizar'})
  }

  //Construir de manera dinamica la consulta
  const sql = `UPDATE productos SET ${sqlParts.join(', ')} WHERE id = ?`
  values.push(id)

  try{
    const [result] = await db.query(sql, values)

    if(result.affectedRows === 0){
      return res.status(404).json({mensaje: 'No encontramos el producto con el ID'})
    }

    res.status(200).json({mensaje: 'Actualizado correctamente'})

  }catch(e){
    console.error(e)
    res.status(500).json({mensaje: 'Error interno en el servidor'})
  }
}

//Eliminar 
exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM productos WHERE id = ?" //¡Cuidado! DELETE ES IRRESVERSIBLE

  try {
    const [result] = await db.query(sql, [id]);

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No encontramos el producto' });
    }

    await db.query("DELETE FROM productos WHERE id = ?", [id]);

    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};



