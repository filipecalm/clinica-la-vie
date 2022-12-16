const { Atendimentos, Pacientes } = require('../models')
const jwt_decode = require('jwt-decode')

const atendimentosController = {
  listAtendimentos: async (req, res) => {
    try {
      const listaAtendimentos = await Atendimentos.findAll()

      if (!listaAtendimentos) {
        return listaDeAtendimentos = []
      }

      return res.status(200).json(listaAtendimentos)
    } catch (e) {
      return res.status(404).json('Há um erro na requisição')
    }
  },

  listAtendimento: async (req, res) => {
    try {
      const { id } = req.params
      const atendimento = await Atendimentos.findByPk(id)

      if (!atendimento) {
        return res.status(404).json('Id não encontrado')
      }

      return res.status(200).json(atendimento)
    } catch (e) {
      res.status(500).json('Há um erro na requisição')
    }
  },


  async createAtendimento(req, res) {
    try {
      const { data_atendimento, observacao, id_paciente } = req.body

      const token = req.headers['authorization']
      const idToken = jwt_decode(token).id
      
      const pacienteExists = await Pacientes.count({ where: { id: id_paciente } })
      if (!pacienteExists) {
        return res.status(404).json('Não existe o paciente com o Id informado! ')
      }

      if (!idToken) {
        return res.status(400).json('Erro de autorização! ')
      }
      const newAtendimento = await Atendimentos.create({
        data_atendimento,
        observacao,
        id_paciente,
        id_psicologo: idToken,
      })

      return res.status(201).json(newAtendimento)

    } catch (e) {
      return res.status(400).json('Há um erro na requisição! ')
    }
  },
}

module.exports = atendimentosController
