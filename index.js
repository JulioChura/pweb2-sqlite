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
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.post("/", (req, res) => {
    console.log(req.body)
    console.log("llego")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
