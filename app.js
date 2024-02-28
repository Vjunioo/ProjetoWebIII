const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aluno',
    password: 'ifpecjbg',
    database: 'projetoweb3'
});

connection.connect((err) => {
    if (err) {
     console.error('Error ao conectar ao Banco de Dados: ' + err.message);
     
    } else{
        console.log('Conectado ao MYSQL');

    }
});
app.use(express.urlencoded({extended: true }));
app.use(express.json());



app.post('/api/usuarios', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    connection.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir registro: ' + err.message);
            res.status(500).json({ error: 'Erro ao inserir registro' });
        } else {
            console.log('Registro inserido com sucesso!');
            res.status(201).json({ message: 'Registro inserido com sucesso' });
        }
    });
});

app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter usuários: ' + err.message);
            res.status(500).json({ error: 'Erro ao obter usuários' });
        } else {
            console.log('Usuários obtidos com sucesso!');
            res.status(200).json({ usuarios: results });
        }
    });
});

app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;

    const sql = 'UPDATE usuarios SET email = ?, senha = ? WHERE id = ?';
    
    connection.query(sql, [email, senha, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar usuário: ' + err.message);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        } else {
            console.log('Usuário atualizado com sucesso!');
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        }
    });
});

app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM usuarios WHERE id = ?';

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir usuário: ' + err.message);
            res.status(500).json({ error: 'Erro ao excluir usuário' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Usuário excluído com sucesso!');
                res.status(200).json({ message: 'Usuário excluído com sucesso' });
            } else {
                console.log('Usuário não encontrado para exclusão');
                res.status(404).json({ error: 'Usuário não encontrado para exclusão' });
            }
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});


     
     


