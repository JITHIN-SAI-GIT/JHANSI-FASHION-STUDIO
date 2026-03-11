import React, { useState, useEffect } from 'react';
import { Award, Camera, Users, Heart, Instagram, Facebook, Sparkles } from 'lucide-react';
import Section from '../components/ui/Section';
import { settingsService } from '../services/api';

// Team section simplified to single profile

const equipment = [
  'Canon EOS R5 Full Frame Mirrorless',
  'Sony Alpha A7R IV',
  'Nikon Z9 Professional Camera',
  'Professional Lighting Equipment',
  'DJI Drone for Aerial Photography',
  'Premium Lenses Collection',
];

const achievements = [
  { year: '2023', title: 'Best Wedding Photographer - National Awards' },
  { year: '2022', title: 'Top 10 Photography Studios - State Recognition' },
  { year: '2021', title: 'Excellence in Portrait Photography' },
  { year: '2020', title: 'Innovation in Photography Award' },
];

export default function About() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await settingsService.get();
        setSettings(data);
      } catch (error) {
        console.error('Failed to fetch settings');
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen pt-20">

      {/* Welcome Message Section */}
      <div className="py-24 bg-black text-center px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            Welcome to Our Studio
          </div>
          <div className="text-amber-500 text-xl font-serif mb-8 tracking-wider">
            Jhansi Fashion Studio
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
            Crafting <span className="text-amber-500 italic">Timeless</span> Narratives
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            At Jhansi Fashion Studio, we believe every moment has a soul, and every soul has a story. 
            We are dedicated to capturing your most precious milestones with unparalleled elegance, 
            turning fleeting seconds into lifelong masterpieces.
          </p>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-amber-500/50 to-transparent" />
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-6 text-amber-500">Our Story</h2>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed whitespace-pre-line">
              {settings?.aboutText ? (
                <p>{settings.aboutText}</p>
              ) : (
                <>
                  <p>
                    Founded in 2010, Jhansi Fashion Studio began with a simple vision: to capture life's most precious moments with artistic excellence and timeless elegance.
                  </p>
                  <p>
                    What started as a one-person operation has grown into a team of passionate photographers dedicated to creating stunning visual narratives that you'll cherish forever.
                  </p>
                  <p>
                    Our approach combines technical expertise with artistic vision, ensuring every photograph tells a unique and compelling story. We believe that great photography is not just about capturing images, but about preserving emotions and memories.
                  </p>
                  <p>
                    Today, we're proud to have served over 500 clients, captured countless beautiful moments, and built a reputation for excellence in luxury photography.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-black overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-black overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Behind the scenes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-black overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1983036/pexels-photo-1983036.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Equipment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-black overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1983038/pexels-photo-1983038.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Team at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section dark={false}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">
              Meet Our <span className="text-amber-500">Photographer</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Dedicated to capturing your perfect moments with creative vision and professional excellence.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 bg-black p-8 rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden group">
            <div className="w-full md:w-1/2 aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src="/images/Jhansi Photography.jpg.jpeg"
                alt="Jhansi Photography"
                className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Jhansi Photography</h3>
                <p className="text-amber-500 font-medium tracking-wider uppercase text-sm">Lead Photographer & Visionary</p>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                With a passion for storytelling and an eye for the extraordinary, Jhansi Photography brings a unique blend of cinematic elegance and emotional depth to every session. 
              </p>
              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/jhansiphotography1125?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500/10 p-3 rounded-full text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="bg-amber-500/10 p-3 rounded-full text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
          <div className="bg-black border border-amber-500/20 p-8">
            <Camera className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Events Covered</div>
          </div>
          <div className="bg-black border border-amber-500/20 p-8">
            <Heart className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <div className="text-4xl font-bold mb-2">300+</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Happy Couples</div>
          </div>
          <div className="bg-black border border-amber-500/20 p-8">
            <Users className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Years Experience</div>
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-12">
          <div>
            <h2 className="text-3xl font-serif mb-6">
              Professional <span className="text-amber-500">Equipment</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We invest in the latest professional photography equipment to ensure the highest quality results for our clients.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equipment.map((item, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section dark={false}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-6">
            Our <span className="text-amber-500">Philosophy</span>
          </h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              At Jhansi Fashion Studio, we believe that photography is more than just taking pictures. It's about understanding people, emotions, and moments. It's about being present and patient, waiting for that perfect instant when everything aligns.
            </p>
            <p>
              We approach each project with fresh eyes and an open heart, committed to telling your unique story through our lens. Our goal is to create images that not only look beautiful but also evoke the emotions and memories of your special moments.
            </p>
            <p className="text-amber-500 text-xl font-semibold italic">
              "Every photograph is a story waiting to be told."
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
