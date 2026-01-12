'use client';
import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterAdmin() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirm) return setError('Passwords do not match');
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
            const res = await fetch(`${API_URL}/auth/register-admin`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });
            const data = await res.json();
            if (!res.ok) return setError(data.message || 'Failed');
            // after register, redirect to login
            router.push('/login');
        } catch (e) { setError('Network error'); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold mb-4">Create Admin</h1>
                {error && <div className="mb-3 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 border rounded pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                                className="w-full p-2 border rounded pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button className="flex-1 bg-blue-600 text-white">Create</Button>
                        <Button type="button" onClick={() => { setEmail(''); setPassword(''); setConfirm(''); setName(''); }} className="flex-1 bg-gray-200">Annuler</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
