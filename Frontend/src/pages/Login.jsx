import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, BarChart, Users, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
    const [formData, setFormData] = useState({email: '', password: '',});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await login(formData.email, formData.password);
            toast.success('Welcome back!');
        } catch {
            toast.error('Invalid credentials');
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
    <div className="min-h-screen flex bg-background text-foreground">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary/40 to-primary rounded-xl flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-white" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">Welcome to Pulseboard</h1>
                <p className="text-muted-foreground">Sign in to your collaborative dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className="pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Signing in...
                    </div>
                    ) : (
                    'Sign in'
                    )}
                </Button>
                </form>

                <div className="mt-6 text-center">
                <Link
                    to="/signup"
                    className="text-sm text-primary hover:underline"
                >
                    Don't have an account? Sign up
                </Link>
                </div>

                <div className="mt-4 text-center">
                <Button variant="ghost" className="text-sm">
                    Continue as Guest
                </Button>
                </div>
            </motion.div>
        </div>

        {/* Right side - Feature Showcase */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 items-center justify-center p-12">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-lg"
            >
                <h2 className="text-4xl font-bold mb-6">Real-time Collaboration Made Simple</h2>
                <p className="text-lg text-muted-foreground mb-8">
                Create, share, and analyze data dashboards with your team in real-time.
                </p>

                <div className="space-y-6">
                {[
                    {
                    icon: <BarChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
                    title: 'Live Data Visualization',
                    desc: 'Dynamic charts that update in real-time',
                    bg: 'bg-blue-100 dark:bg-blue-900',
                    },
                    {
                    icon: <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
                    title: 'Team Collaboration',
                    desc: 'Work together with live cursors and comments',
                    bg: 'bg-purple-100 dark:bg-purple-900',
                    },
                    {
                    icon: <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />,
                    title: 'Instant Insights',
                    desc: 'Get actionable insights from your data',
                    bg: 'bg-green-100 dark:bg-green-900',
                    },
                ].map(({ icon, title, desc, bg }, i) => (
                    <div key={i} className="flex items-center">
                    <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mr-4`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="text-muted-foreground">{desc}</p>
                    </div>
                    </div>
                ))}
                </div>
            </motion.div>
        </div>
    </div>
    );
};

export default Login;
