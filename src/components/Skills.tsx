import { skillsData } from '../assets/dummy-data';
import Title from './Title';
import { motion } from 'framer-motion';

export default function Skills() {
    return (
        <section id="skills" className="py-20 2xl:py-32">
            <div className="max-w-6xl mx-auto px-4">
                <Title
                    title="Tech Stack"
                    heading="My Technical Toolbox"
                    description="A comprehensive list of languages, frameworks, and tools I use to bring ideas to life."
                />

                <div className="mt-16 space-y-16">
                    {skillsData.map((category, idx) => (
                        <div key={idx} className="space-y-8">
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold text-white border-l-4 border-primary pl-4"
                            >
                                {category.category}
                            </motion.h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {category.skills.map((skill, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                        whileHover={{ y: -5 }}
                                        className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-primary/40 transition-all duration-300 group"
                                    >
                                        <div className="size-12 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    // Fallback for missing icons
                                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${skill.name}&background=random`;
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-300 transition-colors text-center">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
