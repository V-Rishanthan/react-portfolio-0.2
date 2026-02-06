import { GithubIcon, LinkedinIcon, TrophyIcon, Code2Icon, SparklesIcon, DownloadIcon } from 'lucide-react';
import { PrimaryButton, GhostButton } from './Buttons';
import { motion } from 'framer-motion';
import avatarUrl from '../assets/avatar.jpeg';
import { useFirestore } from '../hooks/useFirestore';
import { useEffect, useState } from 'react';

export default function Hero() {

    const { getDocument } = useFirestore("settings");
    const [cvUrl, setCvUrl] = useState("");
    const [loadingCv, setLoadingCv] = useState(true);

    useEffect(() => {
        const loadCv = async () => {
            try {
                const data = await getDocument("cv"); // Firestore: settings/cv
                if (data?.url) setCvUrl(data.url);
            } catch (err) {
                console.error("Failed to load CV:", err);
            } finally {
                setLoadingCv(false);
            }
        };

        loadCv();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const techStack = [
        'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'
    ];


    const scrollText = [
        'Full Stack Developer',
        'UI/UX Enthusiast',
        'Open Source Contributor',
        'Problem Solver',
        'Clean Code Advocate'
    ];

    return (
        <>
            <section id="home" className="relative z-10 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 min-h-[90vh] flex items-center justify-center pt-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                        <div className="text-left">
                            <motion.div
                                className="inline-flex items-center gap-2 pl-2 pr-4 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                    Available for new opportunities
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    Software Engineer
                                </h1>
                                <h2 className="text-3xl md:text-6xl font-bold leading-tight mb-8">
                                    <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                                        Rishanthan .V
                                    </span>
                                </h2>
                            </motion.div>

                            <motion.p
                                className="text-xl text-gray-400 max-w-lg mb-10 leading-relaxed"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                I build high-performance, beautiful web applications with a focus on user experience and scalable architecture.
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap items-center gap-4 mb-12"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <a
                                    href={cvUrl || "#"} download
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => {
                                        if (!cvUrl) e.preventDefault();
                                    }}
                                >
                                    <PrimaryButton className="py-4 px-8 text-lg group">
                                        {loadingCv ? "Loading CV..." : cvUrl ? "Download CV" : "CV Not Uploaded"}
                                        <DownloadIcon className="size-5 group-hover:translate-y-1 transition-transform" />
                                    </PrimaryButton>
                                </a>

                                <div className="flex items-center gap-3">
                                    <a href="https://github.com/V-Rishanthan?tab=repositories" target="_blank" rel="noopener noreferrer">
                                        <GhostButton className="p-3">
                                            <GithubIcon className="size-6" />
                                        </GhostButton>
                                    </a>
                                    <a href="https://www.linkedin.com/in/rishanthan-v/" target="_blank" rel="noopener noreferrer">
                                        <GhostButton className="p-3">
                                            <LinkedinIcon className="size-6" />
                                        </GhostButton>
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                className="grid grid-cols-2 gap-6"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                        <TrophyIcon className="size-5 text-yellow-500" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold">5+</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-tighter">Years Exp</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                        <Code2Icon className="size-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold">50+</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-tighter">Projects</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="relative flex justify-center items-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="relative z-10 w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/20 glass-panel">
                                <img
                                    src={avatarUrl}
                                    alt="Rishanthan .V"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                                        <SparklesIcon className="size-4 text-secondary" />
                                        <span className="text-xs font-medium">Software Engineer</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 blur-3xl rounded-full animate-pulse" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* MARQUEE */}
            <motion.section
                className="border-y border-white/5 bg-white/2 py-8 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <div className="flex gap-12 items-center animate-marquee whitespace-nowrap">
                    {[...scrollText, ...scrollText, ...scrollText].map((text, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-gray-700 hover:text-gray-400 transition-colors uppercase tracking-widest"
                        >
                            {text}
                            <span className="size-2 rounded-full bg-primary/30" />
                        </span>
                    ))}
                </div>
            </motion.section>
        </>
    );
};