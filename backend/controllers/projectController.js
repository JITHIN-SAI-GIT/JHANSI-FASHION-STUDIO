import Project from '../models/Project.js';
import Rating from '../models/Rating.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Owner
export const createProject = async (req, res) => {
  const { title, category, description } = req.body;
  const files = req.files;

  try {
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one image or video' });
    }

    const mediaUrls = files.map(file => ({
      url: file.path,
      type: file.mimetype.startsWith('video') ? 'video' : 'image',
      publicId: file.filename
    }));

    const project = await Project.create({
      title,
      category,
      description,
      mediaUrls,
      owner: req.user._id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all projects or by category
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};

  try {
    const projects = await Project.find(query)
      .populate('owner', 'username')
      .sort({ createdAt: -1 });
    
    // For each project, calculate average rating
    const projectsWithRatings = await Promise.all(projects.map(async (project) => {
      const ratings = await Rating.find({ projectId: project._id });
      const avgRating = ratings.length > 0 
        ? ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length 
        : 0;
      
      return {
        ...project._doc,
        averageRating: avgRating,
        totalRatings: ratings.length
      };
    }));

    res.json(projectsWithRatings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Owner
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete media from Cloudinary
    for (const media of project.mediaUrls) {
      const resourceType = media.type === 'video' ? 'video' : 'image';
      await cloudinary.uploader.destroy(media.publicId, { resource_type: resourceType });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update project details
// @route   PUT /api/projects/:id/update
// @access  Private/Owner
export const updateProjectDetails = async (req, res) => {
  const { title, category, description } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.category = category || project.category;
      project.description = description || project.description;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Delete project media
// @route   DELETE /api/projects/:id/media/:mediaId
// @access  Private/Owner
export const deleteProjectMedia = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      const mediaItem = project.mediaUrls.find(m => m._id.toString() === req.params.mediaId || m.publicId === req.params.mediaId);
      
      if (mediaItem) {
        await cloudinary.uploader.destroy(mediaItem.publicId, {
          resource_type: mediaItem.type === 'video' ? 'video' : 'image'
        });
        project.mediaUrls = project.mediaUrls.filter(m => m._id.toString() !== req.params.mediaId && m.publicId !== req.params.mediaId);
        await project.save();
        res.json({ message: 'Media removed', mediaUrls: project.mediaUrls });
      } else {
        res.status(404).json({ error: 'Media not found' });
      }
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Upload project media
// @route   POST /api/projects/:id/upload
// @access  Private/Owner
export const uploadProjectMedia = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      if (req.files && req.files.length > 0) {
        const newMedia = req.files.map((file, index) => ({
          url: file.path,
          type: file.mimetype.startsWith('video') ? 'video' : 'image',
          publicId: file.filename,
          order: project.mediaUrls.length + index
        }));
        project.mediaUrls = [...project.mediaUrls, ...newMedia];
        const updatedProject = await project.save();
        res.status(201).json(updatedProject);
      } else {
        res.status(400).json({ error: 'No files uploaded' });
      }
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update project cover
// @route   PUT /api/projects/:id/cover
// @access  Private/Owner
export const updateProjectCover = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      if (req.files && req.files.length > 0) {
        const file = req.files[0];
        
        // Delete old cover if exists
        if (project.coverMedia?.publicId) {
          await cloudinary.uploader.destroy(project.coverMedia.publicId, {
            resource_type: project.coverMedia.type === 'video' ? 'video' : 'image'
          });
        }

        project.coverMedia = {
          url: file.path,
          type: file.mimetype.startsWith('video') ? 'video' : 'image',
          publicId: file.filename
        };
        
        const updatedProject = await project.save();
        res.json(updatedProject);
      } else {
        res.status(400).json({ error: 'No file uploaded' });
      }
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update media order
// @route   PUT /api/projects/:id/reorder
// @access  Private/Owner
export const reorderProjectMedia = async (req, res) => {
  const { mediaOrder } = req.body; // Array of { id, order }

  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      mediaOrder.forEach(item => {
        const media = project.mediaUrls.id(item.id);
        if (media) {
          media.order = item.order;
        }
      });

      project.mediaUrls.sort((a, b) => a.order - b.order);
      await project.save();
      res.json(project.mediaUrls);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
