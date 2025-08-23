const User = require("../models/user");

const userController = {};

// Render signup form
userController.renderSignupForm = (req, res) => {
   res.render("users/signup.ejs");
};

// Signup handler
userController.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome To WanderLust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

// Render login form
userController.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// Login handler
userController.login = async (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl); 
};

// Logout handler
userController.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out..!");
        res.redirect("/listings");
    });
};

module.exports = userController;
