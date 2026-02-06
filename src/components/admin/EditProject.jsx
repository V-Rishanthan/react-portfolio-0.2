import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlusIcon, SearchIcon, PencilIcon, Trash2Icon, ExternalLinkIcon,
    SaveIcon, XIcon, UploadIcon, CodeIcon, PaperclipIcon
} from 'lucide-react';
import { PrimaryButton, GhostButton } from '../Buttons';
import { useFirestore } from '../../hooks/useFirestore';
import { useProject } from '../../contaxt/ProjectContext';
import { toast } from 'react-toastify';

export default function EditProject() {
    const { projects, loading, refreshProjects } = useProject();
    const {
        addDocument,
        updateDocument,
        deleteDocument,
        uploadImage,
    } = useFirestore("projects");

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        technologies: '',
        description: '',
        gitLink: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleOpenForm = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title || '',
                technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
                description: project.description || '',
                gitLink: project.gitLink || '',
            });
            setImagePreview(Array.isArray(project.imageUrls) && project.imageUrls.length > 0 ? project.imageUrls[0] : null);
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                technologies: '',
                description: '',
                gitLink: '',
            });
            setImagePreview(null);
        }
        setImageFile(null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingProject(null);
        setFormData({
            title: '',
            technologies: '',
            description: '',
            gitLink: '',
        });
        setImageFile(null);
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("EditProject: Selected file:", file.name);
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let imageUrls = editingProject?.imageUrls || [];

            if (imageFile) {
                console.log("EditProject: Image file detected, starting upload...");
                const uploadResult = await uploadImage(imageFile, "projects");
                imageUrls = [uploadResult.url];
            }

            // Convert comma-separated technologies string to array
            const technologiesArray = formData.technologies
                .split(',')
                .map(tech => tech.trim())
                .filter(tech => tech.length > 0);

            const projectData = {
                title: formData.title,
                technologies: technologiesArray,
                description: formData.description,
                gitLink: formData.gitLink,
                imageUrls: imageUrls,
                createdAt: editingProject?.createdAt || new Date().toISOString(),
            };

            if (editingProject) {
                await updateDocument(editingProject.id, projectData);
                toast.success("Project updated successfully!");
            } else {
                await addDocument(projectData);
                toast.success("Project published successfully!");
            }

            handleCloseForm();
            refreshProjects(); // Globally refresh across the app
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error("Failed to save project");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteDocument(id);
                toast.success("Project deleted successfully");
                refreshProjects();
            } catch (error) {
                console.error("Error deleting project:", error);
                toast.error("Failed to delete project");
            }
        }
    };

    useEffect(() => {
        console.log("EditProject: Component mounted");
        return () => console.log("EditProject: Component unmounted");
    }, []);

    console.log("EditProject: State - projects:", projects, "loading:", loading);

    const filteredProjects = projects ? projects.filter(p => {
        if (!p) return false;
        const title = String(p.title || "");
        const tech = Array.isArray(p.technologies) ? p.technologies.join(', ') : "";
        return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tech.toLowerCase().includes(searchQuery.toLowerCase());
    }) : [];

    console.log("EditProject: Filtered projects count:", filteredProjects.length);

    try {
        console.log("EditProject: Rendering with", filteredProjects.length, "projects");

        return (
            <div className="space-y-8 relative">
                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-end justify-end bg-black/60 backdrop-blur-sm"
                            onClick={handleCloseForm}
                        >
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                className="w-full max-w-2xl h-full glass-panel p-8 border-l border-white/10 shadow-2xl relative overflow-y-auto bg-gray-950/95"
                                onClick={e => e.stopPropagation()}
                            >
                                <button
                                    onClick={handleCloseForm}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
                                >
                                    <XIcon className="size-6 text-gray-500" />
                                </button>

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                                    <p className="text-gray-400">Fill in the project details below</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300 ml-1">Project Title</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="e.g. Portfolio Website"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300 ml-1">Technologies</label>
                                            <div className="relative">
                                                <CodeIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.technologies}
                                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50"
                                                    placeholder="React, Tailwind, Node.js (comma-separated)"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-gray-300 ml-1">Description</label>
                                            <textarea
                                                required
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 h-32 outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                                placeholder="Briefly describe what this project does..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300 ml-1">GitHub/Project Link</label>
                                            <div className="relative">
                                                <PaperclipIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                                                <input
                                                    type="url"
                                                    value={formData.gitLink}
                                                    onChange={(e) => setFormData({ ...formData, gitLink: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50"
                                                    placeholder="https://github.com/..."
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300 ml-1">Thumbnail Image</label>
                                            <div className="flex items-center gap-4">
                                                <div className="size-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                                    {imagePreview ? (
                                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <UploadIcon className="size-6 text-gray-500" />
                                                    )}
                                                </div>
                                                <label className="relative cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="sr-only"
                                                    />
                                                    <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 hover:bg-white/10 transition-colors text-xs font-semibold">
                                                        {imagePreview ? 'Change Image' : 'Upload Image'}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <GhostButton type="button" onClick={handleCloseForm} className="px-6 py-3">Cancel</GhostButton>
                                        <PrimaryButton type="submit" disabled={submitting} className="px-8 py-3">
                                            <SaveIcon className="size-4" />
                                            {submitting ? 'Saving...' : (editingProject ? 'Update Project' : 'Publish Project')}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-bold">Manage Projects</h2>
                            <p className="text-gray-400">Add, edit or remove your portfolio projects</p>
                        </div>
                        <PrimaryButton onClick={() => handleOpenForm()} className="px-6 py-3">
                            <PlusIcon className="size-5" />
                            Add New Project
                        </PrimaryButton>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        <GhostButton onClick={refreshProjects} className="px-6 rounded-2xl border border-white/10">
                            Refresh
                        </GhostButton>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredProjects.length === 0 ? (
                                <div className="text-center py-20 glass-panel rounded-3xl border border-white/10">
                                    <p className="text-gray-400">No projects found.</p>
                                </div>
                            ) : (
                                filteredProjects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        whileHover={{ scale: 1.005 }}
                                        className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/30 transition-all group"
                                    >
                                        <div className="flex items-center gap-6 w-full md:w-auto">
                                            <div className="size-16 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center font-bold text-2xl shadow-lg shrink-0 overflow-hidden">
                                                {(Array.isArray(project.imageUrls) && project.imageUrls.length > 0) ? (
                                                    <img src={project.imageUrls[0]} alt={project.title || "Project"} className="w-full h-full object-cover" />
                                                ) : (
                                                    (project.title || "?")[0]
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title || "Untitled Project"}</h4>
                                                <p className="text-sm text-gray-400">{Array.isArray(project.technologies) ? project.technologies.join(', ') : ""}</p>
                                                <p className="text-xs text-gray-500 mt-1">Created: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "N/A"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                            <a href={project.gitLink} target="_blank" rel="noopener noreferrer">
                                                <GhostButton className="p-3">
                                                    <ExternalLinkIcon className="size-5 text-gray-400" />
                                                </GhostButton>
                                            </a>
                                            <GhostButton onClick={() => handleOpenForm(project)} className="p-3 hover:text-primary">
                                                <PencilIcon className="size-5" />
                                            </GhostButton>
                                            <GhostButton onClick={() => handleDelete(project.id)} className="p-3 hover:text-red-500 hover:bg-red-500/10">
                                                <Trash2Icon className="size-5" />
                                            </GhostButton>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        );
    } catch (err) {
        console.error("EditProject Render Error:", err);
        return <div className="p-8 text-red-500 glass-panel rounded-3xl border border-red-500/20 bg-red-500/5">
            Render Error: {err.message}
        </div>;
    }
}


