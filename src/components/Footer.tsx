import { footerLinks } from '../assets/dummy-data';
import { motion } from 'framer-motion';

export default function Footer() {

    return (
        <motion.footer className="bg-white/2 border-t border-white/5 pt-16 text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-12 py-12 border-b border-white/5">
                    <div className="max-w-md">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="size-8 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">
                                RV
                            </div>
                            <span className="font-bold text-xl tracking-tighter text-white">Rishanthan .V</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Passionate software engineer dedicated to building high-quality digital products.
                            Focused on clean code, performance, and user-centric design.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 sm:gap-24">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-sm text-white uppercase tracking-widest mb-6">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a
                                                href={link.url}
                                                className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                            >
                                                {'icon' in link && link.icon}
                                                <span>{link.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500 font-medium">
                        © {new Date().getFullYear()} Rishanthan .V. Built with React & Tailwind CSS.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}