import { educationData } from '../assets/dummy-data';
import Title from './Title';
import { motion } from 'framer-motion';
import { GraduationCapIcon, CalendarIcon } from 'lucide-react';

export default function Education() {
    return (
        <section id="education" className="py-20 2xl:py-32">
            <div className="max-w-4xl mx-auto px-4">
                <Title
                    title="Education"
                    heading="My Academic Background"
                    description="The foundational certifications and degrees that have shaped my technical journey."
                />

                <div className="mt-16 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-1/2 ml-4 md:ml-0" />

                    <div className="space-y-12">
                        {educationData.map((edu, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 top-0 size-8 bg-black border-2 border-primary rounded-full md:-translate-x-1/2 ml-0.5 md:ml-0 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                                    <div className="size-2 bg-primary rounded-full" />
                                </div>

                                {/* Content Card */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                                    <div className="glass-panel p-8 rounded-3xl hover:border-primary/20 transition-all duration-300 group">
                                        <div className="flex items-center gap-3 text-primary mb-4">
                                            <CalendarIcon className="size-4" />
                                            <span className="text-sm font-semibold uppercase tracking-widest">{edu.period}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{edu.role}</h3>
                                        <div className="flex items-center gap-2 text-gray-300 mb-4">
                                            <GraduationCapIcon className="size-4" />
                                            <span className="font-medium">{edu.company}</span>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {edu.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
