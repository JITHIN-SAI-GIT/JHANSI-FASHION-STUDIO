import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { X, Edit, ChevronLeft, ChevronRight, Play, ArrowLeft, Folder, Star, Loader2, Image as ImageIcon, PlayCircle, Award } from 'lucide-react';
import Masonry from 'react-masonry-css';
import Section from '../components/ui/Section';
import { projectService, ratingService, categoryService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
};

const ProjectCard = ({ project, index, openLightbox, handleRate, isOwner, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoMedia = project.mediaUrls.find(m => m.type === 'video');
  const imageMedia = project.mediaUrls.find(m => m.type === 'image');

  // Use the first image as thumbnail, or generate a thumbnail from video if no image exists
  const getThumbnailUrl = () => {
    if (imageMedia) return imageMedia.url;
    if (videoMedia) {
      // Cloudinary video thumbnail trick: replace extension with .jpg
      return videoMedia.url.replace(/\.[^/.]+$/, ".jpg");
    }
    return 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=compress&cs=tinysrgb&w=800'; // Default camera placeholder
  };

  return (
    <div
      className="mb-4 group relative overflow-hidden rounded-xl bg-black cursor-pointer aspect-[4/5]"
      onClick={() => openLightbox(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {videoMedia && isHovered ? (
          <video
            src={videoMedia.url}
            className="w-full h-full object-cover absolute inset-0"
            autoPlay
            muted
            loop
          />
        ) : (
          <img
            src={getThumbnailUrl()}
            alt={project.title}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>

      {/* Admin Controls */}
      {isOwner && (
        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            to={`/admin?tab=projects&edit=${project._id}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 bg-amber-500 hover:bg-amber-600 text-black rounded-full shadow-lg transform hover:scale-110 transition-transform"
            title="Edit Project"
          >
            <Edit size={18} />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project._id);
            }}
            className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full shadow-lg transform hover:scale-110 transition-transform"
            title="Delete Project"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Overlay with Rating & Title */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-bold">{project.averageRating?.toFixed(1) || '0.0'}</span>
            </div>
            <div className="text-neutral-400 text-xs">{project.totalRatings} ratings</div>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
          <p className="text-gray-400 text-xs line-clamp-1">{project.description}</p>

          {/* Interaction Buttons */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRate(project._id, star);
                  }}
                  fill={star <= Math.round(project.averageRating || 0) ? "currentColor" : "none"}
                  className={`cursor-pointer transition-colors ${star <= Math.round(project.averageRating || 0)
                    ? "text-amber-500"
                    : "text-neutral-600 hover:text-amber-500"
                    }`}
                />
              ))}
            </div>
            {videoMedia && (
              <div className="bg-amber-500 p-1.5 rounded-full">
                <Play size={14} className="text-black fill-black" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const { category: categoryParam } = useParams();
  const { user, isOwner } = useAuth();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mediaFilter, setMediaFilter] = useState('all'); // 'all', 'photos', 'videos'

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      fetchProjects();
      setMediaFilter('all'); // Reset filter on category change
    }
  }, [categoryParam]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await categoryService.getAll();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await projectService.getAll(categoryParam);
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    if (mediaFilter === 'all') return true;
    if (mediaFilter === 'photos') return project.mediaUrls.some(m => m.type === 'image');
    if (mediaFilter === 'videos') return project.mediaUrls.some(m => m.type === 'video');
    return true;
  });

  const handleRate = async (projectId, rating) => {
    if (!user) return toast.error('Please login to rate projects');

    // Prompt for comment
    const comment = window.prompt('Share your experience (optional):');
    if (comment === null) return; // User cancelled

    try {
      await ratingService.add({ projectId, rating, comment });
      toast.success('Rating & review submitted!');
      fetchProjects();
    } catch (error) {
      toast.error('Rating failed');
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.delete(projectId);
        toast.success('Project deleted');
        fetchProjects();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextMedia = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredProjects.length);
    }
  };

  const prevMedia = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  if (!categoryParam) {
    return (
      <div className="bg-black text-white min-h-screen pt-20">
        <Section>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif mb-4">
              Our <span className="text-amber-500">Collections</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our photography albums organized by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center p-20 gap-4">
                <Loader2 className="animate-spin text-amber-500" size={48} />
                <p className="text-neutral-500 animate-pulse">Loading collections...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="col-span-full p-20 text-center border-2 border-dashed border-neutral-800 rounded-3xl">
                <div className="text-neutral-500 mb-4 flex justify-center"><Folder size={48} /></div>
                <h3 className="text-xl text-white mb-2">No collections yet</h3>
                <p className="text-neutral-400">Owner hasn't added any categories to the portfolio.</p>
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat._id} className="relative group">
                  <Link
                    to={`/portfolio/${cat.name}`}
                    className="relative block aspect-[4/5] bg-black overflow-hidden rounded-2xl border border-neutral-800 hover:border-amber-500 transition-all duration-500"
                  >
                    <img
                      src={cat.coverImage}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8">
                      <div className="flex items-center gap-2 text-amber-500 mb-3">
                        <Folder className="w-5 h-5 fill-amber-500" />
                        <span className="uppercase tracking-widest text-xs font-bold">Category</span>
                      </div>
                      <h3 className="text-3xl font-serif mb-2">{cat.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">{cat.description}</p>
                      <div className="inline-flex items-center text-amber-500 text-sm font-semibold gap-2 border-b border-amber-500/0 hover:border-amber-500 transition-all">
                        Explore Gallery <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>

                  {isOwner && (
                    <label className="absolute top-4 right-4 z-20 cursor-pointer pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append('image', file);
                            const toastId = toast.loading('Updating cover...');
                            try {
                              await categoryService.updateCover(cat.name, formData);
                              toast.success('Cover updated!', { id: toastId });
                              fetchCategories();
                            } catch (err) {
                              toast.error('Failed to update cover', { id: toastId });
                            }
                          }
                        }}
                      />
                      <div className="p-2 bg-amber-500 hover:bg-amber-600 text-black rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2 px-3">
                        <Award size={16} />
                        <span className="text-xs font-bold uppercase">Edit Cover</span>
                      </div>
                    </label>
                  )}
                </div>
              ))
            )}
          </div>
        </Section>
      </div>
    );
  }

  const currentCategory = categories.find(c => c.name === categoryParam);

  const currentProject = filteredProjects[lightboxIndex];

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <Section>
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <Link
            to="/portfolio"
            className="group flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors uppercase tracking-widest text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Portfolio
          </Link>
          <div className="text-center md:text-right">
            <h1 className="text-4xl font-serif mb-2">
              {categoryParam} <span className="text-amber-500">Gallery</span>
            </h1>
            <p className="text-gray-400 italic">
              {currentCategory?.description || 'Explore our latest work.'}
            </p>
          </div>
        </div>

        {/* Media Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-black/50 p-1.5 rounded-2xl border border-neutral-800 backdrop-blur-sm">
            {[
              { id: 'all', label: 'All Media', icon: Folder },
              { id: 'photos', label: 'Photos', icon: ImageIcon },
              { id: 'videos', label: 'Videos', icon: PlayCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMediaFilter(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${mediaFilter === tab.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 className="animate-spin text-amber-500" size={48} />
            <p className="text-neutral-500 animate-pulse">Loading gallery...</p>
          </div>
        ) : (
          <>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  openLightbox={openLightbox}
                  handleRate={handleRate}
                  isOwner={isOwner}
                  onDelete={handleDelete}
                />
              ))}
            </Masonry>

            {filteredProjects.length === 0 && (
              <div className="p-20 text-center border-2 border-dashed border-neutral-800 rounded-3xl">
                <div className="text-neutral-500 mb-4 flex justify-center"><Folder size={48} /></div>
                <h3 className="text-xl text-white mb-2">No {mediaFilter !== 'all' ? mediaFilter : 'projects'} found</h3>
                <p className="text-neutral-400">Owner hasn't uploaded any {mediaFilter !== 'all' ? mediaFilter : 'projects'} in this category yet.</p>
              </div>
            )}
          </>
        )}
      </Section>

      {lightboxIndex !== null && currentProject && (
        <div className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-md">
          <button onClick={closeLightbox} className="absolute top-8 right-8 text-white hover:text-amber-500 transition-colors z-[110]">
            <X size={32} />
          </button>

          <button onClick={prevMedia} className="absolute left-4 md:left-10 text-white hover:text-amber-500 transition-colors z-[110] p-3 bg-white/5 hover:bg-white/10 rounded-full">
            <ChevronLeft size={40} />
          </button>

          <button onClick={nextMedia} className="absolute right-4 md:right-10 text-white hover:text-amber-500 transition-colors z-[110] p-3 bg-white/5 hover:bg-white/10 rounded-full">
            <ChevronRight size={40} />
          </button>

          <div className="max-w-7xl max-h-[90vh] w-full flex flex-col items-center justify-center gap-6">
            <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center bg-black/40 rounded-3xl overflow-hidden shadow-2xl">
              {currentProject.mediaUrls[0]?.type === 'video' ? (
                <video
                  src={currentProject.mediaUrls[0].url}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={currentProject.mediaUrls[0]?.url}
                  alt={currentProject.title}
                  className="w-full h-full object-contain animate-in fade-in zoom-in duration-300"
                />
              )}
            </div>
            <div className="text-center max-w-2xl px-4">
              <h3 className="text-2xl font-serif mb-2 tracking-wide text-amber-500">
                {currentProject.title}
              </h3>
              <p className="text-gray-400 italic text-sm md:text-base leading-relaxed">{currentProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
