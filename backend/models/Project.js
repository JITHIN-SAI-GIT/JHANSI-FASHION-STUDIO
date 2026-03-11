import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Post Wedding Songs', 'Pre Wedding Songs', 'Function Banners', 'Save the Date Posters', 'Candidate / Couple Photos', 'Birthday']
  },
  description: {
    type: String,
    required: true
  },
  mediaUrls: [{
    url: String,
    type: {
      type: String,
      enum: ['image', 'video']
    },
    publicId: String,
    order: {
      type: Number,
      default: 0
    }
  }],
  coverMedia: {
    url: String,
    type: {
      type: String,
      enum: ['image', 'video']
    },
    publicId: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
