import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  heroImage: {
    url: String,
    publicId: String
  },
  heroVideo: {
    url: String,
    publicId: String
  },
  aboutText: {
    type: String,
    default: 'Welcome to Jhansi Fashion Studio. We capture your most precious moments with elegance and style.'
  },
  contactInfo: {
    email: String,
    phone: String,
    address: String,
    socialLinks: {
      instagram: String,
      facebook: String,
      whatsapp: String
    }
  },
  featuredProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }]
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
