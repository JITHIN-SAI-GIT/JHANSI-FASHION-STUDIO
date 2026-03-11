import express from 'express';
import { 
  createProject, 
  getProjects, 
  deleteProject, 
  updateProjectDetails,
  deleteProjectMedia,
  uploadProjectMedia,
  updateProjectCover,
  reorderProjectMedia 
} from '../controllers/projectController.js';
import { protect, ownerOnly } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getProjects);

// Media upload requires multer middleware
router.post('/', protect, ownerOnly, upload.array('media', 10), createProject);

router.delete('/:id', protect, ownerOnly, deleteProject);
router.put('/:id', protect, ownerOnly, updateProjectDetails);

// Detailed Admin Routes
router.put('/:id/update', protect, ownerOnly, updateProjectDetails);
router.delete('/:id/media/:mediaId', protect, ownerOnly, deleteProjectMedia);
router.post('/:id/upload', protect, ownerOnly, upload.array('media', 10), uploadProjectMedia);
router.put('/:id/cover', protect, ownerOnly, upload.array('media', 1), updateProjectCover);
router.put('/:id/reorder', protect, ownerOnly, reorderProjectMedia);

export default router;
