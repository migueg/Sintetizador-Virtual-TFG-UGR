const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String, unique: true, length: 80},
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

userSchema.methods.changePassword = function(password,callback){
    const user = this
    bcrypt.genSalt(10, function(saltError,salt){
        if(saltError){
            return saltError;
        }else{
            bcrypt.hash(password,salt,function(hashError,hash){
                if(hashError){
                    return callback(hashError);
                }
             
                user.updateOne({password: hash},function(err){

                })

                return callback('success');
            })
        }
    } )
}


module.exports = mongoose.model('users',userSchema);