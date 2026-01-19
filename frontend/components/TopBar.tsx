'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Cloud, Bell, Search, Menu, Timer, Sparkles, User } from 'lucide-react';
import axios from 'axios';
import { useSchoolProfile } from '@/hooks/useSchoolProfile';
import useAuthStore from '@/store/useAuthStore';

export default function TopBar() {
    const { profile } = useSchoolProfile();
    const [prayerTimes, setPrayerTimes] = useState<any>(null);
    const [nextPrayer, setNextPrayer] = useState<any>(null);
    const [adminName, setAdminName] = useState('');
    const [adminRole, setAdminRole] = useState('Administrateur');

    const pathname = usePathname();

    const user = useAuthStore(state => state.user);

    // Load theme and user info
    useEffect(() => {
        if (user) {
            const name = `${user.name} ${user.surname || ''}`.trim();
            setAdminName(name);
            if (user.role === 'ADMIN') {
                setAdminRole('Administrateur');
            } else if (user.role === 'SECRETARY') {
                setAdminRole('Secrétaire');
            } else if (user.role === 'PARENT') {
                setAdminRole('Parent');
            } else {
                setAdminRole('Utilisateur');
            }
        }

        // Fetch Athan Times
        const fetchAthan = async (lat: number, lon: number) => {
            try {
                const date = new Date();
                const res = await axios.get(`https://api.aladhan.com/v1/timings/${Math.floor(date.getTime() / 1000)}?latitude=${lat}&longitude=${lon}&method=3`);
                const timings = res.data.data.timings;
                setPrayerTimes(timings);

                // Identify next prayer
                const now = date.getHours() * 60 + date.getMinutes();
                const prayers = [
                    { name: 'Fajr', time: timings.Fajr },
                    { name: 'Dhuhr', time: timings.Dhuhr },
                    { name: 'Asr', time: timings.Asr },
                    { name: 'Maghrib', time: timings.Maghrib },
                    { name: 'Isha', time: timings.Isha }
                ];

                const upcoming = prayers.find(p => {
                    const [h, m] = p.time.split(':').map(Number);
                    return (h * 60 + m) > now;
                }) || prayers[0];

                setNextPrayer(upcoming);
            } catch (error) {
                console.error('Failed to fetch Athan times:', error);
            }
        };

        const getFallbackLocation = async () => {
            try {
                const res = await axios.get('https://ipapi.co/json/');
                if (res.data.latitude && res.data.longitude) {
                    fetchAthan(res.data.latitude, res.data.longitude);
                }
            } catch (e) {
                fetchAthan(33.5731, -7.5898); // Casablanca
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => fetchAthan(position.coords.latitude, position.coords.longitude),
                () => getFallbackLocation(),
                { timeout: 5000 }
            );
        } else {
            getFallbackLocation();
        }
    }, [pathname, user]);

    return (
        <header className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side - School info */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-slate-900">
                                    {profile?.schoolName || 'ENOVAZONE'}
                                </h1>
                                <p className="text-xs text-slate-500">
                                    {profile?.address || 'Plateforme Éducative'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - User info and controls */}
                    <div className="flex items-center space-x-4">
                        {/* Prayer times */}
                        {nextPrayer && (
                            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                                <Timer className="h-4 w-4" />
                                <span>{nextPrayer.name}: {nextPrayer.time}</span>
                            </div>
                        )}

                        {/* Notifications */}
                        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative">
                            <Bell className="h-5 w-5 text-slate-600" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User menu */}
                        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-slate-900">
                                    {adminName || 'Administrateur'}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {adminRole}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
