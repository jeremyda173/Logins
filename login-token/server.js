const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Usa el middleware cors

// Configurar la conexión a MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'jeremy12345JL30', // Cambia esto por tu contraseña de MySQL
    database: 'UsuariosJson'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    // Verificar si el usuario ya existe en la base de datos
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ message: 'Error buscando usuario' });
        }

        // Si el usuario ya existe, devolver un error
        if (results.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Si el usuario no existe, proceder con el registro
        const hashedPassword = bcrypt.hashSync(password, 8);

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(query, [username, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ message: 'Error registrando usuario' });
            }
            res.json({ message: 'Usuario registrado exitosamente' });
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
