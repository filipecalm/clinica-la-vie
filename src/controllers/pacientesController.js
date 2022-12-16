const { Pacientes } = require('../models')

const PacientesController = {
  listPacientes: async (req, res) => {
    try {
      const listaDePacientes = await Pacientes.findAll()
      
      if (!listaDePacientes) {
        return listaDePacientes = []
      }
      
      return res.status(200).json(listaDePacientes)
    } catch (e) {
      return res.status(400).json('Há um erro na requisição!')
    }
  },

  listPaciente: async (req, res) => {
    try {
      const { id } = req.params
      const paciente = await Pacientes.findByPk(id)

      if (paciente == null) {
        return res.status(404).json('Id não encontrado')
      } else {
        return res.status(200).json(paciente)
      }


    } catch (e) {
      return res.status(404).json('Id não encontrado!')
    }
  },

  async createPaciente(req, res) {
    try {
      const { nome, email, idade } = req.body

      const emailExists = await Pacientes.count({
        where: {
          email,
        },
      })

      if (emailExists) {
        return res.status(400).json('Já existe um paciente com esse email, por favor, tente outro email!')
      }

      const novoPaciente = await Pacientes.create({
        nome,
        email,
        idade,
      })

      return res.status(201).json(req.body)
    } catch (e) {
      return res.status(400).json('Há um erro na requisição')
    }
  },

  async updatePaciente(req, res) {
    try {
      const { id } = req.params
      const { nome, email, idade } = req.body

      const pacienteUpdated = await Pacientes.update(
        {
          nome,
          email,
          idade,
        },
        {
          where: {
            id,
          }
        }
      )

      const idExists = await Pacientes.count({
        where: {
          id,
        },
      })

      if (!idExists) {
        return res.status(400).json('Id não encontrado')
      } else {
        return res.status(200).json(req.body)
      }

    } catch (e) {
      return res.status(400).json('Há um erro na requisição')
    }
  },

  async deletePaciente(req, res) {
    try {
      const { id } = req.params
      const idExists = await Pacientes.count({
        where: {
          id,
        },
      })

      if (!idExists) {
        return res.status(404).json('Id não encontrado')
      } else {
        const pacienteDeleted = await Pacientes.destroy({
          where: {
            id,
          }
        })
        return res.status(204).json(pacienteDeleted)
      }
    } catch (e) {
      return res.status(500).json('Há um erro na requisição')

    }
  },
}

module.exports = PacientesController
