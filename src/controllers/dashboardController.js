const { Atendimentos, Psicologos, Pacientes } = require('../models')

const dashboardController = {
  async numPacientes (req,res) {
    try {
      const pacientes = await Pacientes.count()
      return res.status(200).json(pacientes)
    } catch (e) {
      return res.status(500).json('Erro ao calcular o número de pacientes')
    }
  },
  
  async numPsicologos (req,res) {
    try {
      const psicologos = await Psicologos.count()
      return res.status(200).json(psicologos)
    } catch (e) {
      return res.status(500).json('Erro ao calcular o número de psicologos')
    }
  },

  async numAtendimentos (req,res) {
    try {
      const atendimentos = await Atendimentos.count()
      return res.status(200).json(atendimentos)
    } catch (e) {
      return res.status(500).json('Erro ao calcular o número de atendimentos')
    }
  },

  async mediaAtendimentos (req,res) {
    try {
      const atendimentos = await Atendimentos.count()
      const psicologos = await Psicologos.count()
      const media = (atendimentos / psicologos).toFixed(2)

      return res.status(200).json(media)
    } catch (e) {
      return res.status(500).json('Erro ao calcular a média de atendimentos')
    }
  },
}

module.exports = dashboardController