'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar, BookOpen, Bell, Award, Clock, Star, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

// Simple Card components to avoid import issues
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-xl font-semibold leading-none tracking-tight text-gray-800 ${className}`}>
        {children}
    </h3>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

interface DashboardData {
    groups: any[];
    courses: any[];
    sessions: any[];
    notifications: any[];
}

export default function TeacherDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const { default: api } = await import('../../lib/api');
            const response = await api.get('/teacher/dashboard');
            setData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Chargement du tableau de bord...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section with Background */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'url(/assits/tdb.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }}></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Espace Professeur</h1>
                            <p className="text-blue-100 text-xl">Bienvenue dans votre tableau de bord pédagogique</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <Award className="w-6 h-6 text-yellow-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-blue-100">Statut</p>
                                        <p className="text-lg font-bold">Professeur Certifié</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium mb-1">Mes Classes</p>
                                    <p className="text-3xl font-bold">{data?.groups?.length || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium mb-1">Séances Aujourd'hui</p>
                                    <p className="text-3xl font-bold">{data?.sessions?.length || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Calendar className="w-6 h-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm font-medium mb-1">Total Élèves</p>
                                    <p className="text-3xl font-bold">156</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100 text-sm font-medium mb-1">Notifications</p>
                                    <p className="text-3xl font-bold">{data?.notifications?.length || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Bell className="w-6 h-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Sessions & Schedule */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Today's Schedule */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <span>Emploi du Temps - Aujourd'hui</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {data?.sessions?.slice(0, 4).map((session, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                                    <Calendar className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{session.group?.name || 'Classe'}</p>
                                                    <p className="text-sm text-gray-600">{session.startTime} - {session.endTime || 'N/A'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center space-x-1">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span>Confirmé</span>
                                                </span>
                                            </div>
                                        </div>
                                    )) || (
                                        <div className="text-center py-8">
                                            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500 font-medium">Aucune séance programmée aujourd'hui</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activities */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                    <span>Activités Récentes</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">Présence marquée</p>
                                            <p className="text-sm text-gray-600">Classe Mathématiques - 15 élèves présents</p>
                                        </div>
                                        <span className="text-xs text-gray-500">2h ago</span>
                                    </div>
                                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">Cours créé</p>
                                            <p className="text-sm text-gray-600">Chapitre 5: Algèbre Avancée</p>
                                        </div>
                                        <span className="text-xs text-gray-500">5h ago</span>
                                    </div>
                                    <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                            <Bell className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">Notification envoyée</p>
                                            <p className="text-sm text-gray-600">Rappel: Contrôle demain</p>
                                        </div>
                                        <span className="text-xs text-gray-500">1j ago</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Quick Actions & Info */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Star className="w-5 h-5 text-indigo-600" />
                                    <span>Actions Rapides</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-3 font-medium shadow-sm">
                                        <Calendar className="w-5 h-5" />
                                        <span>Planifier une Séance</span>
                                    </button>
                                    <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-3 font-medium shadow-sm">
                                        <Users className="w-5 h-5" />
                                        <span>Gérer les Présences</span>
                                    </button>
                                    <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-3 font-medium shadow-sm">
                                        <BookOpen className="w-5 h-5" />
                                        <span>Créer un Cours</span>
                                    </button>
                                    <button className="w-full p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-3 font-medium shadow-sm">
                                        <Bell className="w-5 h-5" />
                                        <span>Envoyer une Alerte</span>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Performance Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Award className="w-5 h-5 text-yellow-600" />
                                    <span>Performance</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Taux de Présence</span>
                                        <span className="text-sm font-bold text-green-600">94%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Satisfaction Élèves</span>
                                        <span className="text-sm font-bold text-blue-600">4.8/5</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}