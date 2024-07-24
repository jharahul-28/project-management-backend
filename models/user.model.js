import mongoose from "mongoose";

const userDetailsSchema = mongoose.Schema({
  username: { 
    type: String, 
    required: [true, "Username is required"], 
    unique: [true, "Username should be unique"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: [true, "Email should be unique"] 
  },
  password: { 
    type: String, 
    required: [true, "Password is required"] 
  },
  role: {
    type: String,
    enum: ["admin", "team lead", "team member", "client"],
    required: [true, "Role is required"],
  },
  joiningId: { 
    type: String, 
    required: [true, "Joining ID is required"] 
  },
},{
    timestamps: true,
}
);

const User= mongoose.model("User", userDetailsSchema);

export default User;