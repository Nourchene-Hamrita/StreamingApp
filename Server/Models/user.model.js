const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new Schema(
    {
        firstname: {
            type: String,
          
        },
        lastname: {
            type: String,
    

        },
        age: {
            type: Number,
          
        },

        login: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim:true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minLength: 6

        },
        picture: {
            type: String,
            default:"http://192.168.1.9:3000/public/605b0abf022908280c811bca1617801073904.jpg"
            
          },
        likes: {
            type: [String],

        },
        dislikes: {
            type: [String],

        },
        country: {
            type: String,
        

        }, 
        following: {
            type: [String]
        },
    },
    { Timestamp: true }
);
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.statics.login = async function(login, password) {
    const user = await this.findOne({ login });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect login')
  };
const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel;
