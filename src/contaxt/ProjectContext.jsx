import { createContext, useContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

const ProjectContext = createContext(null);

export const ProjectContextProvider = ({ children }) => {
    const { getAllDocuments } = useFirestore("projects");

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await getAllDocuments();
            setProjects(data);
            console.log("ProjectContext: Fetched", data.length, "projects");
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ projects, loading, refreshProjects: fetchProjects }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used inside ProjectContextProvider");
    }
    return context;
};
