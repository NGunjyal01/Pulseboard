import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, BarChart, Shield, Globe, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signup } from '@/services/authAPI';

const Signup = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            await signup(formData,navigate);
            toast.success('Account created successfully!');
        } catch {
            toast.error('Failed to create account');
        }
        finally{
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
    <div className="min-h-screen flex text-foreground">
        {/* Left side - Feature Showcase */}
        <div className="bg-secondary hidden lg:flex flex-1 items-center justify-center p-12">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
        >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Join Thousands of Teams
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
            Transform your data into actionable insights with our collaborative platform.
            </p>

            <div className="grid grid-cols-2 gap-6">
            {[
                {
                icon: <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                title: 'Secure',
                desc: 'Enterprise-grade security',
                bg: 'bg-indigo-100 dark:bg-indigo-900',
                },
                {
                icon: <Globe className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
                title: 'Global',
                desc: 'Access from anywhere',
                bg: 'bg-cyan-100 dark:bg-cyan-900',
                },
                {
                icon: <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
                title: 'Fast',
                desc: 'Lightning-fast performance',
                bg: 'bg-purple-100 dark:bg-purple-900',
                },
                {
                icon: <BarChart className="w-8 h-8 text-green-600 dark:text-green-400" />,
                title: 'Smart',
                desc: 'AI-powered insights',
                bg: 'bg-green-100 dark:bg-green-900',
                },
            ].map((item, i) => (
                <div key={i} className="text-center">
                <div className={`w-16 h-16 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    {item.icon}
                </div>
                <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
            ))}
            </div>
        </motion.div>
        </div>

        {/* Right side - Form */}
        <div className="bg-primary/10 dark:bg-background flex-1 flex items-center justify-center px-6 lg:px-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-primary/40 to-primary rounded-xl mx-auto flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Start collaborating with your team today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='flex justify-between gap-5'>
                    <div className='space-y-2 w-[90%]'>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                        id="firstName"
                        name="firstName"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your first name"
                        />
                    </div>
                    <div className='space-y-2 w-[90%]'>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                        id="lastName"
                        name="lastName"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your last name"
                        />
                    </div>
                </div>

                <div className='space-y-2'>
                    <Label htmlFor="email">Email Address</Label>
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

                <div className='space-y-2'>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Create a password"
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className='space-y-2'>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm your password"
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating account...
                    </div>
                    ) : (
                    'Create Account'
                    )}
                </Button>
            </form>

            <div className="mt-6 text-center">
            <Link to="/login" className="text-primary hover:underline text-sm">
                Already have an account? Sign in
            </Link>
            </div>

            <div className="mt-6 text-xs text-muted-foreground text-center">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </div>
        </motion.div>
        </div>
    </div>
    );
};

export default Signup;
