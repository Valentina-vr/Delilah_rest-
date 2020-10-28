# Delilah Restó 🍎

Bienvenidos,

Esta API le permitirá interactuar con nuestro restaurante **Delilah Restó**. podrás registrarte, ver el listado de nuestros productos y realizar tu pedido. nuestros administradores podrán recibir y actualizar el estado de los pedidos.

## Pre-requisitos de nuestra API 🥩

1. Instale y configure un servidor de base de datos [MYSQL].
2. Debe contar con editor de código, te recomiendo VSCode.
3. Instale [NodeJS](https://nodejs.org/es/) en su equipo.
4. Instale la librería [Dotenv]().
5. [**Opcional**] Necesitará de una herramienta para probar la API, te recomiendo [Postman]().

## Instalación 🧀

1. [**OPCIONAL**] Ingresa a tu base de datos y y ejecuta el archivo **database.sql**.

2. Vaya la terminal de VSCode, en este debes asegurarte de estar en la ruta de la carpeta `Back` e instale las dependencias del proyecto ejecutando el comando: 

```
npm install
```

3. Ya instaladas las dependencias, debe crear el archivo **.env**, para usar sus variables de entorno, este seberá ser creado en la carpeta del proyecto

```
USER = <Usuario de base de datos>
PASS = <contraseña de base de datos>
SECRET = <clave secreta que usted desee>
PORT = <puerto en que la aplicacion correrá, este debe ser distinto a la base de datos>
```
4. Para iniciar la aplicacion ejecute el comando:

```
npm start
```

Si llegaste hasta aquí es porque ya está todo listo, podrás ejecutar tus respectivas pruebas 😁
