import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/confic";


const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    //  LOGOUT FUNCTION

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout }} >
            {!loading && children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext);
}
