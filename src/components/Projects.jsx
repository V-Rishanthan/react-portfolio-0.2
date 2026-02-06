import { Github, Palette } from "lucide-react";
import Title from "./Title";
import { motion } from "framer-motion";
import { useProject } from "../contaxt/ProjectContext";
import { toast } from "react-toastify";
export default function Projects() {
    const { projects, loading } = useProject();

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    if (!Array.isArray(projects) || projects.length === 0) return null;

    const normalize = (p) => {
        // title/name
        const name = p?.name || p?.title || "Untitled Project";

        // description
        const description = p?.description || "";

        // category
        const category = p?.category || "Development";

        // link (prefer project link, else github link)
        const link = p?.link || p?.gitLink || "#";
        const gitLink = p?.gitLink || "#";

        // image (support image OR imageUrls array)
        const image =
            p?.image ||
            (Array.isArray(p?.imageUrls) && p.imageUrls[0]) ||
            "https://via.placeholder.com/800x600?text=No+Image";

        // tech stack (support tech array OR technologies array OR stack string)
        const techStack = Array.isArray(p?.tech)
            ? p.tech
            : Array.isArray(p?.technologies)
                ? p.technologies
                : typeof p?.stack === "string"
                    ? p.stack.split(",").map((s) => s.trim()).filter(Boolean)
                    : [];

        return { id: p?.id, name, description, category, link, gitLink, image, techStack };
    };

    // Sort projects by createdAt (newest first)
    const sortedProjects = [...projects].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA; // Descending order (newest first)
    });

    return (
        <section id="projects" className="py-20 2xl:py-32">
            <div className="max-w-6xl mx-auto px-4">
                <Title
                    title="Portfolio"
                    heading="Selected projects that showcase my expertise"
                    description="From web platforms to mobile applications, here's a glimpse into the problems I've solved and the products I've built."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {sortedProjects.map((raw, i) => {
                        const project = normalize(raw);

                        return (
                            <motion.div
                                key={project.id || `${project.name}-${i}`}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group relative flex flex-col bg-white/2 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/20 transition-all duration-300"
                            >
                                <div className="relative overflow-hidden aspect-[16/10]">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />

                                    {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                        <a
                                            href={project.gitLink}
                                            target={project.gitLink === "#" ? "_self" : "_blank"}
                                            rel="noopener noreferrer"
                                            className="bg-white text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-white"
                                            aria-label={`Open GitHub for ${project.name}`}
                                            onClick={(e) => {
                                                if (project.gitLink === "#") e.preventDefault();
                                            }}
                                        >
                                            <Github className="size-6" />
                                        </a>
                                    </div> */}

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                        {project.gitLink && project.gitLink !== "#" ? (
                                            <a
                                                href={project.gitLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-white"
                                                aria-label={`Open GitHub for ${project.name}`}
                                            >
                                                <Github className="size-6" />
                                            </a>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toast.info("Design file available. Please contact the admin.")
                                                }
                                                className="bg-white text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-white"
                                                aria-label={`Design available for ${project.name}`}
                                                title="Design file"
                                            >
                                                <Palette className="size-6" />
                                            </button>
                                        )}
                                    </div>

                                </div>

                                <div className="p-8">
                                    <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                                        {project.category}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {project.name}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
