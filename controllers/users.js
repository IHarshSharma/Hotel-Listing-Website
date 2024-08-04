const User = require("../models/user");

module.exports.renderSignupForm =  (req, res) => {
    res.render("./users/signup.ejs");
  };
  
  module.exports.usersSignup = async (req, res, next) => {
      try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
          if (err) {
            return next(err);
          }
          req.flash("success", "Welcome to Wanderlust!");
          res.redirect("/listings");
        });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }
    };
  
  module.exports.renderLoginForm  = (req, res) => {
    res.render("./users/login.ejs");
  };
  
  module.exports.postLoginPage = 
    async (req, res) => {
      req.flash("success", "Welcome back to Wanderlust");
      let redirectUrl = res.locals.redirectUrl || "/listings";
      try{
          res.redirect(redirectUrl);
      }
      catch (e) {
          res.redirect("/listings");
      }
       
    };
  
  module.exports.usersLogout = (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Logged out!");
      res.redirect("/listings");
    });
  };