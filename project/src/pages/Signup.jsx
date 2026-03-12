import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return alert('Passwords do not match');
        }
        try {
            await signup(username, email, password);
            navigate('/');
        } catch (error) {
            // Error handled in AuthContext
        }
    };

    return (
        <div className="relative min-h-screen bg-black flex items-center justify-center px-4 overflow-hidden">
            {/* Background Logo Decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                <img 
                    src="/images/logoo.jpeg" 
                    alt="" 
                    className="w-[150%] max-w-none transform -rotate-12"
                />
            </div>

            {/* Ambient Glows */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative max-w-md w-full bg-neutral-900/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl mt-12 mb-12"
            >
                <div className="text-center mb-8">
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center justify-center mb-6"
                    >
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 ring-1 ring-white/5">
                            <img 
                                src="/images/logoo.jpeg" 
                                alt="Jhansi Fashion Studio Logo" 
                                className="h-14 w-auto object-contain" 
                            />
                        </div>
                    </motion.div>
                    <h1 className="text-3xl font-serif text-white mb-2 tracking-tight">Create Account</h1>
                    <p className="text-neutral-500 text-sm">Join Jhansi Fashion Studio for more updates</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-gold transition-colors" size={18} />
                            <input
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all font-serif"
                                placeholder="John Doe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-gold transition-colors" size={18} />
                            <input
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all font-serif"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-gold transition-colors" size={18} />
                            <input
                                type="password"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all font-serif"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-gold transition-colors" size={18} />
                            <input
                                type="password"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all font-serif"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gold hover:bg-gold/90 text-black font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gold/20 flex items-center justify-center gap-2 mt-4"
                    >
                        <span>Create Account</span>
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-neutral-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-gold hover:text-gold/80 font-medium transition-colors">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
