# Procedimientos

1. Clonar repositorio
git clone https://...

2. Restaurar la BD 
```sql
create TABLE productos
(
	id 			INT auto_increment primary KEY,
    descripcion VARCHAR(50) NOT NULL,
    garantia tinyint NOT NULL,
    precio 		DECIMAL(7,2) NOT NULL
)ENGINE = INNODB;

```

3. Abrir el proyecto _electroperu_ en VSCode

4. Abrir la terminar **CTRL + Ñ *** escribir:
```
npm install
```
Se ejecutará la instalacion de todas las dependencias definidas en **package.json**

5. Crear e Ingresar los parámetros en el archivo **.env** 

6. Ejecutar el servidar (_nodemon_)
```
nodemon server
```
7. Verificar cada verbo (GET/POST/PUT/DELETE) utilizando POSTMAN, ThunderClient