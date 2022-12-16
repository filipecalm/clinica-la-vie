const create = require("./create")
const getId = require("./listById")
const update = require("./update")
const deleteId = require("./delete")

const PsicologosValidation = {
  create,
  getId,
  update,
  deleteId,
}

module.exports = PsicologosValidation