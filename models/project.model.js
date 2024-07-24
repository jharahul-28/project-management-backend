import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Name is required"], 
    },
    description: { 
        type: String, 
        required: [true, "Description is required"], 
    },
    deadline: { 
        type: Date, 
        required: [true, "Deadline is required"], 
    },
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;