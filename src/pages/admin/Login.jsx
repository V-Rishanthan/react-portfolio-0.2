import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { LockIcon, UserIcon, LogInIcon, SparklesIcon } from 'lucide-react';
import { PrimaryButton } from '../../components/Buttons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/confic";
import { toast } from "react-toastify";
import { useAuth } from '../../contaxt/AuthContext';


export default function Login() {
    const { user, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin/dashboard";

    useEffect(() => {
        if (!loading && user) {
            navigate(from, { replace: true });
        }
    }, [user, loading, navigate, from]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            //  SUCCESS toast
            toast.success("Welcome Admin! Login successful ");
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1000)
        } catch (error) {
            toast.error("Invalid credentials");
        } finally {
            setSubmitting(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
            {/* Background Decorative Blobs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 blur-3xl rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 blur-3xl rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-4">
                            <LockIcon className="size-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Access</h1>
                        <p className="text-gray-400">Welcome back, Please enter your details</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                <div className="relative">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                                <div className="relative">
                                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <PrimaryButton
                            disabled={submitting}
                            type="submit"
                            className="w-full py-4 text-lg font-bold group">
                            {submitting ? "Signing In..." : "Sign In"}
                            <LogInIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                        </PrimaryButton>
                    </form>

                    <div className="flex justify-center items-center gap-2 text-xs text-gray-500">
                        <SparklesIcon className="size-3" />
                        <span>Secure Admin Panel</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
