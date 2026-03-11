import React, { useState, useEffect } from 'react';
import { projectService, settingsService } from '../services/api';
import {
    Plus, Trash2, Edit2, Loader2, LayoutDashboard, FolderOpen,
    Image as ImageIcon, PlayCircle, Settings, Globe, Film, Briefcase
} from 'lucide-react';
import ProjectUpload from '../components/ProjectUpload';
import MediaManager from '../components/MediaManager';
import WebsiteSettings from '../components/WebsiteSettings';
import ServiceManager from '../components/ServiceManager';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'website', 'media'
    const [showUpload, setShowUpload] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [mediaFilter, setMediaFilter] = useState('all');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data } = await projectService.getAll();
            setProjects(data);

            // Handle direct edit link
            const params = new URLSearchParams(window.location.search);
            const editId = params.get('edit');
            if (editId) {
                const projectToEdit = data.find(p => p._id === editId);
                if (projectToEdit) {
                    setEditingProject(projectToEdit);
                    // Clear the query param to avoid re-triggering on refresh if closed
                    window.history.replaceState({}, '', '/admin?tab=projects');
                }
            }
        } catch (error) {
            toast.error('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('PROCEED WITH CAUTION: This will permanently delete the project and all its media. Continue?')) {
            try {
                await projectService.delete(id);
                setProjects(projects.filter(p => p._id !== id));
                toast.success('Project incinerated');
            } catch (error) {
                toast.error('Deletion failed');
            }
        }
    };

    const getThumbnail = (project) => {
        if (project.coverMedia?.url) {
            if (project.coverMedia.type === 'video') {
                return project.coverMedia.url.replace(/\.[^/.]+$/, ".jpg");
            }
            return project.coverMedia.url;
        }
        const imageMedia = project.mediaUrls.find(m => m.type === 'image');
        if (imageMedia) return imageMedia.url;

        const videoMedia = project.mediaUrls.find(m => m.type === 'video');
        if (videoMedia) {
            return videoMedia.url.replace(/\.[^/.]+$/, ".jpg");
        }
        return null;
    };

    const filteredProjects = projects.filter(project => {
        if (mediaFilter === 'all') return true;
        const hasPhotos = project.mediaUrls.some(m => m.type === 'image');
        const hasVideos = project.mediaUrls.some(m => m.type === 'video');
        if (mediaFilter === 'photos') return hasPhotos;
        if (mediaFilter === 'videos') return hasVideos;
        return true;
    });

    const tabs = [
        { id: 'projects', label: 'Project Library', icon: FolderOpen },
        { id: 'services', label: 'Our Services', icon: Briefcase },
        { id: 'website', label: 'Website Settings', icon: Globe },
    ];

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-4">
                            DASHBOARD
                            <span className="text-amber-500">.</span>
                        </h1>
                        <p className="text-neutral-500 mt-2 font-medium">Full control over Jhansi Fashion Studio content.</p>
                    </div>
                    {activeTab === 'projects' && (
                        <button
                            onClick={() => setShowUpload(true)}
                            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                        >
                            <Plus size={24} />
                            CREATE NEW PROJECT
                        </button>
                    )}
                </div>

                {/* Tabs Navigation */}
                <div className="flex border-b border-neutral-800 mb-8 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSelectedProject(null);
                            }}
                            className={`flex items-center gap-3 px-8 py-4 font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'text-amber-500 border-amber-500 bg-amber-500/5'
                                : 'text-neutral-500 border-transparent hover:text-white'
                                }`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                    {selectedProject && (
                        <button
                            className="flex items-center gap-3 px-8 py-4 font-bold border-b-2 text-white border-white bg-white/5 whitespace-nowrap"
                        >
                            <Film size={20} />
                            Media: {selectedProject.title}
                        </button>
                    )}
                </div>

                {/* Content Sections */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {activeTab === 'projects' && !selectedProject && (
                        <div className="space-y-6">
                            {/* Filter Bar */}
                            <div className="flex bg-black/50 p-2 rounded-2xl border border-neutral-800 w-fit">
                                {[
                                    { id: 'all', label: 'All Projects', icon: LayoutDashboard },
                                    { id: 'photos', label: 'Photography', icon: ImageIcon },
                                    { id: 'videos', label: 'Videography', icon: PlayCircle }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setMediaFilter(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mediaFilter === tab.id
                                            ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                                            : 'text-neutral-500 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Projects Table */}
                            <div className="bg-black/50 border border-neutral-800 rounded-3xl overflow-hidden backdrop-blur-md">
                                {loading ? (
                                    <div className="p-24 flex justify-center">
                                        <Loader2 className="animate-spin text-amber-500" size={48} />
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-black/20 text-neutral-500 text-xs uppercase tracking-[0.2em] font-black">
                                                <tr>
                                                    <th className="px-8 py-6">Project Metadata</th>
                                                    <th className="px-8 py-6">Category</th>
                                                    <th className="px-8 py-6">Payload</th>
                                                    <th className="px-8 py-6 text-right">Operations</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-neutral-800/50 text-white font-medium">
                                                {filteredProjects.map((project) => (
                                                    <tr key={project._id} className="group hover:bg-white/5 transition-all">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-6">
                                                                <div className="w-16 h-16 rounded-2xl bg-black border-2 border-neutral-700 overflow-hidden shadow-2xl group-hover:border-amber-500/50 transition-all">
                                                                    {getThumbnail(project) ? (
                                                                        <img src={getThumbnail(project)} alt="" className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center">
                                                                            <ImageIcon className="text-neutral-600" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="text-lg font-bold group-hover:text-amber-500 transition-colors uppercase">{project.title}</div>
                                                                    <div className="text-sm text-neutral-500 line-clamp-1 mt-0.5">{project.description}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                                                                {project.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-4 text-neutral-400 text-xs font-bold">
                                                                <span className="flex items-center gap-1.5"><ImageIcon size={14} /> {project.mediaUrls.filter(m => m.type === 'image').length}</span>
                                                                <span className="flex items-center gap-1.5"><Film size={14} /> {project.mediaUrls.filter(m => m.type === 'video').length}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center justify-end gap-3">
                                                                <button
                                                                    onClick={() => setSelectedProject(project)}
                                                                    className="p-3 bg-black hover:bg-amber-500 hover:text-black text-neutral-400 rounded-xl transition-all shadow-lg"
                                                                    title="Manage Media"
                                                                >
                                                                    <ImageIcon size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => setEditingProject(project)}
                                                                    className="p-3 bg-black hover:bg-amber-500 hover:text-black text-neutral-400 rounded-xl transition-all shadow-lg"
                                                                    title="Edit Details"
                                                                >
                                                                    <Edit2 size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(project._id)}
                                                                    className="p-3 bg-black hover:bg-red-500 hover:text-white text-neutral-400 rounded-xl transition-all shadow-lg"
                                                                    title="Delete Project"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {projects.length === 0 && (
                                            <div className="p-24 text-center">
                                                <FolderOpen size={48} className="mx-auto text-neutral-800 mb-4" />
                                                <p className="text-neutral-500 font-bold uppercase tracking-widest">No projects digitized yet.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'website' && <WebsiteSettings />}

                    {activeTab === 'services' && <ServiceManager />}

                    {selectedProject && (
                        <MediaManager
                            project={selectedProject}
                            onUpdate={() => {
                                fetchProjects();
                                // Refresh selected project too
                                const updated = projects.find(p => p._id === selectedProject._id);
                                if (updated) setSelectedProject(updated);
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Modal - Details Edit */}
            {editingProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                    <div className="bg-black border border-neutral-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl custom-scrollbar">
                        <ProjectUpload
                            initialData={editingProject}
                            onClose={() => setEditingProject(null)}
                            onSuccess={() => {
                                setEditingProject(null);
                                fetchProjects();
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Modal - Creation */}
            {showUpload && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                    <div className="bg-black border border-neutral-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl custom-scrollbar">
                        <ProjectUpload
                            onClose={() => setShowUpload(false)}
                            onSuccess={() => {
                                setShowUpload(false);
                                fetchProjects();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
