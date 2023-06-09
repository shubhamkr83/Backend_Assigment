const authController = require('../http/controllers/authController')
const guest = require('../http/middlewares/guest')
const auth = require('../http/middlewares/auth')



function initRoutes(app) {
    app.get('/',)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/storeInfo', auth, authController().storeInfo)
    app.get('/inventory', auth, authController().inventory)
}

module.exports = initRoutes
