const Sequelize = require('sequelize')
const Secret = require("../configs/secret")

const DB_NAME = Secret.DB_NAME
const DB_USER = Secret.DB_USER
const DB_PASS = Secret.DB_PASS
const DB_CONFIG = {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
}

let db = {}

try {
  db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG)
} catch (e) {
  console.error('Erro ao tentar conectar ao banco de dados! ')
}

async function hasConnection() {
  try {
    await db.authenticate()
    console.log('Banco de dados conectado! ')
  } catch (e) {
    console.error('Erro ao tentar conectar ao banco de dados!')
  }
}

Object.assign(db, {
  hasConnection
})

module.exports = db
