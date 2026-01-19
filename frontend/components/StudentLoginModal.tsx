'use client';

import { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Save, X } from 'lucide-react';
import { getStudentLoginInfo, updateStudentPassword } from '@/lib/services/students';

interface StudentLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: any;
}

export default function StudentLoginModal({ isOpen, onClose, student }: StudentLoginModalProps) {
    const [loginInfo, setLoginInfo] = useState<any>(null);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);

    useEffect(() => {
        if (isOpen && student) {
            loadLoginInfo();
        }
    }, [isOpen, student]);

    const loadLoginInfo = async () => {
        if (!student?.id) return;
        setLoadingLogin(true);
        try {
            const data = await getStudentLoginInfo(student.id);
            setLoginInfo(data);
        } catch (error) {
            console.error('Failed to load login info', error);
        } finally {
            setLoadingLogin(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (!newPassword || !student?.id) return;
        setLoading(true);
        try {
            await updateStudentPassword(student.id, newPassword);
            setNewPassword('');
            setIsEditingPassword(false);
            setShowPassword(false);
            alert('Mot de passe mis à jour avec succès');
            // Reload login info
            loadLoginInfo();
        } catch (error) {
            console.error('Failed to update password', error);
            alert('Erreur lors de la mise à jour du mot de passe');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditingPassword(false);
        setNewPassword('');
        setShowPassword(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                            <Key className="h-5 w-5 mr-2 text-blue-600" />
                            Informations de Connexion
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <p className="text-gray-500 text-sm mb-6">
                        Détails de connexion pour <span className="font-semibold text-gray-800">{student?.name} {student?.surname}</span>
                    </p>

                    {loadingLogin ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-3 text-gray-600">Chargement...</span>
                        </div>
                    ) : loginInfo ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email de connexion
                                </label>
                                <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                                    {loginInfo.email}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mot de passe
                                </label>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg flex-1">
                                        ••••••••
                                    </span>
                                    {!isEditingPassword ? (
                                        <button
                                            onClick={() => setIsEditingPassword(true)}
                                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            Changer
                                        </button>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="Nouveau mot de passe"
                                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm pr-10 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                            <button
                                                onClick={handleUpdatePassword}
                                                disabled={!newPassword || loading}
                                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? (
                                                    <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <Save size={16} />
                                                )}
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Informations de connexion non disponibles</p>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}