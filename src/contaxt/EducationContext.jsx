import { createContext, useContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

const EducationContext = createContext(null);

export const EducationProvider = ({ children }) => {
    const { getAllDocuments } = useFirestore("education");

    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEducation = async () => {
        try {
            //  prevent duplicate Firestore reads
            if (education.length > 0) {
                setLoading(false);
                return;
            }

            const data = await getAllDocuments();
            setEducation(data);
        } catch (error) {
            console.error("Failed to fetch education:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <EducationContext.Provider value={{ education, loading }}>
            {children}
        </EducationContext.Provider>
    );
};

export const useEducation = () => {
    const context = useContext(EducationContext);
    if (!context) {
        throw new Error("useEducation must be used inside EducationProvider");
    }
    return context;
};
