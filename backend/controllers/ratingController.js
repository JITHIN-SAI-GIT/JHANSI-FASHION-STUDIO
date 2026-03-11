import Rating from '../models/Rating.js';
import Project from '../models/Project.js';

// @desc    Add or update rating for a project
// @route   POST /api/ratings
// @access  Private/User
export const addRating = async (req, res) => {
  const { projectId, rating, comment } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check if user already rated this project
    const existingRating = await Rating.findOne({
      userId: req.user._id,
      projectId: projectId
    });

    if (existingRating) {
      existingRating.rating = rating;
      if (comment !== undefined) existingRating.comment = comment;
      await existingRating.save();
      return res.json(existingRating);
    }

    const newRating = await Rating.create({
      userId: req.user._id,
      projectId,
      rating,
      comment
    });

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get average rating for a project
// @route   GET /api/ratings/:projectId
// @access  Public
export const getAvgRating = async (req, res) => {
  try {
    const ratings = await Rating.find({ projectId: req.params.projectId });

    if (ratings.length === 0) {
      return res.json({ averageRating: 0, totalRatings: 0 });
    }

    const avgRating = ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length;

    res.json({
      averageRating: avgRating,
      totalRatings: ratings.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all reviews (ratings with comments)
// @route   GET /api/ratings/reviews/all
// @access  Public
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Rating.find({ comment: { $exists: true, $ne: '' } })
      .populate('userId', 'name photo')
      .populate('projectId', 'title category')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
