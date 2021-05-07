const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { func } = require('prop-types');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String, unique: true},
    role: {type: String, enum: ["user","admin"]},
    email: {type:String, unique: true},
    date: {type: Date},
    created: {type: Date}

})

//Creamos una funcion middelware para crear el valor de hash
// antes de que se guarde un documento
userSchema.pre("save", function(next){
    const user = this;
    if(this.isModified("password") || this.isNew){
        bcrypt.genSalt(10, function(saltError,salt){
            if(saltError){
                return next(saltError);
            }else{
                bcrypt.hash(user.password,salt,function(hashError,hash){
                    if(hashError){
                        return next(hashError);
                    }

                    user.password = hash;
                    next();
                })
            }
        } )
    }else{
        return next();
    }

})

userSchema.methods.checkPassword = function(password,callback){
    bcrypt.compare(password, this.password, function(error,success){
        if(error){
            return callback(error);
        }else{
            return callback(success);
        }
    })
}


/**
 * USO
 *  loginUser: function(username, password, callback) {
    UserModel.findOne({username: username}).exec(function(error, user) {
      if (error) {
        callback({error: true})
      } else if (!user) {
        callback({error: true})
      } else {
 *  user.comparePassword(password, function(matchError, isMatch) {
          if (matchError) {
            callback({error: true})
          } else if (!isMatch) {
            callback({error: true})
          } else {
            callback({success: true})
          }
        })
 */
module.exports = mongoose.model('users',userSchema);