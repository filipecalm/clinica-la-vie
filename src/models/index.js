const Atendimentos = require('./Atendimentos')
const Psicologos = require('./Psicologos')
const Pacientes = require('./Pacientes')

Psicologos.hasMany(Atendimentos, {
	foreignKey: "id_psicologo",
})

Atendimentos.belongsTo(Psicologos, {
	foreignKey: "id_psicologo",
})

Pacientes.hasMany(Atendimentos, {
	foreignKey: "id_paciente",
})

Atendimentos.belongsTo(Pacientes, {
	foreignKey: "id_psicologo",
})

module.exports = {
  Psicologos,
  Atendimentos,
  Pacientes,
}