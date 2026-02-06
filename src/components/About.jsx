import { useRef } from 'react';
import { servicesData } from '../assets/dummy-data';
import Title from './Title';
import { motion } from 'framer-motion';

export default function About() {
    const refs = useRef([]);
    return (
        <section id="about" className="py-20 2xl:py-32 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">

                <Title
                    title="About Me"
                    heading="Crafting digital solutions with passion and precision"
                    description="I'm a full-stack developer based in San Francisco, specializing in building exceptional digital experiences. My approach combines technical excellence with a deep understanding of user needs."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    {servicesData.map((service, i) => (
                        <motion.div
                            ref={(el) => {
                                refs.current[i] = el;
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: i * 0.1 }}
                            key={i}
                            className="rounded-2xl p-8 bg-white/2 border border-white/5 hover:border-primary/20 transition-all duration-300 group overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-all duration-500" />

                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <div className="text-primary">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};