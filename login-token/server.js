const mysql = require('mysql');

// Configuración de la conexión
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'jeremy12345JL30',
    database: 'UsuariosJson'
});

// Establecer la conexión
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');

    // Ejemplo de consulta
    connection.query('SELECT * FROM usuarios', (error, results, fields) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            return;
        }
        console.log('Resultados de la consulta:', results);

        // Cerrar la conexión cuando ya no sea necesaria
        connection.end();
        console.log('Conexión cerrada');
    });
});
