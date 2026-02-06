import { ArrowUpRightIcon } from 'lucide-react';
import { projectsData } from '../assets/dummy-data';
import Title from './Title';
import { motion } from 'framer-motion';

export default function Projects() {
    return (
        <section id="projects" className="py-20 2xl:py-32 bg-white/1">
            <div className="max-w-6xl mx-auto px-4">
                <Title
                    title="Portfolio"
                    heading="Selected projects that showcase my expertise"
                    description="From web platforms to mobile applications, here's a glimpse into the problems I've solved and the products I've built."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {projectsData.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative flex flex-col bg-white/2 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/20 transition-all duration-300"
                        >
                            <div className="aspect-16/10 overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <a
                                        href={project.link}
                                        className="bg-white text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-white"
                                    >
                                        <ArrowUpRightIcon className="size-6" />
                                    </a>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                                    {project.category}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                    {project.desc}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-[10px] font-bold uppercase tracking-tighter bg-white/5 border border-white/10 rounded-lg text-gray-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}