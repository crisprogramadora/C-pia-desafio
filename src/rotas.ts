import { Router } from 'express'
import ControladorUsuario from './controladores/controladorUsuario'
import ControladorLogin from './controladores/controladorLogin'
import { listarMaterias } from './controladores/controladorMateria'
import authMiddleware from './middleares/autenticacao'
import ControladorResumo from './controladores/controladorResumo'
//import ControladorMateria from './controladores/controladorMateria'


const rotas = Router()

rotas.post('/usuarios', new ControladorUsuario().cadastrarUsuario)

rotas.post('/login', new ControladorLogin().login)

rotas.use(authMiddleware)

rotas.get('/materias', listarMaterias)

rotas.post('/resumos', new ControladorResumo().cadastrarResumo)

rotas.get('/resumos/', new ControladorResumo().listarResumos)

rotas.get('/resumos/:id', new ControladorResumo().listarResumosPorMateria)

rotas.put('/resumos/:id', new ControladorResumo().editarResumo)

rotas.delete('/delete', new ControladorResumo().deletarResumo)


export default rotas