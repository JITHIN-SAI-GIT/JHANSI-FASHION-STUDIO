import Service from '../models/Service.js';
import { v2 as cloudinary } from 'cloudinary';

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Create a new service
export const createService = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Cover image is required' });
    }

    const service = new Service({
      title,
      description,
      category,
      coverImage: req.file.path,
      publicId: req.file.filename
    });

    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.title = title || service.title;
    service.description = description || service.description;
    service.category = category || service.category;

    if (req.file) {
      // Delete old image from cloudinary if it exists
      if (service.publicId) {
        await cloudinary.uploader.destroy(service.publicId);
      }
      service.coverImage = req.file.path;
      service.publicId = req.file.filename;
    }

    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.publicId) {
      await cloudinary.uploader.destroy(service.publicId);
    }

    await service.deleteOne();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};
