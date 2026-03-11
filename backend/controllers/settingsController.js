import Settings from '../models/Settings.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private/Owner
export const updateSettings = async (req, res) => {
  const { aboutText, contactInfo, featuredProjects } = req.body;
  const files = req.files;

  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    settings.aboutText = aboutText || settings.aboutText;
    
    try {
      if (contactInfo) {
        settings.contactInfo = typeof contactInfo === 'string' ? JSON.parse(contactInfo) : contactInfo;
      }
      if (featuredProjects) {
        settings.featuredProjects = typeof featuredProjects === 'string' ? JSON.parse(featuredProjects) : featuredProjects;
      }
    } catch (e) {
      console.error('Settings JSON parse error:', e);
    }

    // Handle Hero Image removal
    if (req.body.removeHeroImage === 'true') {
      if (settings.heroImage?.publicId) {
        await cloudinary.uploader.destroy(settings.heroImage.publicId);
      }
      settings.heroImage = undefined;
    }

    // Handle Hero Video removal
    if (req.body.removeHeroVideo === 'true') {
      if (settings.heroVideo?.publicId) {
        await cloudinary.uploader.destroy(settings.heroVideo.publicId, { resource_type: 'video' });
      }
      settings.heroVideo = undefined;
    }

    // Handle Hero Image upload
    if (files && files.heroImage) {
      if (settings.heroImage?.publicId) {
        await cloudinary.uploader.destroy(settings.heroImage.publicId);
      }
      settings.heroImage = {
        url: files.heroImage[0].path,
        publicId: files.heroImage[0].filename
      };
    }

    // Handle Hero Video upload
    if (files && files.heroVideo) {
      if (settings.heroVideo?.publicId) {
        await cloudinary.uploader.destroy(settings.heroVideo.publicId, { resource_type: 'video' });
      }
      settings.heroVideo = {
        url: files.heroVideo[0].path,
        publicId: files.heroVideo[0].filename
      };
    }

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
