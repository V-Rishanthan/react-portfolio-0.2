import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon, UploadIcon, Trash2Icon, Loader2Icon } from 'lucide-react';
import { useFirestore } from '../../hooks/useFirestore';
import { toast } from 'react-toastify';

export default function EditCv() {
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const { getDocument, setDocument, uploadImage, deleteImage } = useFirestore('settings');

    useEffect(() => {
        fetchCvData();
    }, []);

    const fetchCvData = async () => {
        try {
            const data = await getDocument('cv');
            setCvData(data);
        } catch (error) {
            console.error("Error fetching CV data:", error);
            toast.error("Failed to load CV data");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (file.type !== 'application/pdf') {
            toast.error("Please upload a PDF file");
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setUploading(true);
        try {
            // Delete old file if exists
            if (cvData?.path) {
                await deleteImage(cvData.path);
            }

            // Upload new file
            const result = await uploadImage(file, 'cv');

            const newCvData = {
                fileName: file.name,
                fileSize: file.size,
                url: result.url,
                path: result.path,
                uploadedAt: new Date().toISOString()
            };

            await setDocument('cv', newCvData);
            setCvData(newCvData);
            toast.success("CV uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload CV");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your CV?")) return;

        setUploading(true);
        try {
            if (cvData?.path) {
                await deleteImage(cvData.path);
            }
            await setDocument('cv', {
                fileName: null,
                fileSize: null,
                url: null,
                path: null,
                uploadedAt: null
            });
            setCvData(null);
            toast.success("CV deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete CV");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2Icon className="size-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Manage CV / Resume</h2>
                    <p className="text-gray-400">Upload or remove your CV document</p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="glass-panel p-8 rounded-3xl space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <UploadIcon className="size-5 text-primary" />
                            {cvData?.url ? 'Update CV Document' : 'Upload CV Document'}
                        </h3>

                        <label className={`
                            border-2 border-dashed border-white/10 rounded-3xl p-12 text-center space-y-4 
                            hover:border-primary/50 transition-colors group cursor-pointer block
                            ${uploading ? 'opacity-50 pointer-events-none' : ''}
                        `}>
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                            <div className="inline-flex p-4 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                                {uploading ? (
                                    <Loader2Icon className="size-8 text-primary animate-spin" />
                                ) : (
                                    <UploadIcon className="size-8 text-gray-500 group-hover:text-primary" />
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-lg">
                                    {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                                </p>
                                <p className="text-sm text-gray-500">PDF (MAX. 5MB)</p>
                            </div>
                        </label>
                    </div>

                    {cvData?.url && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <FileTextIcon className="size-5 text-secondary" />
                                Current CV
                            </h3>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                                        <FileTextIcon className="size-6 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg">{cvData.fileName || 'current-cv.pdf'}</p>
                                        <p className="text-sm text-gray-500">
                                            {(cvData.fileSize / (1024 * 1024)).toFixed(2)} MB •
                                            Uploaded on {new Date(cvData.uploadedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={cvData.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                                        title="View CV"
                                    >
                                        <FileTextIcon className="size-5" />
                                    </a>
                                    <button
                                        onClick={handleDelete}
                                        disabled={uploading}
                                        className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-500"
                                        title="Delete CV"
                                    >
                                        <Trash2Icon className="size-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
