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
        <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-neutral-800"
            >
                <div className="text-center mb-8">
                    <img 
                      src="/images/logoo.jpeg" 
                      alt="Jhansi Fashion Studio" 
                      className="h-20 w-auto mx-auto mb-4 object-contain"
                    />
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-neutral-400">Join Jhansi Fashion Studio</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                            <input
                                type="text"
                                required
                                className="w-full bg-black border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                                placeholder="John Doe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                            <input
                                type="email"
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                            <input
                                type="password"
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                            <input
                                type="password"
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gold hover:bg-gold/90 text-black font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-neutral-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-gold hover:underline">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
