const Author = require('../models/author');

exports.login =(req, res) =>{
    res.render('sessions/login', {
        title: 'Login'
    });
};

exports.authenticate = (req, res) => {
    Author.findOne({email: req.body.email})
    .then(author =>{
        if(!author) throw new Error('ERROR: your credentials do not match');

        author.authenticate(req.body.password, (err, isMatch)=>{
            if(err) throw new Error(err);
            
            if(isMatch) {
                req.session.userId = author.id;
                req.flash('success','you are now logged in');
                res.redirect('/blogs');
            }
            else{
                req.flash('error','ERROR: your credentials do not match');
                res.redirect('/login');
            }
        });
    })
    .catch(err =>{
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/login');
    });
};


exports.logout = (req, res) => {
    req.session.userId = null;
    req.flash('success', 'you are now logged out');
    res.redirect('/');
};
