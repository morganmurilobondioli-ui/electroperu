## 🧭 Procedimientos

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/electroperu.git
```
2️⃣ Restaurar la Base de Datos 🗄️
Ejecuta el siguiente script SQL en tu gestor (MySQL Workbench):

```
sql
-- 🏬 TABLA TIENDAS
CREATE TABLE tiendas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tienda VARCHAR(100) NOT NULL
) ENGINE=INNODB;

-- 🧩 TABLA PRODUCTOS
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(50) NOT NULL,
  garantia TINYINT NOT NULL,
  precio DECIMAL(7,2) NOT NULL
) ENGINE=INNODB;

-- 🧑‍🤝‍🧑 TABLA CLIENTES
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  apellidos VARCHAR(100) NOT NULL,
  nombres VARCHAR(100) NOT NULL,
  dni CHAR(8) NOT NULL,
  telefono VARCHAR(20),
  direccion VARCHAR(100),
  tienda_id INT,
  FOREIGN KEY (tienda_id) REFERENCES tiendas(id)
) ENGINE=INNODB;
```


3️⃣ Abrir el proyecto en VSCode 💻
Abre la carpeta del proyecto electroperu en Visual Studio Code.

4️⃣ Instalar dependencias 📦
Abre la terminal (Ctrl + Ñ) y ejecuta:
```
npm install
```
Esto instalará todas las dependencias definidas en el archivo package.json.

5️⃣ Crear el archivo .env 🔐
Crea un archivo llamado .env en la raíz del proyecto y agrega tus credenciales de base de datos:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=electroperu
DB_PORT=3306
```
6️⃣ Ejecutar el servidor 🚀
Inicia el proyecto con:

```
nodemon server
```
El servidor se ejecutará en:
👉 http://localhost:3000/index_clientes.html
