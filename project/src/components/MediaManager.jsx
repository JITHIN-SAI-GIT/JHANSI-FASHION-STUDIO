import React, { useState } from 'react';
import { projectService } from '../services/api';
import { Trash2, Image as ImageIcon, Film, Plus, Loader2, GripVertical, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MediaManager = ({ project, onUpdate }) => {
    const [uploading, setUploading] = useState(false);
    const [removing, setRemoving] = useState(null);
    const [updatingCover, setUpdatingCover] = useState(false);

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            const formData = new FormData();
            files.forEach(file => formData.append('media', file));
            await projectService.uploadMedia(project._id, formData);
            toast.success('Media uploaded successfully');
            onUpdate();
        } catch (error) {
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveMedia = async (mediaId) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;

        setRemoving(mediaId);
        try {
            await projectService.deleteMedia(project._id, mediaId);
            toast.success('Media removed');
            onUpdate();
        } catch (error) {
            toast.error('Failed to remove media');
        } finally {
            setRemoving(null);
        }
    };

    const handleCoverUpdate = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUpdatingCover(true);
        try {
            const formData = new FormData();
            formData.append('media', file);
            await projectService.updateCover(project._id, formData);
            toast.success('Cover updated');
            onUpdate();
        } catch (error) {
            toast.error('Failed to update cover');
        } finally {
            setUpdatingCover(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white">Media Manager</h3>
                    <p className="text-sm text-neutral-400">Project: {project.title}</p>
                </div>
                <div className="flex gap-4">
                    <label className="cursor-pointer bg-black hover:bg-black text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm border border-neutral-700">
                        <ImageIcon size={16} />
                        Update Cover
                        <input type="file" className="hidden" onChange={handleCoverUpdate} />
                    </label>
                    <label className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold">
                        <Plus size={16} />
                        Add Media
                        <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                    </label>
                </div>
            </div>

            {/* Cover Preview */}
            <div className="bg-black/50 p-6 rounded-2xl border border-neutral-800">
                <h4 className="text-sm font-semibold text-neutral-400 mb-4 uppercase tracking-wider">Project Cover</h4>
                <div className="relative aspect-video max-w-md rounded-xl overflow-hidden border border-neutral-700">
                    {updatingCover ? (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                            <Loader2 className="animate-spin text-amber-500" />
                        </div>
                    ) : null}
                    {project.coverMedia?.url ? (
                        project.coverMedia.type === 'video' ? (
                            <video src={project.coverMedia.url} className="w-full h-full object-cover" muted loop />
                        ) : (
                            <img src={project.coverMedia.url} alt="" className="w-full h-full object-cover" />
                        )
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-black italic text-sm">
                            No custom cover set (using first image)
                        </div>
                    )}
                </div>
            </div>

            {/* Gallery Manager */}
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Project Gallery</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {uploading && (
                        <div className="aspect-square rounded-xl bg-black flex items-center justify-center border-2 border-dashed border-amber-500/50">
                            <Loader2 className="animate-spin text-amber-500" />
                        </div>
                    )}
                    {project.mediaUrls.map((media) => (
                        <div key={media._id} className="group relative aspect-square rounded-xl overflow-hidden bg-black border border-neutral-700">
                            {media.type === 'video' ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Film className="text-amber-500" />
                                </div>
                            ) : (
                                <img src={media.url} alt="" className="w-full h-full object-cover" />
                            )}

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handleRemoveMedia(media._id)}
                                    disabled={removing === media._id}
                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                >
                                    {removing === media._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                </button>
                                <div className="p-2 bg-white/10 text-white rounded-lg cursor-grab active:cursor-grabbing">
                                    <GripVertical size={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MediaManager;
