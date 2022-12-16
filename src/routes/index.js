const express = require('express')
const auth = require('../middlewares/auth')
const LoginValidation = require('../validation/auth')

const authController = require('../controllers/authController')
const dashboardController = require('../controllers/dashboardController')
const pacientesController = require('../controllers/pacientesController')
const psicologosController = require('../controllers/psicologosController')
const atendimentosController = require('../controllers/atendimentosController')

const atendimentosValidation = require('../validation/atendimentos')
const psicologosValidation = require('../validation/psicologos')
const pacientesValidation = require('../validation/pacientes')

const routes = express.Router()

routes.post('/login', LoginValidation.login, authController.login)

//PSICOLOGOS
routes.get('/psicologos', psicologosController.listPsicologos)
routes.get('/psicologos/:id', psicologosValidation.getId,psicologosController.listPsicologo)
routes.post('/psicologos', psicologosValidation.create, psicologosController.createPsicologo)
routes.put('/psicologos/:id', psicologosValidation.update, psicologosController.updatePsicologo)
routes.delete('/psicologos/:id', psicologosValidation.deleteId,psicologosController.deletePsicologo)

// PACIENTES
routes.get('/pacientes', pacientesController.listPacientes)
routes.get('/pacientes/:id', pacientesValidation.getId, pacientesController.listPaciente)
routes.post('/pacientes', pacientesValidation.create, pacientesController.createPaciente)
routes.put('/pacientes/:id', pacientesValidation.update, pacientesController.updatePaciente)
routes.delete('/pacientes/:id', pacientesValidation.deleteId, pacientesController.deletePaciente)

// ATENDIMENTOS
routes.get('/atendimentos', atendimentosController.listAtendimentos)
routes.get('/atendimentos/:id', atendimentosValidation.getId, atendimentosController.listAtendimento)
routes.post('/atendimentos', atendimentosValidation.create, auth, atendimentosController.createAtendimento)
routes.delete('/atendimentos', atendimentosValidation.deleteId, auth, atendimentosController.createAtendimento)

// DASHBOARD
routes.get('/dashboard/numero-pacientes', dashboardController.numPacientes)
routes.get('/dashboard/numero-psicologos', dashboardController.numPsicologos)
routes.get('/dashboard/numero-atendimentos', dashboardController.numAtendimentos)
routes.get('/dashboard/media-atendimentos', dashboardController.mediaAtendimentos)

module.exports = routes