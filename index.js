const express = require('express');
const sqlite = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const bp = require('body-parser')


const app = express();
app.use(cors());
    
app.use(bp.json())



const db = new sqlite.Database('./imdb.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conexión exitosa');
    }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener datos de la base de datos
app.get('/a', (req, res) => {
    db.all('SELECT * FROM movies LIMIT 10', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post("/", (req, res) => {
    console.log("Datos recibidos en la solicitud POST:", req.body); // Imprime todos los datos recibidos en la consola del servidor

    const { year, score, votes } = req.body;
    let sql = 'SELECT * FROM Movie WHERE 1=1';
    const params = [];
    if (year) {
        sql += ' AND Year = ?';
        params.push(year);
    }
    if (score) {
        sql += ' AND Score < ?';
        params.push(score);
    }
    if (votes) {
        sql += ' AND Votes < ?';
        params.push(votes);
    }
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log("Datos filtrados:", rows);
        res.json(rows);
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
