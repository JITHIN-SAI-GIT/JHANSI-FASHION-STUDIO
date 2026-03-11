import React, { useState, useEffect } from 'react';
import { serviceService } from '../services/api';
import { Plus, Trash2, Edit2, Loader2, Image as ImageIcon, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        image: null
    });
    const [saving, setSaving] = useState(false);

    const categories = [
        'Post Wedding Songs', 'Pre Wedding Songs', 
        'Function Banners', 'Save the Date Posters', 'Candidate / Couple Photos'
    ];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const { data } = await serviceService.getAll();
            setServices(data);
        } catch (error) {
            toast.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                title: service.title,
                description: service.description,
                category: service.category,
                image: null // We don't load the existing image into the file input
            });
        } else {
            setEditingService(null);
            setFormData({
                title: '',
                description: '',
                category: '',
                image: null
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
        setFormData({
            title: '',
            description: '',
            category: '',
            image: null
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!editingService && !formData.image) {
            return toast.error('Please select a cover image');
        }

        setSaving(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (editingService) {
                await serviceService.update(editingService._id, data);
                toast.success('Service updated successfully');
            } else {
                await serviceService.create(data);
                toast.success('Service created successfully');
            }
            handleCloseModal();
            fetchServices();
        } catch (error) {
            toast.error(editingService ? 'Failed to update service' : 'Failed to create service');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await serviceService.delete(id);
                toast.success('Service deleted');
                fetchServices();
            } catch (error) {
                toast.error('Failed to delete service');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Service Management</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} />
                    ADD NEW SERVICE
                </button>
            </div>

            <div className="bg-black/50 border border-neutral-800 rounded-3xl overflow-hidden">
                {loading ? (
                    <div className="p-24 flex justify-center">
                        <Loader2 className="animate-spin text-amber-500" size={48} />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-medium">
                            <thead className="bg-black/20 text-neutral-500 text-xs uppercase tracking-[0.2em] font-black">
                                <tr>
                                    <th className="px-8 py-6">Service</th>
                                    <th className="px-8 py-6">Category</th>
                                    <th className="px-8 py-6 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/50 text-white">
                                {services.map((service) => (
                                    <tr key={service._id} className="group hover:bg-white/5 transition-all">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-12 rounded-lg bg-black border border-neutral-700 overflow-hidden">
                                                    <img src={service.coverImage} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold group-hover:text-amber-500 transition-colors">{service.title}</div>
                                                    <div className="text-sm text-neutral-500 line-clamp-1 max-w-xs">{service.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                                                {service.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => handleOpenModal(service)}
                                                    className="p-3 bg-black hover:bg-amber-500 hover:text-black text-neutral-400 rounded-xl transition-all shadow-lg"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(service._id)}
                                                    className="p-3 bg-black hover:bg-red-500 hover:text-white text-neutral-400 rounded-xl transition-all shadow-lg"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {services.length === 0 && (
                            <div className="p-20 text-center text-neutral-500">
                                <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                                <p>No services registered in the database.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                    <div className="bg-black border border-neutral-800 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl custom-scrollbar">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                                    {editingService ? 'Edit Service' : 'Create New Service'}
                                </h3>
                                <button onClick={handleCloseModal} className="text-neutral-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest mb-2 px-1">Service Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-black border border-neutral-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        placeholder="Enter service title..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest mb-2 px-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows="4"
                                        className="w-full bg-black border border-neutral-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                        placeholder="Describe the service in detail..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest mb-2 px-1">Target Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black border border-neutral-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest mb-2 px-1">Cover Image</label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                id="service-image"
                                            />
                                            <label
                                                htmlFor="service-image"
                                                className="flex items-center justify-center gap-2 w-full bg-black border border-neutral-700 rounded-2xl px-5 py-4 text-neutral-400 hover:text-white hover:border-amber-500 transition-all cursor-pointer overflow-hidden"
                                            >
                                                <ImageIcon size={18} />
                                                <span className="truncate">{formData.image ? formData.image.name : 'Select Image'}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-8 py-5 rounded-2xl font-black transition-all shadow-xl shadow-amber-500/20 disabled:opacity-50 disabled:grayscale"
                                >
                                    {saving ? (
                                        <Loader2 className="animate-spin" size={24} />
                                    ) : (
                                        <>
                                            <Save size={24} />
                                            {editingService ? 'UPDATE SERVICE' : 'LAUNCH SERVICE'}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceManager;
