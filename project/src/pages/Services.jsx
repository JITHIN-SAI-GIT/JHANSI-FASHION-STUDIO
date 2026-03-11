import { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import ServiceCard from '../components/ServiceCard';
import { serviceService } from '../services/api';
import { Loader2, Camera, Music, Image as ImageIcon, Sparkles } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await serviceService.getAll();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden mb-20">
        <img 
          src="/images/service background.jpeg" 
          alt="Services Background" 
          className="absolute inset-0 w-full h-full object-cover object-[center_80%]"
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Sparkles size={14} />
            Our Expertise
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            Capturing <span className="text-amber-500 italic">Moments</span>, <br />
            Creating <span className="text-amber-500 italic">Memories</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Professional photography and cinematography services tailored to tell your unique story with cinematic excellence.
          </p>
        </div>
      </div>

      <Section>

        {/* Services Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 className="animate-spin text-amber-500" size={48} />
            <p className="text-neutral-500 animate-pulse font-medium">Discovering our services...</p>
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-3xl">
            <Camera className="mx-auto text-neutral-700 mb-6" size={64} />
            <h3 className="text-2xl text-white font-serif mb-2">Services Coming Soon</h3>
            <p className="text-neutral-500">We are currently updating our service offerings. Please check back later.</p>
          </div>
        )}

        {/* Process Section */}
        <div className="mt-32 pt-32 border-t border-neutral-800">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Why Choose Us?</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { 
                icon: Camera, 
                title: 'High-End Equipment', 
                desc: 'We use the latest mirrorless cameras and cinematic lenses for the sharpest quality.' 
              },
              { 
                icon: Music, 
                title: 'Creative Storytelling', 
                desc: 'Every video is edited with a unique musical rhythm and emotional narrative.' 
              },
              { 
                icon: ImageIcon, 
                title: 'Premium Retouching', 
                desc: 'Professional color grading and skin retouching for every single capture.' 
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-black hover:bg-neutral-900 transition-colors duration-500 border border-neutral-800/50">
                <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-500 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <feature.icon size={32} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Services;
