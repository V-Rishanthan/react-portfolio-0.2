import { MenuIcon, XIcon } from 'lucide-react';
import { PrimaryButton } from './Buttons';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'About', href: '/#about' },
        { name: 'Skills', href: '/#skills' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Education', href: '/#education' },
    ];

    return (
        <motion.nav className='fixed top-5 left-0 right-0 z-50 px-4'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
        >
            <div className='max-w-6xl mx-auto flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4'>
                <a href='/#' className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">
                        RV
                    </div>
                    <span className="font-bold text-xl tracking-tighter">Rishanthan .V</span>
                </a>

                <div className='hidden md:flex items-center gap-8 text-sm font-semibold text-gray-400'>
                    {navLinks.map((link) => (
                        <a href={link.href} key={link.name} className="hover:text-white transition-colors relative group">
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                <div className='hidden md:flex items-center gap-3'>
                    <a href="#contact">
                        <PrimaryButton className='text-xs font-bold uppercase tracking-widest px-6 h-10'>
                            Let's Talk
                        </PrimaryButton>
                    </a>
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className='md:hidden p-2 hover:bg-white/5 rounded-xl transition-colors'>
                    <MenuIcon className='size-6' />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`flex flex-col items-center justify-center gap-8 text-2xl font-bold fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                    <XIcon className="size-8" />
                </button>

                {navLinks.map((link, i) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="hover:text-primary transition-colors hover:scale-110 active:scale-95 duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isOpen ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 * i }}
                    >
                        {link.name}
                    </motion.a>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isOpen ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <a href="#contact" onClick={() => setIsOpen(false)}>
                        <PrimaryButton className="px-12 py-5 text-xl font-bold rounded-2xl">
                            Let's Talk
                        </PrimaryButton>
                    </a>
                </motion.div>
            </div>
        </motion.nav>
    );
}