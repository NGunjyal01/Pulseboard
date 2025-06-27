import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, BarChart, Shield, Globe, Zap } from 'lucide-react';
import { toast } from 'sonner';

const Signup = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            // await Signup(formData.name, formData.email, formData.password);
            toast.success('Account created successfully!');
        } catch (error) {
            toast.error('Failed to create account');
        }
        };

        const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
    <div className="min-h-screen flex">
        {/* Left side - Feature Showcase */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 items-center justify-center p-12">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
        >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Join Thousands of Teams
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Transform your data into actionable insights with our collaborative platform.
            </p>

            <div className="grid grid-cols-2 gap-6">
            {[
                { icon: Shield, label: 'Secure', desc: 'Enterprise-grade security', bg: 'indigo' },
                { icon: Globe, label: 'Global', desc: 'Access from anywhere', bg: 'cyan' },
                { icon: Zap, label: 'Fast', desc: 'Lightning-fast performance', bg: 'purple' },
                { icon: BarChart, label: 'Smart', desc: 'AI-powered insights', bg: 'green' },
            ].map(({ icon: Icon, label, desc, bg }) => (
                <div key={label} className="text-center">
                <div className={`w-16 h-16 bg-${bg}-100 dark:bg-${bg}-900 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-8 h-8 text-${bg}-600 dark:text-${bg}-400`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
            ))}
            </div>
        </motion.div>
        </div>

        {/* Right side - Signup Form */}
        <div className="flex-1 flex items-center justify-center px-8 lg:px-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
        >
            <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <BarChart className="w-6 h-6 text-white" />
                </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create Your Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
                Start collaborating with your team today
            </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full name
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200"
                placeholder="Enter your full name"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
                </label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200"
                placeholder="Enter your email"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
                </label>
                <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white pr-12 transition-all duration-200"
                    placeholder="Create a password"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                </div>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm password
                </label>
                <div className="relative">
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white pr-12 transition-all duration-200"
                    placeholder="Confirm your password"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-cyan-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
                {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                </div>
                ) : (
                'Create Account'
                )}
            </button>
            </form>

            <div className="mt-6 text-center">
            <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
            >
                Already have an account? Sign in
            </Link>
            </div>

            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                Privacy Policy
            </a>
            </div>
        </motion.div>
        </div>
    </div>
    );
};

export default Signup;
