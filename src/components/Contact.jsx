import { MailIcon, SendIcon } from 'lucide-react';
import { PrimaryButton } from './Buttons';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section id="contact" className="py-20 2xl:py-32 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="glass-panel p-12 md:p-20 rounded-[3rem] overflow-hidden relative">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[100px] rounded-full -ml-48 -mb-48" />

                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Let's build <br />
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                                something amazing
                            </span>
                        </motion.h2>
                        <motion.p
                            className="text-xl text-gray-400 mb-12 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Have a project in mind or looking to hire a developer?
                            I’m open to new opportunities, collaborations, and professional conversations.                        </motion.p>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex flex-col items-center gap-4 text-gray-300">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                    <MailIcon className="size-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Email</div>
                                    <a href="mailto:rishanthan390@gmail.com" className="text-sm font-medium hover:text-primary transition-colors">
                                        rishanthan390@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 text-gray-300">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                    <svg className="size-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Phone</div>
                                    <a href="tel:+94763468914" className="text-sm font-medium hover:text-primary transition-colors">
                                        +94 76 346 8914
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 text-gray-300">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                    <svg className="size-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Location</div>
                                    <div className="text-sm font-medium">Trincomalee, SL</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Links Federated */}
                        <motion.div
                            className="flex gap-4 mt-12 pt-12 border-t border-white/5 w-full justify-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <a
                                href="https://github.com/V-Rishanthan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
                            >
                                <svg className="size-6 text-gray-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/in/rishanthan-v"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
                            >
                                <svg className="size-6 text-gray-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}