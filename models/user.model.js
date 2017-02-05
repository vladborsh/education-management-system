var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var roles = ['Admin', 'Teacher', 'User'];

var UserSchema = new Schema({
	password: {
		type : String
	},
	email: {
		type : String, unique: true
	},
	lastName: {
		type : String
	},
	firstName: { 
		type: String
	},
	role: { 
		type: String, enum: roles
	}
});

UserSchema.pre('save', function (next) {
	var user = this;
	bcrypt.hash(user.password, null, null, function (err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
