import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [publicContent, setPublicContent] = useState<any>(null);
    const [userContent, setUserContent] = useState<any>(null);
    const [adminContent, setAdminContent] = useState<any>(null);

    useEffect(() => {
        api.get('/api/public/content').then(res => setPublicContent(res.data));
        api.get('/api/user/content').then(res => setUserContent(res.data));

        if (user?.role === 'ADMIN') {
            api.get('/api/admin/content').then(res => setAdminContent(res.data));
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold">Dashboard</h1>
                        <p className="text-gray-600">Welcome, {user?.name} ({user?.role})</p>
                    </div>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>

                {/* Public Content */}
                <div className="bg-white p-4 rounded shadow mb-4">
                    <h2 className="font-bold text-green-600 mb-2">Public Content</h2>
                    {publicContent && (
                        <div className="bg-green-50 p-3 rounded">
                            <p>{publicContent.message}</p>
                        </div>
                    )}
                </div>

                {/* User Content */}
                <div className="bg-white p-4 rounded shadow mb-4">
                    <h2 className="font-bold text-blue-600 mb-2">User Content</h2>
                    {userContent && (
                        <div className="bg-blue-50 p-3 rounded">
                            <p>{userContent.message}</p>
                            <p className="text-sm text-gray-600">Logged in as: {userContent.user}</p>
                        </div>
                    )}
                </div>

                {/* Admin Content */}
                {user?.role === 'ADMIN' ? (
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="font-bold text-purple-600 mb-2">Admin Content</h2>
                        {adminContent && (
                            <div className="bg-purple-50 p-3 rounded">
                                <p>{adminContent.message}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded shadow opacity-50">
                        <h2 className="font-bold text-gray-400 mb-2">Admin Content (Locked)</h2>
                        <p className="text-gray-400">You need ADMIN role to access this</p>
                    </div>
                )}

            </div>
        </div>
    );
}
