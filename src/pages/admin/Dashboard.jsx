import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import EditCv from '../../components/admin/EditCv';
import EditProject from '../../components/admin/EditProject';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contaxt/AuthContext';

export default function Dashboard() {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('settings');
    const navigate = useNavigate();

    console.log("Dashboard: Active Tab is", activeTab);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const renderContent = () => {
        try {
            switch (activeTab) {
                case 'settings':
                    return <EditCv />;
                case 'edit-projects':
                    return <EditProject />;
                default:
                    return <EditCv />;
            }
        } catch (error) {
            console.error("Dashboard render error:", error);
            return <div className="p-8 text-red-500">Error loading component: {error.message}</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-950 overflow-hidden">
            {/* Left Sidebar */}
            <div className="hidden md:block">
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={handleLogout}
                />
            </div>

            {/* Right Content Area */}
            <main className="flex-1 overflow-y-auto relative custom-scrollbar">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64" />

                <div className="max-w-5xl mx-auto p-8 md:p-12 relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
