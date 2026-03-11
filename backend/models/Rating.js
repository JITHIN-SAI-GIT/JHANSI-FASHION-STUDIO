import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

// Unique rating per user per project
ratingSchema.index({ userId: 1, projectId: 1 }, { unique: true });

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;
