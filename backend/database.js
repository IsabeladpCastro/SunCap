const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      primeiro_acesso INTEGER NOT NULL DEFAULT 1
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela "usuarios":', err.message);
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS exposicao_usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      data DATE NOT NULL UNIQUE,
      tempo_exposicao_segundos INTEGER NOT NULL DEFAULT 0,
      uv_medio REAL NOT NULL DEFAULT 0,
      FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela "exposicao_usuario":', err.message);
    }
  });
});

module.exports = db;
