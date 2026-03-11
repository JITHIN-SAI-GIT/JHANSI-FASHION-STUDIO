import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Heart, Award, Star, Instagram } from 'lucide-react';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import { portfolioItems } from '../data/portfolio';
import { services } from '../data/services';
import { ratingService, settingsService, projectService } from '../services/api';

export default function Home() {
  const featuredPortfolio = portfolioItems.slice(0, 6);
  const featuredServices = services.slice(0, 3);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [settings, setSettings] = useState(null);
  const [projects, setProjects] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, settingsRes, projectsRes] = await Promise.all([
          ratingService.getAllReviews(),
          settingsService.get(),
          projectService.getAll()
        ]);
        setFeaturedReviews(reviewsRes.data.slice(0, 3));
        setSettings(settingsRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        console.error('Failed to fetch home data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getProjectThumbnail = (project) => {
    if (project.coverMedia?.url) return project.coverMedia.url;
    const imageMedia = project.mediaUrls.find(m => m.type === 'image');
    if (imageMedia) return imageMedia.url;
    const videoMedia = project.mediaUrls.find(m => m.type === 'video');
    return videoMedia ? videoMedia.url.replace(/\.[^/.]+$/, ".jpg") : '';
  };

  const featuredProjects = projects.slice(0, 6);
  const instagramProjects = projects.slice(0, 8);

  return (
    <div className="bg-black text-white">
      {/* ... (Hero section same as before) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {settings?.heroVideo?.url ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={settings.heroVideo.url} />
          </video>
        ) : settings?.heroImage?.url ? (
          <img
            src={settings.heroImage.url}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/dhjfc1zsi/video/upload/v1773079024/Welcome_to_Jhansi_fashion_Studio_yw15fk.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Capturing Timeless
            <span className="block text-amber-500">Moments</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Where art meets emotion. Creating stunning visual stories that last forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/portfolio">
              <Button variant="primary">View Portfolio</Button>
            </Link>
            <Link to="/booking">
              <Button variant="outline">Book Session</Button>
            </Link>
          </div>
        </div>

      </section>

      {/* ... (About Section same) */}
      <Section>
        {/* ... */}
      </Section>

      <Section dark={false}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">
            Featured <span className="text-amber-500">Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our carefully curated collection of recent projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {(featuredProjects.length > 0 ? featuredProjects : portfolioItems.slice(0, 6)).map((item) => (
            <Link
              key={item._id || item.id}
              to={`/portfolio/${encodeURIComponent(item.category || '')}`}
              className="group relative overflow-hidden aspect-[4/5] bg-black"
            >
              <img
                src={item._id ? getProjectThumbnail(item) : item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-amber-500 text-sm uppercase tracking-wider mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/portfolio">
            <Button variant="primary">
              View Full Portfolio <ArrowRight className="inline w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* ... (Services and Testimonials same) */}

      <Section>
        <div className="text-center mb-12">
          <Instagram className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-4xl font-serif mb-4">
            Follow Us on <span className="text-amber-500">Instagram</span>
          </h2>
          <p className="text-gray-400 text-lg">@jhansiphotography1125
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(instagramProjects.length > 0 ? instagramProjects : portfolioItems.slice(0, 8)).map((item) => (
            <a
              key={item._id || item.id}
              href="https://www.instagram.com/jhansiphotography1125?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden aspect-square bg-black"
            >
              <img
                src={item._id ? getProjectThumbnail(item) : item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section dark={false}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Ready to Create <span className="text-amber-500">Magic</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Let's capture your special moments together. Book your session today and experience luxury photography.
          </p>
          <Link to="/booking">
            <Button variant="primary" className="text-lg px-8 py-4">
              Book Your Session Now
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
