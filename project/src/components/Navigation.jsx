import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Camera, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isOwner } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-2 md:px-4 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-1.5 group">
            <img 
              src="/images/logoo.jpeg" 
              alt="Jhansi Fashion Studio" 
              className="h-[40px] md:h-[50px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl lg:text-2xl font-serif text-white tracking-wide whitespace-nowrap">𝐉𝐡𝐚𝐧𝐬𝐢 𝐅𝐚𝐬𝐡𝐢𝐨𝐧 𝐒𝐭𝐮𝐝𝐢𝐨</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] lg:text-sm uppercase tracking-wider transition-colors relative group ${location.pathname === link.path
                  ? 'text-amber-500'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''
                    }`}
                />
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-3 lg:gap-5">
                {isOwner && (
                  <Link
                    to="/admin"
                    className="text-gray-300 hover:text-amber-500 p-2 transition-colors flex items-center gap-1 text-sm uppercase tracking-wider bg-white/5 rounded-lg px-3"
                  >
                    <Settings size={18} />
                    <span>Admin</span>
                  </Link>
                )}
                <div className="flex items-center gap-3 text-white border-l border-neutral-800 pl-4 ml-1 group relative">
                  <div className="flex items-center gap-2 cursor-default">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                      <User size={16} />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-amber-500">{user.username}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-tighter transition-all duration-300 border border-red-500/20"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 text-sm uppercase tracking-wider font-semibold transition-all duration-300 border border-white/10 rounded-full"
              >
                Login
              </Link>
            )}

            <Link
              to="/booking"
              className="bg-amber-500 hover:bg-amber-600 text-black px-3 lg:px-4 py-2 text-xs lg:text-sm uppercase tracking-tight font-semibold transition-all duration-300 hover:scale-105 rounded-full shadow-lg shadow-amber-500/20 whitespace-nowrap"
            >
              Book Session
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-amber-500 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-sm uppercase tracking-wider transition-colors ${location.pathname === link.path
                  ? 'text-amber-500'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {user && isOwner && (
              <Link
                to="/admin"
                className="block text-sm uppercase tracking-wider text-amber-500"
              >
                Admin Dashboard
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left text-sm uppercase tracking-wider text-red-500"
              >
                Logout ({user.username})
              </button>
            ) : (
              <Link
                to="/login"
                className="block text-sm uppercase tracking-wider text-white"
              >
                Login
              </Link>
            )}

            <Link
              to="/booking"
              className="block w-full bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 text-sm uppercase tracking-wider font-semibold text-center transition-colors"
            >
              Book Session
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
