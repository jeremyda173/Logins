const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Creamos la conexión a MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'jeremy12345JL30',
    database: 'UsuariosJson',
    port: 3306,
    ssl: null
});

// Manejo de errores de conexión
db.connect(err => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL con Json.');
});

app.post('/guardarDatos', async (req, res) => {
    const userData = req.body;

    console.log('Datos recibidos del cliente:', userData);

    // Validar datos del usuario
    if (!userData.name || !userData.age || !userData.email || !userData.pass) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(userData.pass, 10);

        // Insertar datos en la base de datos
        const sql = 'INSERT INTO Users (nombre, edad, email, password) VALUES (?, ?, ?, ?)';
        await db.query(sql, [userData.name, userData.age, userData.email, hashedPassword]);
        console.log('Datos insertados en la base de datos');
        res.send('Datos recibidos y guardados correctamente.');
    } catch (error) {
        console.error('Error al insertar datos en la base de datos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
