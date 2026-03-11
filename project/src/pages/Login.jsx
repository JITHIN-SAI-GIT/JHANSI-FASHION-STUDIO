import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { LogIn, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === 'OWNER') navigate('/admin');
            else navigate('/');
        } catch (error) {
            // Error handled in AuthContext
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            await googleLogin(credentialResponse.credential);
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
                    <div className="inline-flex items-center justify-center mb-4">
                        <img 
                            src="/images/logoo.jpeg" 
                            alt="Jhansi Fashion Studio Logo" 
                            className="h-[60px] md:h-[80px] w-auto object-contain transition-transform duration-300 hover:scale-105" 
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-neutral-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <button
                        type="submit"
                        className="w-full bg-gold hover:bg-gold/90 text-black font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-neutral-900/50 text-neutral-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => console.log('Login Failed')}
                            theme="filled_black"
                            shape="pill"
                        />
                    </div>
                </div>

                <p className="mt-8 text-center text-neutral-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-gold hover:underline">Sign up</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
