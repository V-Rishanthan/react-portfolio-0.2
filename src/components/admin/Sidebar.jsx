import { LayoutDashboardIcon, FileTextIcon, BriefcaseIcon, LogOutIcon, SparklesIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
    const menuItems = [
        { id: 'edit-cv', label: 'Edit CV', icon: FileTextIcon },
        { id: 'edit-projects', label: 'Manage Projects', icon: BriefcaseIcon },
    ];

    return (
        <div className="w-80 h-full glass-panel border-r border-white/10 flex flex-col p-6 space-y-8">
            <div className="flex items-center gap-3 px-2">
                <div className="size-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                    <LayoutDashboardIcon className="size-6 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-xl tracking-tighter leading-none">Admin</h2>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold mt-1">Control Panel</p>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative ${activeTab === item.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {activeTab === item.id && (
                            <motion.div
                                layoutId="sidebar-active"
                                className="absolute left-0 w-1 h-8 bg-primary rounded-full"
                            />
                        )}
                        <item.icon className={`size-5 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-primary' : ''}`} />
                        <span className="font-semibold">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <SparklesIcon className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold truncate">Rishanthan .V</p>
                        <p className="text-[10px] text-gray-500">Super Admin</p>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all font-semibold"
                >
                    <LogOutIcon className="size-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
