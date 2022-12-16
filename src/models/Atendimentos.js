const db = require('../database')
const { DataTypes } = require('sequelize')
const Pacientes = require('./Pacientes')
const Psicologos = require('./Psicologos')

const Atendimentos = db.define(
  'Atendimentos',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    data_atendimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observacao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_psicologo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Psicologos,
        key: 'id'
      }
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pacientes,
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'atendimentos',
  }
)

module.exports = Atendimentos