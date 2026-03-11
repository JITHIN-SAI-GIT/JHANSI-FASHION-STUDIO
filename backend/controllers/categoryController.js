import Category from '../models/Category.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update category cover image
// @route   PUT /api/categories/:name
// @access  Private/Owner
export const updateCategoryCover = async (req, res) => {
  try {
    const { name } = req.params;
    const category = await Category.findOne({ name });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Delete old image from Cloudinary if it exists and has a publicId
    if (category.publicId) {
      await cloudinary.uploader.destroy(category.publicId);
    }

    // Update with new image
    category.coverImage = req.file.path; // Cloudinary URL from multer-storage-cloudinary
    category.publicId = req.file.filename; // Cloudinary public ID
    
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seeding function (to be called once)
export const seedCategories = async () => {
  const initialCategories = [
    { name: 'Post Wedding Songs', title: 'Post Wedding Songs', description: 'Creative cinematic post-wedding videos with music storytelling.', coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Pre Wedding Songs', title: 'Pre Wedding Songs', description: 'Cinematic pre-wedding couple shoots with creative storytelling.', coverImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Function Banners', title: 'Function Banners', description: 'Custom designed banners and posters for all your special events.', coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Save the Date Posters', title: 'Save the Date Posters', description: 'Creative posters and videos to announce your special day.', coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Candidate / Couple Photos', title: 'Candidate / Couple Photos', description: 'Professional portraits and couple photography with artistic touch.', coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Birthday', title: 'Birthday', description: 'Celebrating milestones with fun and vibrant photography.', coverImage: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=compress&cs=tinysrgb&w=800' }
  ];

  try {
    // Delete categories that are not in the seed list
    const seedNames = initialCategories.map(c => c.name);
    await Category.deleteMany({ name: { $nin: seedNames } });

    for (const cat of initialCategories) {
      await Category.findOneAndUpdate(
        { name: cat.name },
        cat,
        { upsert: true, new: true }
      );
    }
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Category seeding failed:', error.message);
  }
};
