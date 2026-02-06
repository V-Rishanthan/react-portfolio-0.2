import { motion } from 'framer-motion';
import { SaveIcon, FileTextIcon, UploadIcon } from 'lucide-react';
import { PrimaryButton } from '../Buttons';

export default function EditCv() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Edit Resume / CV</h2>
                    <p className="text-gray-400">Update your professional details and CV file</p>
                </div>
                <PrimaryButton className="px-6 py-3">
                    <SaveIcon className="size-5" />
                    Save Changes
                </PrimaryButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-6 rounded-3xl space-y-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <FileTextIcon className="size-5 text-primary" />
                        Basic Information
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Full Name</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-primary/50 outline-none" defaultValue="Rishanthan .V" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Title</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-primary/50 outline-none" defaultValue="Software Engineer" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Summary</label>
                            <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-primary/50 outline-none h-32" defaultValue="I build high-performance, beautiful web applications..." />
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl space-y-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <UploadIcon className="size-5 text-secondary" />
                        CV Document
                    </h3>
                    <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center space-y-4 hover:border-primary/50 transition-colors group cursor-pointer">
                        <div className="inline-flex p-4 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                            <UploadIcon className="size-8 text-gray-500 group-hover:text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-lg">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-500">PDF (MAX. 5MB)</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                                <FileTextIcon className="size-5 text-red-500" />
                            </div>
                            <div>
                                <p className="font-medium">current-cv.pdf</p>
                                <p className="text-xs text-gray-500">2.4 MB</p>
                            </div>
                        </div>
                        <button className="text-xs font-bold text-primary hover:underline">Update</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
