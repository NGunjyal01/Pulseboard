import { useState } from 'react';
import useAuthStore from '../store/auth';
import axios from 'axios';

const Login = () => {
    const { login } = useAuthStore();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4444/login', form);
            login(res.data.user, res.data.token);
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed');
        }
    };

    return (
    <div className="p-6 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border w-full p-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="border w-full p-2" type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="bg-black text-white px-4 py-2 rounded">Login</button>
        </form>
    </div>
    );
}

export default Login;