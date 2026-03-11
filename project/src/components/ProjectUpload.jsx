import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileText, Folder, CheckCircle, Loader2, PlayCircle } from 'lucide-react';
import { projectService } from '../services/api';
import toast from 'react-hot-toast';

const categories = ['Post Wedding Songs', 'Pre Wedding Songs', 'Function Banners', 'Save the Date Posters', 'Candidate / Couple Photos', 'Birthday'];

const ProjectUpload = ({ onClose, onSuccess, initialData }) => {
    const isEdit = !!initialData;
    const [title, setTitle] = useState(initialData?.title || '');
    const [category, setCategory] = useState(initialData?.category || categories[0]);
    const [description, setDescription] = useState(initialData?.description || '');
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        const MAX_VIDEO_SIZE = 98 * 1024 * 1024; // 98MB
        const MAX_IMAGE_SIZE = 9 * 1024 * 1024; // 9MB

        const validFiles = [];
        acceptedFiles.forEach(file => {
            const isVideo = file.type.startsWith('video');
            const isImage = file.type.startsWith('image');
            const sizeLimit = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
            const limitStr = isVideo ? '98MB' : '9MB';

            if (file.size > sizeLimit) {
                toast.error(`${file.name} exceeds ${limitStr} limit`);
            } else {
                validFiles.push(Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }));
            }
        });

        if (validFiles.length > 0) {
            setFiles(prev => [...prev, ...validFiles]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
            'video/*': ['.mp4', '.webm']
        }
    });

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Only require files in create mode
        if (!isEdit && files.length === 0) return toast.error('Please select at least one file');

        setUploading(true);
        try {
            if (isEdit && files.length === 0) {
                // Metadata only update
                await projectService.updateDetails(initialData._id, { title, category, description });
                toast.success('Project details updated!');
            } else {
                // Update with new files OR Create
                const formData = new FormData();
                formData.append('title', title);
                formData.append('category', category);
                formData.append('description', description);
                files.forEach(file => {
                    formData.append('media', file);
                });

                if (isEdit) {
                    await projectService.update(initialData._id, formData);
                    toast.success('Project updated successfully!');
                } else {
                    await projectService.create(formData);
                    toast.success('Project uploaded successfully!');
                }
            }
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.error || (isEdit ? 'Update failed' : 'Upload failed'));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Upload className="text-gold" />
                    {isEdit ? 'Edit Project' : 'Upload New Project'}
                </h2>
                <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                            <FileText size={16} />
                            Project Title
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full bg-black border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors"
                            placeholder="e.g. Elegant Summer Wedding"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                            <Folder size={16} />
                            Category
                        </label>
                        <select
                            className="w-full bg-black border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Description</label>
                    <textarea
                        required
                        rows={4}
                        className="w-full bg-black border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                        placeholder="Tell us about the project..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">
                        {isEdit ? 'Add New Media (Optional)' : 'Media Files (Photos & Videos)'}
                    </label>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
              ${isDragActive ? 'border-gold bg-gold/5' : 'border-neutral-700 hover:border-neutral-500'}`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center gap-2">
                            <Upload className="text-neutral-500" size={32} />
                            <p className="text-neutral-300">Drag & drop files here, or click to select</p>
                            <p className="text-sm text-neutral-500">Supports images (JPG, PNG, WebP) and videos (MP4, WebM)</p>
                        </div>
                    </div>
                </div>

                {/* Existing Media Preview in Edit Mode */}
                {isEdit && initialData.mediaUrls && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Existing Media (Click to Remove)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {initialData.mediaUrls.map((media, index) => (
                                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-black border border-neutral-700">
                                    {media.type === 'video' ? (
                                        <div className="w-full h-full flex items-center justify-center bg-black">
                                            <PlayCircle className="text-gold" size={24} />
                                        </div>
                                    ) : (
                                        <img src={media.url} alt="" className="w-full h-full object-cover" />
                                    )}
                                    <button
                                        type="button"
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            if (window.confirm('Delete this media permanently?')) {
                                                try {
                                                    await projectService.update(initialData._id, { removeMediaPublicId: media.publicId });
                                                    toast.success('Media removed');
                                                    onSuccess();
                                                } catch (err) {
                                                    toast.error('Failed to remove media');
                                                }
                                            }
                                        }}
                                        className="absolute top-1 right-1 p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                        title="Delete Media"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* File Preview Grid (New files) */}
                {files.length > 0 && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">New Files to Add</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {files.map((file, index) => (
                                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-black">
                                    {file.type.startsWith('video') ? (
                                        <video src={file.preview} className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={file.preview} alt="" className="w-full h-full object-cover" />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-neutral-700 text-neutral-400 rounded-lg hover:bg-black transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="flex-[2] bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                {isEdit ? 'Updating...' : 'Uploading to Cloudinary...'}
                            </>
                        ) : (
                            <>
                                <CheckCircle size={20} />
                                {isEdit ? 'Update Project' : 'Save Project'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectUpload;
