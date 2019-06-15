const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR =10;


const AuthorSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true    
    },
    email:{
       type: String,
        required:true
    },
    password:{
       type: String,
        required:true
    }
}, 
{
    timestamps: true
});

// A virtual property/attribute for passwordConfirmation
AuthorSchema.virtual('passwordConfirmation')
  .get(() => this.passwordConfirmation)
  .set(value => this.passwordConfirmation = value);

//our hook operation
AuthorSchema.pre('save', function (next){
    const author = this;
    
    if(!author.isModified('password')) return next();
    if(author.password !== author.passwordConfirmation) throw new Error('your passwords do not match');

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(author.password, salt, (err, hash) => {
          if (err) return next(err);
    
          author.password = hash;
          next();
        });
    });
});

// our helper method
// allow us to compare password to plain text
AuthorSchema.methods.authenticate = function (plainPassword, callback){
    //plaintext, hash, callback
    bcrypt.compare(plainPassword, this.password, (err, isMatch) =>{
        if (err) return callback(err);
        callback(null, isMatch);
    });
};


module.exports = mongoose.model('Author', AuthorSchema);

