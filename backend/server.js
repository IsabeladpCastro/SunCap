const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');   
const db = require('./database');
const os = require('os');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const getLocalIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address; 
      }
    }
  }
  return 'localhost';
};

app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post('/usuarios', (req, res) => {
  const { nome, email, senha, primeiro_acesso } = req.body;
  const query = `INSERT INTO usuarios (nome, email, senha, primeiro_acesso) VALUES (?, ?, ?, 1)`;

  db.run(query, [nome, email, senha, primeiro_acesso], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

app.post('/exposicao', (req, res) => {
  const { usuario_id, data, tempo_exposicao_segundos, uv_medio } = req.body;
  const query = `
    INSERT INTO exposicao_usuario (usuario_id, data, tempo_exposicao_segundos, uv_medio)
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    query,
    [usuario_id, data, tempo_exposicao_segundos, uv_medio],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  
  db.get(query, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    
    if (row.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }
    
    res.status(200).json({
      message: 'Login bem-sucedido',
      user: {
        id: row.id,
        nome: row.nome,
        email: row.email
      },
    });
  });
});


app.get('/exposicao/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  const query = `SELECT * FROM exposicao_usuario WHERE usuario_id = ?`;

  db.all(query, [usuario_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'UPDATE usuarios SET primeiro_acesso = 0 WHERE id = ?';
    db.run(query, [id], function (err) {
      if (err) {
        return res.status(500).send({ error: 'Erro ao atualizar usuário' });
      }
      res.status(200).send({ message: 'Usuário atualizado com sucesso' });
    });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao atualizar usuário' });
  }
});

app.get('/usuarios/:email', (req, res) => {
  const { email } = req.params;
  
  if (!email) {
    return res.status(400).json({ error: 'Parâmetro "email" é obrigatório.' });
  }

  const query = 'SELECT id FROM usuarios WHERE email = ?';
  
  db.get(query, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    
    res.json({ id: row.id });
  });
});

app.get('/usuarios/nome/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT nome FROM usuarios WHERE id = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json({ nome: row.nome });
  });
});

app.get('/usuarios/email/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT email FROM usuarios WHERE id = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json({ email: row.email });
  });
});

app.get('/usuarios/primeiro-acesso/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT primeiro_acesso FROM usuarios WHERE id = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json({ primeiro_acesso: row.primeiro_acesso });
  });
});

app.get('/exposicao/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  const query = `SELECT * FROM exposicao_usuario WHERE usuario_id = ?`;

  db.all(query, [usuario_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

const PORT = 3000;
const IP_ADDRESS = getLocalIPAddress();
const API_URL = `http://${IP_ADDRESS}:${PORT}`

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em ${API_URL}`);
});

