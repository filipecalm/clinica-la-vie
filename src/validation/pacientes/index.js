const create = require("./create")
const getId = require("./listById")
const update = require("./update")
const deleteId = require("./delete")

const PacienteValidation = {
  create,
  getId,
  update,
  deleteId,
}

module.exports = PacienteValidation