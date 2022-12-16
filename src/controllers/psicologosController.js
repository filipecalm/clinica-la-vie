const { Psicologos } = require('../models')
const bcrypt = require('bcryptjs')

const psicologosController = {
  listPsicologos: async (req, res) => {
    try {
      const listaDePsicologos = await Psicologos.findAll()

      if (!listaDePsicologos) {
        return listaDePsicologos = []
      }

      return res.status(200).json(listaDePsicologos)
    } catch (e) {
      return res.status(404).json('Id não encontrado!')
    }
  },

  listPsicologo: async (req, res) => {
    try {
      const { id } = req.params
      const psicologo = await Psicologos.findByPk(id)

      if (psicologo == null) {
        return res.status(404).json('Id não encontrado')
      } else {
        return res.status(200).json(psicologo)
      }

    } catch (e) {
      return res.status(404).json('Id não encontrado!')
    }
  },

  async createPsicologo(req, res) {
    try {
      const { nome, email, senha, apresentacao } = req.body
      const newSenha = bcrypt.hashSync(senha, 10)

      const emailExists = await Psicologos.count({
        where: {
          email,
        },
      })

      if (emailExists) {
        return res.status(400).json('Já existe um psicologo com esse email,  por favor, tente outro email')
      }

      const newPsicologo = await Psicologos.create({
        nome,
        email,
        senha: newSenha,
        apresentacao,
      })

      return res.status(201).json(newPsicologo)
    } catch (e) {
      return res.status(400).json('Há um erro na requisição!')
    }
  },

  async updatePsicologo(req, res) {
    try {
      const { id } = req.params
      const { nome, email, senha, apresentacao } = req.body
      const newSenha = bcrypt.hashSync(senha, 10)

      const psicologoUpdated = await Psicologos.update(
        {
          nome,
          email,
          senha: newSenha,
          apresentacao,
        },
        {
          where: {
            id
          }
        }
      )

      const idExists = await Psicologos.count({
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
      return res.status(400).json('Há um erro na requisição:')
    }
  },

  async deletePsicologo(req, res) {
    try {
      const { id } = req.params

      const idExists = await Psicologos.count({
        where: {
          id,
        },
      })

      if (!idExists) {
        return res.status(404).json('Id não encontrado')
      }else {
        const psicologoDeleted = await Psicologos.destroy({
          where: {
            id,
          }
        })
        return res.status(204).json(psicologoDeleted)
      }

    } catch (e) {
      return res.status(500).json('Há um erro na requisição')
    }
  },
}

module.exports = psicologosController
