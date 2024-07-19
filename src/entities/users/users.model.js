import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
	  type: String,
	  required: true,
	  unique: true
	},
	password: {
	  type: String,
	  required: true
	},
	role: {
	  type: String,
	  enum: ['user', 'admin', 'super_admin'],
	  default: 'user'
	},
	is_active: {
	  type: Boolean,
	  default: true
	}
  }, { timestamps: true });
  
  const User = mongoose.model('User', userSchema);
  
  export default User;