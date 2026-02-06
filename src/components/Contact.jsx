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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
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
                                className="text-xl text-gray-400 mb-10 leading-relaxed max-w-md"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                Whether you have a specific project in mind or just want to chat about tech, I'm always open to new connections and interesting conversations.
                            </motion.p>

                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                        <MailIcon className="size-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 font-semibold uppercase tracking-widest">Email me at</div>
                                        <div className="text-lg font-medium">hello@johndoe.com</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.form
                            className="space-y-6"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Name</label>
                                    <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email</label>
                                    <input type="email" placeholder="email@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Message</label>
                                <textarea rows={4} placeholder="What's on your mind?" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-colors resize-none"></textarea>
                            </div>
                            <PrimaryButton className="w-full py-4 text-lg group">
                                Send Message
                                <SendIcon className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </PrimaryButton>
                        </motion.form>
                    </div>
                </div>
            </div>
        </section>
    );
}