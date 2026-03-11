import { Link } from 'react-router-dom';
import { Camera, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-[10px] mb-4 group">
              <img 
                src="/images/logoo.jpeg" 
                alt="Jhansi Fashion Studio" 
                className="h-[40px] md:h-[50px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-2xl font-serif text-white">𝐉𝐡𝐚𝐧𝐬𝐢 𝐅𝐚𝐬𝐡𝐢𝐨𝐧 𝐒𝐭𝐮𝐝𝐢𝐨</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Capturing timeless moments with artistic vision and professional excellence. Your memories, our masterpiece.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/portfolio" className="hover:text-amber-500 transition-colors">Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link to="/reviews" className="hover:text-amber-500 transition-colors">Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Wedding Photography</li>
              <li>Pre-Wedding Shoots</li>
              <li>Portrait Photography</li>
              <li>Event Photography</li>
              <li>Product Photography</li>
              <li>Fashion Photography</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                <span>Jhansi Fashion Studio Near State Bank Of India <br />
                  Parvathipuram Manyam ,
                  Makkuva Mandal <br />
                  Andhra Pradesh</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>9010424224</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Jhansiphotography1125@gmail.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/jhansiphotography1125?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Jhansi Fashion Studio. All rights reserved. Crafted with passion.</p>
        </div>
      </div>
    </footer>
  );
}
