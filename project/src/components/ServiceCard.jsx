import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink } from 'lucide-react';

const ServiceCard = ({ service }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-black border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
      {/* Image Container */}
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={service.coverImage}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        
        {/* Floating Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
            {service.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-amber-500 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
          {service.description}
        </p>

        {/* Action Button */}
        <Link
          to={`/portfolio/${encodeURIComponent(service.category)}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-amber-500 text-white hover:text-black rounded-xl text-sm font-bold transition-all duration-300 group/btn shadow-sm"
        >
          View Work
          <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>

      {/* Subtle Hover Reveal Border */}
      <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/20 rounded-3xl transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ServiceCard;
