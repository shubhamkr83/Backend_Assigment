const Seller = require('../../models/seller')
const passport = require('passport')
function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.role === 'seller' ? '/seller' : '/customer'
    }

    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            const { email, password } = req.body
            // Validate request 
            if (!email || !password) {
                // req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    // req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    // req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        // req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },


        register(req, res) {
            res.render('auth/register')
        },


        async postRegister(req, res) {
            const { email, business_name, password, Cpassword, role } = req.body
            // Validate request 
            if (!email || !business_name || !password || !Cpassword || !role) {
                return res.redirect('/register')
            }

            // Check if email exists 
            Seller.exists({ email: email }, (err, result) => {
                if (result) {
                    return res.redirect('/register')
                }
            })

            // Create a user 
            const seller = new Seller({
                email, business_name, password, Cpassword, role
            })
            console.log(Seller);
            seller.save().then((seller) => {
                // Login
                return res.redirect('/login')
            }).catch(err => {
                // req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            })
        },


        logout(req, res) {
            req.logout()
            return res.redirect('/login')
        },

        storeInfo(req, res) {
            res.render('seller/storeInfo')
        },

        inventory(req, res) {
            res.render('seller/inventory')
        }
    }
}

module.exports = authController